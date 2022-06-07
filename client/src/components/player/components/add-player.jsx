import React, { useState } from "react";
import { TextField, MenuItem } from '@material-ui/core';

import { defaultGenders } from '../constants/default';

const AddPlayer = ({ setNewPlayer, setPlayers }) => {
  const [errorName, setErrorName] = useState(true);
  const [errorNumber, setErrorNumber] = useState(true);

  const [helperTextName, setHelperTextName] = useState('');
  const [helperTextNumber, setHelperTextNumber] = useState('');

  const [gender, setGender] = useState('male');
  const [teamDefault, setTeamDefault] = useState('');

  // const [ newPlayer, setNewPlayer] = useState({
  //   gender: gender,
  //   team: teamDefault
  // });


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

  const handleChangeTeams = (event) => {
    setTeamDefault(event.target.value);
    setNewPlayer({
      ...newPlayer,
      team: event.target.value
    });
  };

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


  return (
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
        {/* {team.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))} */}
      </TextField>

      <button onClick={addPlayer}>Добавить игрока</button>
    </div>
  )
}

export default AddPlayer;