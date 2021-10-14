import React, {useState} from 'react'
import {Box,Grid} from '@material-ui/core';
import {DynamicTables,UploadButton,IconButton,ConfirmDialog} from '../../components/export'
import score from '../../resources/Score.json';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ButtonGroup  from '@material-ui/core/ButtonGroup';
import DeleteIcon from "@material-ui/icons/Delete";
import '../../styles/media.scss';

const headers = [
    {id : "author", label : "Author", align: "left", format: value => value.toLocaleString()},
    {id : "title", label : "Title", align: "center", format: value => value.toLocaleString()},
    {id : "similarity", label : "Similarity", align: "center",format: value => value.toLocaleString()},
    {id : "pid", label : "Paper Id", align: "center"},
    {id : "date", label : "Date", align: "center"},
    {id : "action", label : "Actions", align: "center"}
]

function createData(author, title, similarity, pid, date, action ) {
    return { author, title, similarity, pid, date, action };
}


export default function Submissions(props){
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleRemove = () => {
        //api delete data in db
    };

    const handleClick = (pid) => {
        let current_path = props.location.pathname;
        let url = current_path +"/"+pid;
        props.history.push(url);
    }

    //row item value for data table
    const rows = score.map(item =>
        createData(
            item.author,
            item.title, 
            item.similarity, 
            item.paperid, 
            item.date,
            <ButtonGroup variant="outlined">
                <IconButton tips="view report" handleClick={() => { handleClick(item.paperid)}}>
                    <FileCopyIcon/>
                </IconButton>
                <IconButton tips="delete" handleClick={handleClickOpenConfirm}>
                    <DeleteIcon/>
                </IconButton>
            </ButtonGroup>
            )
    );


    return(
        <Box>
            <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                <Grid item xs={8} className="title-row">
                    <h2>Submissions:</h2>     
                </Grid>
                <Grid item xs={8} className="button-row">
                    <UploadButton title="upload" type="upload"/>               
                </Grid>
                <Grid item xs={8}>
                    <DynamicTables headers={headers} datas={rows}/>
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

