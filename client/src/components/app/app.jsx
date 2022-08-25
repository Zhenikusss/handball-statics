import React, { useState } from 'react';
import $ from 'jquery-ajax';
import { 
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import './app.scss';
import Account from '../account';
import Login from '../login';
import Table from '../table';
import Team from '../team';
import Player from '../player';
import PlayerScores from '../../screens/player-scores';
import Audience from '../../screens/audience';
import Season from '../../screens/season';

import { requestUrl } from '../../const/const';

const App = () => {
  const [valueLogin, setLogin] = useState(false);
  let userInLogin = localStorage.getItem('Login');

  const onSubmit = data => {
    let getLogin = data.login;
    let getPassword = data.password;
    
  
    $.ajax ({
              
      type:'POST',
      url: `${requestUrl}/auth`,
      dataType:'json',
      data: {
        'admin': getLogin,
        'password': getPassword
      },
      success: function(inLogin) {
        setLogin(inLogin);
        if (!inLogin) {
          alert('Неверное имя пользователя или пароль')
        } else {
          handleFormSubmit(inLogin.isLoggedIn, inLogin.usersGroup);
        }
      }
    });
  }

  const handleFormSubmit = (inLogin, usersGroup) => {
    localStorage.setItem('Login', inLogin);
    localStorage.setItem('UsersGroup', usersGroup);
  };

  const onClick = (inLogin) => {
    if (inLogin) {
      setLogin(inLogin);
      localStorage.setItem('Login', inLogin);
    }
    localStorage.clear();
    window.location.reload();
  }

  if (valueLogin || userInLogin === 'true') {
    return (
      <Router>
        <Switch>
          <Route path="/account">
            <Account onClick={onClick} />
          </Route>
          <Route path="/table">
            <Table />
          </Route>
          <Route path="/team">
            <Team />
          </Route>
          <Route path="/player">
            <Player />
          </Route>
          <Route path="/player-scores">
            <PlayerScores />
          </Route>
          <Route path="/audience">
            <Audience />
          </Route>
          <Route path="/season">
            <Season />
          </Route>
          <Redirect to="/account" />
        </Switch>
      </Router>
    )
  } else {
    return (
      <Router>
        <Switch>
          <Route path="/auth">
            <Login onSubmit={onSubmit} />
          </Route>
          <Redirect to="/auth" />
        </Switch>
      </Router> 
    )
  }
}

export default App;