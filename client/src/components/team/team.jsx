import React, { useEffect, useState, Fragment } from 'react';
import logo from '../../assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, TextField, Tooltip, Snackbar, Slide, CircularProgress } from '@material-ui/core';
import $ from 'jquery-ajax';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import { TeamPlayers } from './components';

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    Transition: Slide,
  });

  const [loading, setLoading] = useState({
    loading: true,
  })

  
  let protocol = window.location.protocol;

  useEffect(() => {
    $.ajax ({      
      type:'GET',
      url:`${protocol}//handball.devitgso.iron.hostflyby.net/teams`,
      // url:'http://localhost:3001/teams',
      dataType:'json',
      success: function(data) {
        data.map((item) => {
          setTeams(prevState => {
            return [
              ...prevState, 
              {
                id: item.id,
                value: item.value,
                label: item.label,
              }
            ];
          });
        });
        setLoading({loading: false});
        document.querySelector('.teams__block').classList.add('show');
      }
    });
  }, []);

  const saveTeam = () => {
    $.ajax ({
      type:'POST',
      url:`${protocol}//handball.devitgso.iron.hostflyby.net/teams`,
      // url:'http://localhost:3001/teams',
      dataType:'json',
      data: { teams },
      success: function() {
        setModal({
          ...modal,
          open: true,
        });
      },
      error: function(xhr, ajaxOptions, thrownError) {
        // console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
      }
    });
  }

  const handleCloseModal = () => {
    setModal({
      ...modal,
      open: false,
    });
  };

  const addTeam = () => {
    const teamValue = document.querySelector('.teams__team input').value;
    if (teams.length === 0) {
      setTeams([
        ...teams,
        {
          id: 1,
          value: teamValue,
          label: teamValue,
        }
      ])
    } else {
      if (teamValue != '') {
        setTeams([
          ...teams,
          {
            id: teams[teams.length - 1].id + 1,
            value: teamValue,
            label: teamValue,
          }
        ])
      }
    }
    document.querySelector('.teams__team input').value = '';
  }

  const deleteTeam = (id) => {
    setTeams(prevState => {
      return prevState.filter(team => team.id !== id);
    })
  }

  return(
    <Fragment>
      <div className="header">
        <div className="header__logo">
          <img src={logo} alt={logo} />
        </div>
      </div>

      <div className="teams">
        <h3>
          Список команд
        </h3>

        { loading.loading && <div className="account__loading"><CircularProgress /></div> }
 
        <List className="teams__block">  
          {teams.map((option) => (
            <ListItem className="teams__item" button key={option.value} value={option.value}>
              <ListItemText>
                {option.value}
                <Tooltip title='Кликните, чтобы удалить' key={option.value}>
                  <DeleteOutlinedIcon className="teams__icon" onClick={() => deleteTeam(option.id)} />
                </Tooltip>
              </ListItemText>
            </ListItem>
          ))}  
        </List>

        <div className="teams__save">
          <TextField className="teams__team" label="Добавить команду" />
          <button onClick={addTeam}>Добавить</button>
        </div>
        

        <div className="teams__buttons">    
          <Link className="teams__link" to="/account"><button className="button teams__button teams__button--back">Назад</button></Link>
          <button onClick={saveTeam} className="button teams__button--save">Сохранить</button>
        </div>

      </div>

      <Snackbar
        open={modal.open}
        autoHideDuration={1500}
        onClose={handleCloseModal}
        TransitionComponent={modal.Transition}
        message="Команды сохранены"
        key={modal.Transition.name}
      />
    </Fragment>
  )
}

export default Team;