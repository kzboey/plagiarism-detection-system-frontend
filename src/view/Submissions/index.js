import React from 'react'
import {Box,Grid,Paper} from '@material-ui/core';
import {DynamicTables,UploadButton,IconButton} from '../../components/export'
import score from '../../resources/Score.json';
import CreateIcon from '@mui/icons-material/Create';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ButtonGroup  from '@material-ui/core/ButtonGroup';
import DeleteIcon from "@material-ui/icons/Delete";
import './index.scss';

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
    //const params = useParams();
    const breadcrumItem = props.match.params.id;;

    const handleClick = (pid) => {
        let current_path = props.location.pathname;
        let url = current_path +"/"+pid;
        console.log(url);
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
                <IconButton tips="delete" >
                    <DeleteIcon/>
                </IconButton>
            </ButtonGroup>
            )
    );


    return(
        <Box>
            <Grid container spacing={2} justify="center" alignItems="center" direction="row" className="submission-container">
                <Grid item xs={6} alignItems="left" >
                    <h2>Submissions:</h2>     
                </Grid>
                <Grid item xs={2} alignItems="right">
                    <Paper class="grid-right">
                        <UploadButton title="upload" type="upload"/>
                    </Paper> 
                </Grid>
                <Grid item xs={8}>
                    <DynamicTables headers={headers} datas={rows}/>
                </Grid>
            </Grid>
        </Box>
    )
}

