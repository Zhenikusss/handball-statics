import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery-ajax';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import './account.scss';
import Drawer from '@material-ui/core/Drawer';
import logo from '../../assets/img/logo.svg';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { Button, Tooltip, Dialog, DialogActions, DialogTitle, } from '@material-ui/core';
import SelectorMatches from '../selector-matches/selectorMatches';
import { selectedMatches } from './const';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { requestUrl } from '../../const/const';

function Account (props) {
  const [loading, setLoading] = useState({
    loading: true,
  })
  const [matchItem, setMatchItem] = useState({});
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [idMatch, setIdMatch] = useState(null);

  const [selected, setSelected] = useState({
    season: '',
    tournament: '',
    gender: '',
    division: '',
  });

  const [dataSelected, setDataSelected] = useState(selectedMatches);

  let userGroup = localStorage.getItem('UsersGroup');

  const handleDrawerOpen = () => {
    setMenuOpen(true);
  };

  const handleDrawerClose = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift') || event.type === 'click') {
      setMenuOpen(false);
    }
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
    $.ajax ({
      type:'POST',
      url: `${requestUrl}/matches`,
      dataType:'json',
      data: { params: selected },
      success: function(data) {
        setMatchItem(data);
      },
    });
  };

  if (Object.keys(matchItem).length !== 0) {
    matchItem.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else if (a.date > b.date) {
        return -1;
      } else if (a.date === b.date) {
        if (a.time > b.time) {
          return -1;
        } else {
          return 1;
        }
      } else {
        return 0;
      }
    });
  }

  const date = new Date();
  let today = `${date.getFullYear()}-${toLead(date.getMonth(), 'month')}-${toLead(date.getDate(), 'date')}`;

  function toLead(leadDate, type) {
    leadDate = leadDate.toString().split('-');
    if (leadDate < 10) {
      if (type === 'month') {
        leadDate = Number(leadDate) + 1;
        leadDate = `0${leadDate}`;
      } else {
        leadDate = `0${leadDate}`;
      }
    }
    return leadDate.toString();
  }

  function reverseString(str) {
    str = str.split('-').reverse().join('-');
    return str;
  }

  function getMatches() {
    let countMatch = document.querySelector('.account__block');
    if (countMatch !== null && countMatch.childElementCount === 0) {
      countMatch.innerHTML = 'На сегодня нет доступных матчей'
    }
  }

  const handleClickOpen = (id) => {
    setIdMatch(id)
    setOpen(true);
  };

  const handleDeleteMatch = () => {
    if (!idMatch) {
      alert('There is no ID of questionnaires')
    } else {
      $.ajax ({
        type:'POST',
        url: `${requestUrl}/matches`,
        dataType:'json',
        data: { id: idMatch },
        success: function() {
          setOpen(false);
          window.location.reload();
        },
        error: function(xhr, ajaxOptions, thrownError) {
        }
      });
    }
  }

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    $.ajax ({      
      type:'GET',
      url: `${requestUrl}/matches`,
      dataType:'json',
      success: function(data) {
        setMatchItem(data);
        setLoading({loading: false});
      }
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

    setTimeout(getMatches, 1000);
  }, []);

  if (loading.loading) {

    return (
      <div className="account__loading">
        <CircularProgress />
      </div>
    )

  } else {

    return (
      <Fragment>
        <div className="header">
          <div className="header__logo">
            <img src={logo} alt={logo} />
          </div>
        </div>
        <div className="account">

          <div className="account__games">

          {!matchItem.length ? 'Ничего не найдено' :
            userGroup === 'admin' ? <div className="account__block">
              {matchItem.map((anObjectMapped, index) =>
                <div key={index + anObjectMapped.id} className="account__item">
                  <Link to={{
                    pathname: "/table",
                    hash: anObjectMapped.id,
                  }}>
                  {anObjectMapped.time} | {reverseString(anObjectMapped.date)}
                  {' '}| {anObjectMapped.teamA} - {anObjectMapped.teamB}
                  {' '}| {anObjectMapped.resultGameA || 0}:{anObjectMapped.resultGameB || 0}
                  {' '}| {anObjectMapped.resultGame30A || 0}:{anObjectMapped.resultGame30B || 0}
                  </Link>
                  <div className="account__icon">
                    <Tooltip title='Кликните, чтобы удалить' key={index + anObjectMapped.id}>
                      <DeleteOutlinedIcon className="teams__icon" onClick={() => handleClickOpen(anObjectMapped.id)} />
                    </Tooltip>
                  </div>
                </div>
              )}
            </div>

          : <div className="account__block account__client">
              {matchItem.map((anObjectMapped, index) =>
                  reverseString(anObjectMapped.date) === reverseString(today) && <Link 
                      key={index + anObjectMapped.id} to={{
                      pathname: "/table",
                      hash: anObjectMapped.id,
                    }}>
                      <div className="account__item account__client_item">
                        <div className="account__name account__client_name">
                          <div className="account__teamA">{anObjectMapped.teamA}</div>
                          <div className="account__teamB">{anObjectMapped.teamB}</div>
                        </div>
                        <div className="account__date account__client_date">
                          <div className="account__time">{anObjectMapped.time}</div>
                          <div className="account__day">Сегодня</div>
                        </div>
                      </div>
                  </Link>
              )}
            </div>
          }

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Вы хотите удалить анкету?"}
              </DialogTitle>
              <DialogActions>
                <Button className="account__btns account__green" onClick={handleDeleteMatch}>Да</Button>
                <Button className="account__btns account__red" onClick={handleClose}>Нет</Button>
              </DialogActions>
            </Dialog>

          </div>

          {userGroup === 'admin' ?
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
          : null}
          
          

              {userGroup === 'admin' ?
                <div className='headerMenu'>
                    <AppBar position="static">
                      <Toolbar>
                        <IconButton 
                          edge="start" 
                          color="inherit" 
                          aria-label="open drawer"
                          onClick={handleDrawerOpen}
                        >
                          <MenuIcon />
                        </IconButton>
                        <div className='textNameMenu' variant="h6">
                          МЕНЮ
                        </div>

                        <div className="account__close">
                          <a href="mailto:morozov@itg-soft.by" className="account__teh button">Написать в техподдержку</a>
                          <button className="account__exit" onClick={() => {props.onClick(false)}}>Выйти</button>
                        </div>
            
                      </Toolbar>
                    </AppBar>
                   

                    <Drawer 
                      anchor={'left'} 
                      open={menuOpen} 
                      onClose={handleDrawerClose()}
                      onKeyDown={handleDrawerClose()}
                    >
                      <List>
                        <ListItem button >
                          <Link className={'urlBtnMenu'} to={{
                            pathname: "/table",
                            hash: Date.now().toString(),
                            state: { createTable: true }
                          }} >
                            <ListItemText className={'textBtnMenu'} primary={'Создать матч'} />
                          </Link>
                        </ListItem>

                        <ListItem button >
                          <Link className={'urlBtnMenu'} to={{
                            pathname: "/season",
                          }} >
                            <ListItemText className={'textBtnMenu'} primary={'Сезоны'} />
                          </Link>
                        </ListItem>
                        
                        <ListItem button >
                          <Link className={'urlBtnMenu'} to={{
                            pathname: "/team",
                          }} >
                            <ListItemText className={'textBtnMenu'} primary={'Команды'} />
                          </Link>
                        </ListItem>

                        <ListItem button >
                          <Link className={'urlBtnMenu'} to={{
                            pathname: "/player",
                          }} >
                            <ListItemText className={'textBtnMenu'} primary={'Игроки'} />
                          </Link>
                        </ListItem>

                        <ListItem button >
                          <Link className={'urlBtnMenu'} to={{
                            pathname: "/player-scores",
                          }} >
                            <ListItemText className={'textBtnMenu'} primary={'Бомбардиры'} />
                          </Link>
                        </ListItem>

                        <ListItem button >
                          <Link className={'urlBtnMenu'} to={{
                            pathname: "/audience",
                          }} >
                            <ListItemText className={'textBtnMenu'} primary={'Зрители'} />
                          </Link>
                        </ListItem>

                      </List>
                    </Drawer>
                </div> 
                
                : 

                <div className='headerMenu'>
                  <Toolbar>
                    <div className="account__close">
                      <a href="mailto:morozov@itg-soft.by" className="account__teh button">Написать в техподдержку</a>
                      <button className="account__exit" onClick={() => {props.onClick(false)}}>Выйти</button>
                    </div>
                  </Toolbar>
                </div>
                
              }        

        </div>
      </Fragment>
    )
  }
}
  
export default Account;