import $ from 'jquery-ajax';
import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import {ArrowBackSharp} from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';

import filterData from './helpers';
import { HeaderTable } from './components';
import { selectedPlayers } from './const';
import SelectorMatches from '../../components/selector-matches/selectorMatches';
import Header from '../../components/header';

import { requestUrl } from '../../const/const';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
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
  return stabilizedThis.map((el) => el[0]);
}

const Audience = () => {
  const classes = useStyles();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('score');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [showLoader, setShowLoader] = useState(false);

  const [teams, setTeams] = useState([]);
  const [audience, setAudience] = useState([]);
  const [dataForTable, setDataForTable] = useState([]);
  const [dataSelected, setDataSelected] = useState(selectedPlayers);

  const [selected, setSelected] = useState({
    season: '',
    tournament: '',
    gender: '',
    division: '',
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelectPress = (key, value) => {
    setSelected((prev) => {
      return ({
        ...prev,
        [key]: value,
      })
    })
  };

  const handleShowPress = () => {
    setShowLoader(true);

    $.ajax ({
      type:'POST',
      url: `${requestUrl}/audiences`,
      dataType:'json',
      data: { params: selected },
      success: function(data) {
        setAudience(data);
        setShowLoader(false);
      },
    });
  };

  useEffect(() => {
    $.ajax ({
      type:'GET',
      url: `${requestUrl}/teams`,
      dataType:'json',
      success: function(teams) {
        setTeams(teams);
      },
    });

    $.ajax ({
      type:'GET',
      url: `${requestUrl}/audiences`,
      dataType:'json',
      success: function(audiences) {
        setAudience(audiences);
      },
    });

    $.ajax ({      
      type:'GET',
      url: `${requestUrl}/seasons`,
      dataType:'json',
      success: function(data) {
        setDataSelected(prevState => {
          return [
            {
              title: {value: 'season', name: 'Сезон'},
              options: data,
            },
            ...prevState,
          ];
        });
      }
    });
  }, [])

  useEffect(() => {
    setDataForTable(filterData(teams, audience));
  }, [teams, audience]);

  // useEffect(() => {
  //   if (!dataForTable.length) {
  //     setShowLoader(true);
  //   } else {
  //     setShowLoader(false);
  //   }
  // }, [dataForTable]);

  return (
    <Fragment>
      <Header />
        <div className={classes.root}>
            
          <Link 
            to="/account">
              <ArrowBackSharp fontSize={'large'} className={classes.back} style={{ color: '#fff' }} />
          </Link>

        <div className='selector'>
          {dataSelected.map((item, i) => {
            return (
              <div key={i} className='selector__block'>
                <SelectorMatches title={item.title} options={item.options} onPress={handleSelectPress} />
              </div>
            )
          })}

          <div onClick={handleShowPress} className='selector__block selector__btn'>Показать</div>
        </div>

        {showLoader ?
          <div className='progress-table'>
            <CircularProgress />
          </div>
          
        :
          
          !dataForTable.length ? 'Ничего не найдено' :

            <Paper className={classes.paper}>
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={'medium'}
                  aria-label="enhanced table"
                >
                  <HeaderTable
                    classes={classes}
                    numSelected={0}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={dataForTable.length}
                  />
                  <TableBody>
                    {stableSort(dataForTable, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {                    
                        return (
                          <TableRow
                            hover
                            key={index}
                          >
                            <TableCell align="left">{row.team}</TableCell>
                            <TableCell align="left">{row.homeMatches}</TableCell>
                            <TableCell align="left">{row.totalViewers}</TableCell>
                            <TableCell align="left">{row.middleViewers}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={dataForTable.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
              />
            </Paper>
        }

        
      </div>
    </Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2%',
  },
  back: {
    background: '#ED0423',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default Audience;
