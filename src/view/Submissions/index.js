import React, { Component } from 'react'
import {Box,Grid} from '@material-ui/core';
import DynamicTables from '../../components/DynamicTables'
import CustomButton from '../../components/CustomButton'
import score from '../../resources/Score.json';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CreateIcon from '@mui/icons-material/Create';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const MyTableBody = () =>{
    return(
        <TableBody>
            {score.map((row) => (
                <TableRow key={row.id}  class="table-row" align="left">
                    <TableCell component="th" scope="row">
                        {row.author}
                    </TableCell>
                    <TableCell align="center">
                        {row.title}
                    </TableCell>
                    <TableCell align="center">
                        {row.similarity}
                    </TableCell>
                    <TableCell align="center"><CreateIcon/></TableCell>
                    <TableCell align="center"><FileCopyIcon/></TableCell>
                    <TableCell align="center">
                         {row.paperid}
                    </TableCell>
                    <TableCell align="center">
                         {row.date}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default function Submissions(props){

    const headers = ['Author','Title','Similarity','Grade','File','Paper Id','Date'];

    return(
        <Box>
            <Grid container spacing={2} justify="center" direction="row">
                <Grid item xs={8}>
                    <h2>Submissions:</h2>
                </Grid>
                <Grid item xs={8}>
                    <DynamicTables header={headers} body={<MyTableBody/>}/>
                </Grid>
            </Grid>
        </Box>
    )
}

