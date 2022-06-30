import React, { Fragment, useState } from 'react';
import logo from '../../../assets/img/logo.svg';

import { StringPlayer } from '../components';

const TeamPlayers = ({  }) => {
  const [players, setPlayers] = useState([
    {
      id: '1',
      name: 'test',
      gender: 'male',
      number: '9',
      team: 'BATE',
    },
  ])

  return (
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

        <div className="player__table">
          <div className="player__str">
            <span>Фамилия, Имя</span>
            <span>Пол</span>
            <span>Игровой номер</span>
            <span>Команда</span>
            <span>Действие</span>
          </div>

          <StringPlayer />

        </div>
      </div>
    </Fragment>
  )
}

export default TeamPlayers;