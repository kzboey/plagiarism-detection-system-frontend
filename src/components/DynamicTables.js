import React from 'react';
import { ASSIGNMENTS } from '../resources/Assignments';
import {makeStyles} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../styles/media.scss';
import '../styles/table.scss';

//overriding style
const useStyles = makeStyles(theme => ({ 

}))


export default function DynamicTables(props){
    const classes = useStyles();
    const assignments = ASSIGNMENTS;
    const {header,body} = props;

    return(
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead class="table-header">
                <TableRow>
                  {header.map((row,index) => (
                      index == 0 ? <TableCell align="left" component="th">{row}</TableCell> : <TableCell align="center" component="th">{row}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {body}
            </Table>
          </TableContainer>
        </div>
    )
}

