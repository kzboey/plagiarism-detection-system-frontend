import React, {useState,useEffect} from 'react';
import {makeStyles} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from "@material-ui/core/TableSortLabel";
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
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}))

const ExpandableTableRow = ({ children, subHeader,curentRow, ...rest}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  let subItems = curentRow.expandedItems;

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
                  const value = (subItems[key])[header.id];
                  if(header.id !== undefined){
                    return (
                      <TableCell key={header.id} align={header.align}>
                        {header.prefix != undefined ? header.prefix : ""}
                        {header.format && typeof value === "number" 
                          ? header.format(value)
                          : value}
                          {header.postfix != undefined ? header.postfix : ""}
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
    const {headers,subHeaders,datas, sortColumn, ...rest} = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState(datas);
    const [searched, setSearched] = useState(""); 
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState(sortColumn);

    useEffect(async () => {
      setRows(datas);
    },[datas]);

    const descendingComparator = (a, b, orderBy) => {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }

    const getComparator = (order, orderBy) => {
      return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map(el => el[0]);
    }

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

    const createSortHandler = property => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
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
                        sortDirection={orderBy === header.id ? order : false} 
                      >
                        <TableSortLabel
                          active={orderBy === header.id}
                          direction={orderBy === header.id ? order : "asc"}
                          onClick={() => createSortHandler(header.id)}
                        >
                          {header.label}
                          {orderBy === header.id ? (
                            <span className={classes.visuallyHidden}>
                              {order === "desc" ? "sorted descending" : "sorted ascending"}
                            </span>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                  {stableSort(rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), getComparator(order, orderBy)).map(row => {
                    return (
                      <ExpandableTableRow
                        key={row.name}
                        subHeader = {subHeaders}
                        curentRow = {row}
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

