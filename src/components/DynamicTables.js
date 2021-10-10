import React from 'react';
import {makeStyles} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from "@material-ui/core/TablePagination";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import '../styles/media.scss';
import '../styles/table.scss';

//overriding style
const useStyles = makeStyles(theme => ({ 

}))


export default function DynamicTables(props){
    const classes = useStyles();
    const {headers,datas, ...rest} = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    return(
        <Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead class="table-header">
                <TableRow>
                    {headers.map(header => (
                      <TableCell
                        key={header.id}
                        align={header.align}
                      >
                        {header.label}
                      </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {datas
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(data => {
                    return (
                      <TableRow hover tabIndex={-1}  class="table-row">
                        {headers.map(header => {
                          const value = data[header.id];
                          return (
                            <TableCell key={header.id} align={header.align}>
                              {header.format && typeof value === "number" 
                                ? header.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 15, 20, 25, 50, 100]}
            component="div"
            count={datas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
    )
}

