import React, { Component } from 'react'
import {Box,Grid} from '@material-ui/core';
import DynamicTables from '../../components/DynamicTables'
import CustomButton from '../../components/CustomButton'
import taskList from '../../resources/TaskList.json';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import InfoIcon from '@material-ui/icons/Info';

const TaskTableBody = () =>{
    return(
        <TableBody>
            {taskList.map((row) => (
                <TableRow key={row.id}  class="table-row" align="left">
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center"> 
                        {row.title}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                        {row.task}
                    </TableCell>
                    <TableCell align="center">
                        <span>start : {row.dates.start}</span>
                        <span>due : {row.dates.due}</span>
                    </TableCell>
                    <TableCell align="center"><InfoIcon/></TableCell>
                    <TableCell align="center">
                        <CustomButton title="View" type="View"/>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default function TaskLists(props){

    const headers = ['Course Id','Course Title','Task','Dates','Info','Actions'];

    return(
        <Box>
            <Grid container spacing={2} justify="center" direction="row">
                <Grid item xs={8}>
                    <h2>My Tasks:</h2>
                </Grid>
                <Grid item xs={8}>
                    <DynamicTables header={headers} body={<TaskTableBody/>}/>
                </Grid>
            </Grid>
        </Box>
    )
}

