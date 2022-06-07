import React, { useState } from "react";
import ContentEditablePlayer from './content-edit-player';
import { Tooltip, TextField, MenuItem } from '@material-ui/core';

const PlayerString = ({ id, name, gender, number, team, setPlayers, players, allTeams, allGenders }) => {
  const [stringEditPlayer, setStringEditPlayer] = useState(false);
  const [newStatePlayer, setNewStatePlayer] = useState([players]);
  const [teamList, setTeam] = useState(team);
  const [genderList, setGender] = useState(gender === 'мужчины' ? 'male' : 'female');

  const [editOn, setEditOn] = useState(false);

  const handleChangeTeams = (e) => {
    const value = e.target.value;
    const newState = players.slice();

    newState.forEach((item) => {
      if (item.id === id) {
        item.team = value;
      }
    });

    setEditOn(true);
    setTeam(value)
    setNewStatePlayer(newState);
  }

  const handleChangeGenders = (e) => {
    const value = e.target.value;
    const newState = players.slice();

    newState.forEach((item) => {
      if (item.id === id) {
        item.gender = value;
      }
    });

    setEditOn(true);
    setGender(value)
    setNewStatePlayer(newState);
  }

  const deletePlayer = (id) => {
    setPlayers(prevState => {
      return prevState.filter(team => team.id !== id);
    })
  }

  const editPlayer = (e, id) => {
    e.currentTarget.closest('div .player__str').style.backgroundColor = '#fffb024d';
    setStringEditPlayer(true);
  }

  const savePlayer = (e) => {
    if (editOn) {
      setPlayers(newStatePlayer)
    }
    setEditOn(false);
    setStringEditPlayer(false);
    e.currentTarget.closest('div .player__str').style.backgroundColor = '#ffffff';
  }
 
  if (stringEditPlayer) {
    return (
      <>
        <span id="name" className="player__name"><ContentEditablePlayer id={id} players={players} setNewStatePlayer={setNewStatePlayer} info={name} setEditOn={setEditOn} /></span>
        <span className="player__gender">
          <TextField
            id="genders"
            select
            label="Пол"
            value={genderList}
            onChange={handleChangeGenders}
            helperText={'Выберите пол игрока'}
          > 
            {allGenders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </span>
        <span id="number" className="player__number"><ContentEditablePlayer id={id} players={players} setNewStatePlayer={setNewStatePlayer} info={number} setEditOn={setEditOn} /></span>
        <span className="player__team">
          <TextField
            id="team"
            select
            label="Команда"
            value={teamList}
            onChange={handleChangeTeams}
            helperText={'Выберите команду из списка'} 
          > 
            {allTeams.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </span>
        <span className="player__kick_block">
          <Tooltip title='Кликните, чтобы сохранить'  key={id + 'edit'}>
            <div className="player__edit" onClick={(e) => savePlayer(e, id)}>Сохранить</div>
          </Tooltip>
          <Tooltip title='Кликните, чтобы удалить'  key={id + 'kick'}>
            <div className="player__kick" onClick={() => deletePlayer(id)}>Удалить игрока</div>
          </Tooltip>
        </span>
      </>
    )
  } else {
    return (
      <>
        <span className="player__name">{name}</span>
        <span className="player__gender">{gender}</span>
        <span className="player__number">{number}</span>
        <span className="player__team">{team}</span>
        <span>
          <Tooltip title='Кликните, чтобы редактировать'  key={id + 'edit'}>
            <div className="player__edit" onClick={(e) => editPlayer(e, id)}>Изменить</div>
          </Tooltip>
        </span>
      </>
    )
  }
}

export default PlayerString;