import React, { useEffect, useState, useRef, Fragment } from 'react';
import logo from '../../assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { TextField, Snackbar, Slide, CircularProgress, MenuItem } from '@material-ui/core';
import $ from 'jquery-ajax';

import PlayerString from './components/player';
// import AddPlayer from './components/add-player';
import { defaultGenders } from './constants/default';

const Player = () => {
  const [modal, setModal] = useState({
    open: false,
    Transition: Slide,
  });
  const [gender, setGender] = useState('male');
  const [team, setTeam] = useState([]);
  const [teamDefault, setTeamDefault] = useState('');

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState({
    loading: true,
  });

  const [errorName, setErrorName] = useState(true);
  const [errorNumber, setErrorNumber] = useState(true);

  const [helperTextName, setHelperTextName] = useState('');
  const [helperTextNumber, setHelperTextNumber] = useState('');

  const [ newPlayer, setNewPlayer] = useState({
    gender: gender,
    team: teamDefault
  });

  let protocol = window.location.protocol;

  useEffect(() => {
    $.ajax ({
      type:'GET',
      // url:`${protocol}//handball.devitgso.iron.hostflyby.net/players`,
      url:'http://localhost:3001/players',
      dataType:'json',
      success: function(data) {
        data.map((item) => {
          setPlayers(prevState => {
            return [
              ...prevState, 
              {
                id: item.id,
                name: item.name,
                gender: item.gender,
                number: item.number,
                team: item.team
              }
            ];
          });
        });
        setLoading({loading: false});
      }
    });
    $.ajax ({
      type:'GET',
      // url:`${protocol}//handball.devitgso.iron.hostflyby.net/teams`,
      url:'http://localhost:3001/teams',
      dataType:'json',
      success: function(data) {
        setTeam(data);
        setTeamDefault(data[0].value);
        setNewPlayer({
          ...newPlayer,
          team: data[0].value
        });
      }
    });
  }, []);

  const addPlayer = () => {    
    if (!errorName && !errorNumber && document.querySelector('#team').innerText !== '') {
      setPlayers(prevState => {
        return [
          ...prevState, 
          newPlayer
        ];
      });
    }
  }

  const handleChangeName = (event) => {
    setErrorName(false);
    setHelperTextName('');
    if (event.target.value !== '') {
      setNewPlayer({
        ...newPlayer,
        name: event.target.value,
        id: Date.now().toString()
      });
    } else {
      setErrorName(true);
      setHelperTextName('Введите информацию');
    }
  }

  const handleChangeGenders = (event) => {
    setGender(event.target.value);
    setNewPlayer({
      ...newPlayer,
      gender: event.target.value
    });
  };

  const handleChangeTeams = (event) => {
    setTeamDefault(event.target.value);
    setNewPlayer({
      ...newPlayer,
      team: event.target.value
    });
  };

  const handleChangeNumber = (event) => {
    setErrorNumber(false);
    setHelperTextNumber('');

    if (event.target.value !== '') {
      setNewPlayer({
        ...newPlayer,
        number: event.target.value
      });
    } else {
      setErrorNumber(true);
      setHelperTextNumber('Введите игровой номер');
    }
  }

  const handleCloseModal = () => {
    setModal({
      ...modal,
      open: false,
    });
  };

  const savePlayer = () => {
    // console.log('click save', players)
    $.ajax ({
      type:'POST',
      // url:`${protocol}//handball.devitgso.iron.hostflyby.net/players`,
      url:'http://localhost:3001/players',
      dataType:'json',
      data: { players },
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

  return(
    <Fragment>
      <div className="header">
        <div className="header__logo">
          <img src={logo} alt={logo} />
        </div>
      </div>

      <div className="teams">
        <h3>
          Список игроков
        </h3>

        { loading.loading && <div className="account__loading"><CircularProgress /></div> }

        <div className="player__table">
          <div className="player__str">
            <span>Фамилия, Имя</span>
            <span>Пол</span>
            <span>Игровой номер</span>
            <span>Команда</span>
            <span>Действие</span>
          </div>

          {players.map((option, index) => (
            <div key={index + option.id} className="player__str">
              <PlayerString
                id={option.id}
                name={option.name}
                gender={option.gender === 'female' ? 'женщины' : 'мужчины'}
                number={option.number.toString()}
                team={option.team}
                setPlayers={setPlayers}
                players={players}

                teamDefault={teamDefault}
                genderDefault={gender}
                allTeams={team}
                allGenders={defaultGenders}

              />
            </div>
          ))}

        </div>

        <div className="teams__save">
          <TextField 
            error={errorName} 
            helperText={helperTextName} 
            id='name' className="player__team" 
            label="Фамилия, Имя" 
            onChange={handleChangeName} 
          />

          <TextField
            id="genders"
            select
            label="Пол"
            value={gender}
            onChange={handleChangeGenders}
            helperText={'Выберите пол игрока'}
          > 
            {defaultGenders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField 
            id='number' 
            type="number" 
            className="teams__team" 
            label="Номер" 
            onChange={handleChangeNumber} 
            error={errorNumber} 
            helperText={helperTextNumber}
          />

          <TextField
            id="team"
            select
            label="Команда"
            value={teamDefault}
            onChange={handleChangeTeams}
            helperText={'Выберите команду из списка'} 
          > 
            {team.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <button onClick={addPlayer}>Добавить игрока</button>
        </div>

        <div className="teams__buttons">    
          <Link className="teams__link" to="/account"><button className="button teams__button teams__button--back">Назад</button></Link>
          <button onClick={savePlayer} className="button teams__button--save">Сохранить</button>
        </div>
        

      </div>

      <Snackbar
        open={modal.open}
        autoHideDuration={1500}
        onClose={handleCloseModal}
        TransitionComponent={modal.Transition}
        message="Игроки сохранены"
        key={modal.Transition.name}
      />
      
    </Fragment>
  )
}

export default Player;