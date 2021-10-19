import React, {useState} from 'react';
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
import {IconButton} from './export.js'
import '../styles/media.scss';
import '../styles/table.scss';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles(theme => ({
  searchBar : {
    marginBottom : '12px'
  }
}))

const ExpandableTableRow = ({ children, subHeader,curentRow, rowLength}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  let subItems = curentRow[subHeader[2].id];

  return (
    <>
      <TableRow  hover tabIndex={-1}  className="table-row">
        <TableCell padding="checkbox">
          <IconButton handleClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow> 
      {isExpanded && (
        Object.keys(subItems).map(key => {
          return(       
            <TableRow  className="table-row-expandable">
              {subHeader.map((header, index) => {
                  const value = subItems[key];
                  if(header.id !== undefined){
                    return (
                      <TableCell key={header.id} align={header.align}>
                        {header.format && typeof value === "number" 
                          ? header.format(value)
                          : value}
                      </TableCell>
                    );
                  }else{
                    return (<TableCell></TableCell>)
                  }
              })}
            </TableRow>
          )
        })
      )}
  </>
  );
};

export default function ExpandableTables(props){
    const classes = useStyles();
    const {headers,subHeaders,datas, ...rest} = props;
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
                    <TableCell></TableCell>
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
                      <ExpandableTableRow
                        key={row.name}
                        subHeader = {subHeaders}
                        curentRow = {row}
                        rowLength = {Object.keys(headers).length}
                      >
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
                      </ExpandableTableRow>
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

