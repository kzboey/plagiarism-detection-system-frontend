import React from 'react'
import {Box,Grid,Paper,IconButton} from '@material-ui/core';
import {DynamicTables,CustomButton,Navigation} from '../../components/export'
import score from '../../resources/Score.json';
import CreateIcon from '@mui/icons-material/Create';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import './index.scss';

const headers = [
    {id : "author", label : "Author", align: "left", format: value => value.toLocaleString()},
    {id : "title", label : "Title", align: "center", format: value => value.toLocaleString()},
    {id : "similarity", label : "Similarity", align: "center",format: value => value.toLocaleString()},
    {id : "grade", label : "Grade", align: "center",format: value => value.toLocaleString()},
    {id : "file", label : "File", align: "center",format: value => value.toLocaleString()},
    {id : "pid", label : "Paper Id", align: "center"},
    {id : "date", label : "Date", align: "center"}
]

function createData(author, title, similarity, grade, file, pid, date ) {
    return { author, title, similarity, grade, file, pid, date };
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
            <CreateIcon/>, 
            <IconButton onClick={() => { handleClick(item.paperid)}}>
                <FileCopyIcon/>
            </IconButton>, 
            item.paperid, 
            item.date)
    );


    return(
        <Box>
            <Grid container spacing={2} justify="center" alignItems="center" direction="row" className="submission-container">
                <Grid item xs={6} alignItems="left">
                    <Paper class="grid-left" > 
                        <h2>Submissions:</h2>
                    </Paper>       
                </Grid>
                <Grid item xs={2} alignItems="right">
                    <Paper class="grid-right">
                        <CustomButton title="upload" type="upload"/>
                    </Paper> 
                </Grid>
                <Grid item xs={8}>
                    <Paper>
                        <DynamicTables headers={headers} datas={rows}/>
                    </Paper> 
                </Grid>
            </Grid>
        </Box>
    )
}

