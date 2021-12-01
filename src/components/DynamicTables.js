import React, {useState,useEffect} from 'react';
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
import SearchBar from "material-ui-search-bar";
import '../styles/media.scss';
import '../styles/table.scss';


const useStyles = makeStyles(theme => ({
  searchBar : {
    marginBottom : '12px'
  }
}))

export default function DynamicTables(props){
    const classes = useStyles();
    const {headers,datas, ...rest} = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState(datas);
    const [searched, setSearched] = useState("");

    const requestSearch = (searchedVal) => {
      const filteredRows = datas.filter((row) => {
        for(var i =0; i<headers.length; i++){
          if(typeof row[headers[i].id] === 'string'){
            let result = row[headers[i].id].toLowerCase().includes(searchedVal.toLowerCase());
            if(result){
              return true;
            }
          }    
        }
      });
      setRows(filteredRows);
    };

    const cancelSearch = () => {
      setSearched("");
      requestSearch(searched);
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(() => { setRows(datas)}, [datas] )

    return(
        <Box>
          <SearchBar
            className={classes.searchBar} 
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
          <Paper>
          <TableContainer component={Paper}>
            <Table>
              <TableHead className="table-header">
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
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => {
                    return (
                      <TableRow hover tabIndex={-1}  className="table-row">
                        {headers.map(header => {
                          const value = row[header.id];
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
          </Paper>
        </Box>
    )
}

