import React, {useState, useEffect,useRef} from 'react'
import {Box,Grid,Button} from '@material-ui/core';
import {DynamicTables,SubmitButton,IconButton,ConfirmDialog,ExpandableTables,CustomSnackbar} from '../../components/export'
import score from '../../resources/Score.json';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ButtonGroup  from '@material-ui/core/ButtonGroup';
import DeleteIcon from "@material-ui/icons/Delete";
import AppConfig from '../../util/AppConfig.js';
import {get,post,deletes,} from '../../util/HttpRequest'
import '../../styles/media.scss';

const headers = [
    {id : "author_name", label : "Author", align: "left", format: value => value.toLocaleString()},
    {id : "document", label : "Files", align: "center", format: value => value.toLocaleString()},
    {id : "length", label : "Pages", align: "center",format: value => value.toLocaleString()},
    {id : "overall_similarity", label : "Similarity", align: "center",format: value => value.toLocaleString()},
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
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [data, setData] =  useState([]);
    const [deleteId, setDeleteId] =  useState('');

    const urlParams = new URLSearchParams(props.history.location.search);
    const taskId = props.match.params.id;
    const pageTitle = urlParams.get('course_id') + ' ('+ urlParams.get('task_name_id') + ')';
    const USER_TOKEN = AppConfig.getToken()
    const AuthStr = 'Bearer '.concat(USER_TOKEN); 
    const uploadFile = useRef(null);

    useEffect(async () => {
        fetchData();
    },[data.length]);

    const fetchData = () => {
        let url = AppConfig.getAPI('submissions') + taskId;
        get(url,{Authorization: AuthStr}).then(resp => {
            if(resp != undefined && resp.code == 0){             
                console.log("fetch submissions succeed");
                setData(resp.data);
            }else{
                AppConfig.refreshToken();
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
        let url = AppConfig.getAPI('deleteSubmission') + deleteId;
        if(deleteId != ''){
            deletes(url,{Authorization: AuthStr}).then(resp => {
                if(resp != undefined && resp.code == 0){     
                    console.log("delete submissions succeed");          
                    fetchData();
                    setOpenAlert(true);
                }else{
                    setOpenAlert(true);
                }
            }); 
        }
    };

    const handleClick = (author,subItems) => {
        
        let current_path = props.location.pathname;
        let url = current_path + (current_path.substr(current_path.length - 1) != '/' ? '/' : '') +author;
        let pids = [];
        subItems.map(item => {
            pids.push(item.page_id);
        });
        props.history.push({
            pathname: url,
            state : {pageIds : pids}
        });
    }

    const handleClickUpload = () => {

    };

    const handleUpload= () => {
        const fileUploaded = uploadFile;
        let files = uploadFile.current.files;
        let url = AppConfig.getAPI('upload') + taskId;
        const form = new FormData();
        for(var i =0; i<files.length; i++){
            form.append('document', files[i]);
            post(url,form,{'Authorization': AuthStr, 'Content-Type': 'multipart/form-data'}).then(resp =>{
                if(resp != undefined && resp.code == 0){
                    console.log("upload success");
                    fetchData();
                    setOpenAlert(true);
                }
            }) 
        };
        
    };

    //row item value for data table
    const rows = data.map(item =>
        createData(
            item.author_name,
            item.document, 
            item.length,
            item.overall_similarity, 
            item.modified_date,
            <ButtonGroup variant="outlined">
                <IconButton tips="view report" handleClick={() => { handleClick(item.author_name,item.expandedItems)}}>
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
            <CustomSnackbar 
                type="success" 
                message="create task successful!"
                open={openAlert}
                onClose={() => setOpenAlert(false)}/>
            <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                <Grid item xs={8} className="title-row">
                    <h2>Submissions:</h2>     
                </Grid>
                <Grid item xs={8} className="button-row">
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

