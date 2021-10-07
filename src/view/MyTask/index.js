import React from 'react'
import {Box,Grid,Paper} from '@material-ui/core';
import {DynamicTables,CustomButton,Navigation} from '../../components/export'
import taskList from '../../resources/TaskList.json';
import InfoIcon from '@material-ui/icons/Info';

//Define header label
const headers = [
    {id : "id", label : "Course Id", align: "left", format: value => value.toLocaleString()},
    {id : "title", label : "Course Title", align: "center", format: value => value.toLocaleString()},
    {id : "task", label : "Task", align: "center",format: value => value.toLocaleString()},
    {id : "start", label : "Start Date", align: "center",format: value => value.toLocaleString()},
    {id : "due", label : "Due Date", align: "center",format: value => value.toLocaleString()},
    {id : "info", label : "Info", align: "center"},
    {id : "action", label : "Actions", align: "center"}
]

function createData(id, title, task, start, due, info, action ) {
    return { id, title, task, start, due, info,action };
}

export default function TaskLists(props){

    const handleClick = (id) => {
        var url = "/dashboard/"+id;
        props.history.push(url);
    }
    //row item value for data table
    const rows = taskList.map(item =>
        createData(item.id, item.title, item.task, item.dates.start, item.dates.due, <InfoIcon/>, <CustomButton title="View" type="button" onPress={() => { handleClick(item.id)}}/>)   //pass handleClick function to custombutton component
    );

    return(
        <Box>
            <Grid container spacing={2} justify="center" direction="row">
                <Grid item xs={8}>   
                    <h2>My Tasks:</h2>               
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

