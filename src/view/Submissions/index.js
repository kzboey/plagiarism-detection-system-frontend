import React, {useState, useEffect,useRef} from 'react'
import {Box,Grid,makeStyles} from '@material-ui/core';
import {SubmitButton,IconButton,ConfirmDialog,ExpandableTables,CustomSnackbar,CircularProgressWithLabel} from '../../components/export'
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ButtonGroup  from '@material-ui/core/ButtonGroup';
import DeleteIcon from "@material-ui/icons/Delete";
import AppConfig from '../../util/AppConfig.js';
import {get,post,deletes,} from '../../util/HttpRequest'
import '../../styles/media.scss';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    progressBar: {
      flexGrow: 1,
      padding : '20px',
    },
    progressBar2: {
        position: 'fixed',
        top : '50%',
        left : '50%',
      }
  }))

const headers = [
    {id : "author_name", label : "Author", align: "left", format: value => value.toLocaleString()},
    {id : "document", label : "Files", align: "center", format: value => value.toLocaleString()},
    {id : "length", label : "Pages", align: "center",format: value => value.toLocaleString()},
    {id : "overall_similarity", label : "Similarity(%)", align: "center",format: value => value.toLocaleString()},
    {id : "modified_date", label : "Uploaded Date", align: "center"},
    {id : "action", label : "Actions", align: "center"}
]

const subheaders = [
    {},{},
    {id : "page_name", align: "center", position : 2, format: value => value.toLocaleString()},
    {id : "pageNum", align: "center", position : 3, format: value => value.toLocaleString(), prefix : "page no. "},
    {id : "total_similarity", align: "center", position : 4, format: value => value.toLocaleString(), postfix : " (found)"},
    {},{}
]

function createData(author_name, document,length, overall_similarity, modified_date, action,expandedItems ) {
    return { author_name, document,length, overall_similarity, modified_date, action,expandedItems };
}

export default function Submissions(props){
    const classes = useStyles();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [data, setData] =  useState([]);
    const [deleteId, setDeleteId] =  useState('');
    const [alertType, setAlertType] = useState('success');
    const [alertMessage, setOpenMessage] = useState('');
    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [isSucess, setIsSucess] = useState(false);
    const [eqnvalue, setEqnvalue] = useState(60);
    const [sentencevalue, setSentencevalue] = useState(60);

    const urlParams = new URLSearchParams(props.history.location.search);
    const taskId = props.match.params.id;
    const USER_TOKEN = AppConfig.getToken()
    const AuthStr = 'Bearer '.concat(USER_TOKEN); 
    const uploadFile = useRef(null);

    useEffect(async () => {
        fetchData();
    },[]);

    const fetchData = () => {
        let url = AppConfig.getAPI('submissions') + taskId;
        get(url,{Authorization: AuthStr}).then(resp => {
            if(resp != undefined && resp.code == 0){             
                console.log("fetch submissions succeed");
                setData(resp.data);
            }else{
                AppConfig.refreshToken();
                // fetchData();
                setData([]);
            }
        }); 
    }

    const handleClickOpenConfirmDelete = (author_name) => {
        setDeleteId(author_name);
        setOpenConfirm(true);
    };

    const handleRemove = () => {
        //api delete data in db
        
        let url = AppConfig.getAPI('submission') + taskId+'?author='+deleteId;
        if(deleteId != ''){
            deletes(url,{Authorization: AuthStr}).then(resp => {
                if(resp != undefined && resp.code == 0){     
                    console.log("delete submissions succeed");          
                    fetchData();
                    setAlertType('success');
                    setOpenMessage('Delete File successful!');
                    setOpenAlert(true);
                }else{
                    setAlertType('error');
                    setOpenMessage('Error deleting File!');
                    setOpenAlert(true);
                }
            }); 
        }
    };

    const handleClick = (author,subItems,overall_similarity) => {
        
        let current_path = props.location.pathname;
        let url = current_path + (current_path.substr(current_path.length - 1) != '/' ? '/' : '') +author;
        let pids = [];
        console.log("equation value "+ eqnvalue);
        console.log("sentence value "+ sentencevalue);
        subItems.map(item => {
            pids.push(item.page_id);
        });
        props.history.push({
            pathname: url,
            state : {pageIds : pids, eqnValue : eqnvalue, sentenceValue : sentencevalue, overall_similarity : overall_similarity*100}
        });
    }

    const handleClickUpload = () => {

    };

    const handleClickDownload = () => {
        let url = AppConfig.getAPI('downloadImages') + taskId;
        get(url,{Authorization: AuthStr}).then(resp => {
            // if(resp != undefined && resp.code == 0){
            //     console.log("downlaod success");
            // }
        }); 
    };

    const getTotalUploadData = (files) => {
        let total = 0;
        for (const file of files) {
            total += file.size;
          }
        return total;
    }

    const postFile = (url, form,currentFileSize, totalFileSize, p_loaded) => {
        return new Promise((resolve, reject) =>{
            axios.post(url,form, {
                headers:{'Authorization': AuthStr, 'Content-Type': 'multipart/form-data'},            
                onUploadProgress: data => {
                    //Set the progress value to show the progress bar
                    let dataLoaded = p_loaded + data.loaded;
                    let prg= Math.round(100*(dataLoaded / totalFileSize));
                    setLoaded(dataLoaded);
                    setProgress(prg);
                    progress == 100 || prg == 100 ? setIsSucess(true) : setIsSucess(false);
                    setOpenDialog(true);
                  },
                }).then(resp =>{
                if(resp.data != undefined && resp.data.code == 0){
                    console.log(resp.data.message);
                    fetchData();
                    setAlertType('success');
                    setOpenMessage(resp.data.message);
                    setOpenAlert(true);
                    resolve(true);
                }else{
                    setAlertType('error');
                    setOpenMessage(resp.data.message);
                    setOpenAlert(true);
                    resolve(false);
                }
            })   
        })
    }
      
    async function handleUpload() {
        const fileUploaded = uploadFile;
        let files = uploadFile.current.files;
        let url = AppConfig.getAPI('upload') + taskId;
        let totalFileSize = getTotalUploadData(files);
        const form = new FormData();

        let p_loaded =0;

        for(const file of files) {
            form.set('file', file);
            await postFile(url,form,file.size, totalFileSize, p_loaded).then(res =>{
                if(res){
                    let dataLoaded = p_loaded + file.size;
                    let prg= Math.round(100*(dataLoaded / totalFileSize));
                    p_loaded = dataLoaded;
                    setLoaded(dataLoaded);
                    setProgress(prg);
                    console.log("seting progress to prg "+progress);
                    progress == 100 || prg == 100? setIsSucess(true) : setIsSucess(false);
                }
            });
            
        }
        setOpenDialog(false);
        setIsSucess(false);
        setLoaded(0);
        setProgress(0);
        
    };

    //row item value for data table
    const rows = data.map(item =>
        createData(
            item.author_name,
            item.document, 
            item.length,
            item.overall_similarity*100, 
            item.modified_date,
            <ButtonGroup variant="outlined">
                <IconButton tips="view report" handleClick={() => { handleClick(item.author_name,item.expandedItems,item.overall_similarity)}}>
                    <FileCopyIcon/>
                </IconButton>
                <IconButton tips="delete" handleClick={() => handleClickOpenConfirmDelete(item.author_name)}>
                    <DeleteIcon/>
                </IconButton>
            </ButtonGroup>,
            item.expandedItems
            )
    );


    return(
        <Box>
            {openDialog && <div className={classes.progressBar2}><CircularProgressWithLabel value={progress} success={isSucess}/></div>}
            <CustomSnackbar 
                type={alertType} 
                message={alertMessage}
                open={openAlert}
                onClose={() => setOpenAlert(false)}/>
            <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                <Grid item xs={8} className="title-row">
                    <h2>Submissions:</h2>     
                </Grid>
                <Grid item xs={8} className="button-row">
                    <Grid item xs={4} className="button-row-inner">
                        <Typography gutterBottom>Equation Sensitivity</Typography>
                        <Slider
                            label="Tooltip value labels"
                            valueLabelDisplay="auto"
                            aria-label="custom thumb label"
                            onChange={(e, val)=>setEqnvalue(val)}
                            defaultValue={eqnvalue}
                            min={0}
                            max={90}
                        />
                    </Grid>
                    <Grid item xs={4} className="button-row-inner">
                        <Typography gutterBottom>Sentences Sensitivity</Typography>
                        <Slider
                            label="Tooltip value labels"
                            valueLabelDisplay="auto"
                            aria-label="custom thumb label"
                            onChange={(e, val)=>setSentencevalue(val)}
                            defaultValue={sentencevalue}
                            min={0}
                            max={90}
                        />
                    </Grid>
                    <input id="uploadButton" ref={uploadFile} onChange={handleUpload} type="file" name="document" accept="image/*" style={{ display: 'none' }}  multiple />  
                    <label htmlFor="uploadButton">
                        <SubmitButton title="Upload" type="upload" component="span" onPress={()=>handleClickUpload()}/>     
                    </label>
                </Grid>
                <Grid item xs={8}>
                    <ExpandableTables 
                        headers={headers} 
                        subHeaders={subheaders} 
                        datas={rows}
                        sortColumn="modified_date"
                        />
                </Grid>
            </Grid>
            <ConfirmDialog
                title="Delete Data?"
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                onConfirm={handleRemove}
            >
                Are you sure you want to delete this Data?
            </ConfirmDialog>
        </Box>
    )
}

