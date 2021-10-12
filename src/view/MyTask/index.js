import React from 'react'
import {Box,Grid,Paper} from '@material-ui/core';
import {DynamicTables,ConfirmButton,IconButton, CustomDialog} from '../../components/export'
import taskList from '../../resources/TaskList.json';
import ButtonGroup  from '@material-ui/core/ButtonGroup';
import EditIcon from "@material-ui/icons/Edit";                                 
import DeleteIcon from "@material-ui/icons/Delete";
import PreviewIcon from '@mui/icons-material/Preview';
import {TaskForm} from '../TaskForm/form.js'

//Define header label
const headers = [
    {id : "id", label : "Course Id", align: "left", format: value => value.toLocaleString()},
    {id : "title", label : "Course Title", align: "center", format: value => value.toLocaleString()},
    {id : "task", label : "Task", align: "center",format: value => value.toLocaleString()},
    {id : "start", label : "Start Date", align: "center",format: value => value.toLocaleString()},
    {id : "due", label : "Due Date", align: "center",format: value => value.toLocaleString()},
    {id : "action", label : "Actions", align: "center"}
]

function createData(id, title, task, start, due, action ) {
    return { id, title, task, start, due, action };
}

export default function TaskLists(props){
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClick = (id) => {
        var url = "/dashboard/"+id;
        props.history.push(url);
    }
    //row item value for data table
    const rows = taskList.map(item =>
        createData(
            item.id, item.title, item.task, item.dates.start, item.dates.due, 
            <ButtonGroup variant="outlined">
                <IconButton tips="view submissions" handleClick={() => { handleClick(item.id)}}>
                    <PreviewIcon/>
                </IconButton>
                <IconButton tips="edit" handleClick={handleClickOpen}>
                    <EditIcon/>
                </IconButton>
                <IconButton tips="delete" >
                    <DeleteIcon/>
                </IconButton>
            </ButtonGroup>
            )   //pass handleClick function to custombutton component
    );

    return(
        <Box>
            <Grid container spacing={4} justify="center" direction="row">
                <Grid item xs={8}>   
                    <h2>My Tasks:</h2>               
                </Grid>
                <Grid item xs={8}>               
                    <DynamicTables headers={headers} datas={rows}/>   
                </Grid>
            </Grid>
            <CustomDialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <TaskForm/>
            </CustomDialog>
        </Box>
    )
}

