import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery-ajax';
import CircularProgress from '@material-ui/core/CircularProgress';
import './account.scss';
import { Fragment } from 'react';
import logo from '../../assets/img/logo.svg';

function Account (props) {
  const [loading, setLoading] = useState({
    loading: true,
  })
  const [matchItem, setMatchItem] = useState({});
  let userGroup = localStorage.getItem('UsersGroup');
  let protocol = window.location.protocol;

  if (Object.keys(matchItem).length !== 0) {
    matchItem.sort(function (a, b) {
      if (a.date > b.date) {
        return -1;
      }
      if (a.date < b.date) {
        return 1;
      }
      return 0;
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
  
  useEffect(() => {
    $.ajax ({      
      type:'GET',
      // url:`${protocol}//handball.devitgso.iron.hostflyby.net/matches`,
      url:'http://localhost:3001/matches',
      dataType:'json',
      success: function(data) {
        setMatchItem(data);
        setLoading({loading: false});
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
          {userGroup === 'admin' ? <div className="account__block">

              {matchItem.map((anObjectMapped, index) => 
                  <Link key={index + anObjectMapped.id} to={{
                    pathname: "/table",
                    hash: anObjectMapped.id,
                  }}>
                    <div className="account__item">
                      <div className="account__name">
                        <div className="account__teamA">{anObjectMapped.teamA}</div>
                        <div className="account__teamB">{anObjectMapped.teamB}</div>
                      </div>
                      <div className="account__date">
                        <div className="account__time">{anObjectMapped.time}</div>
                        <div className="account__day">
                          {reverseString(anObjectMapped.date) === reverseString(today) ? 'Сегодня' : reverseString(anObjectMapped.date)}
                        </div>
                      </div>
                    </div>
                  </Link>
              )}
            </div>

          : <div className="account__block">
              {matchItem.map((anObjectMapped, index) =>
                  reverseString(anObjectMapped.date) === reverseString(today) && <Link 
                      key={index + anObjectMapped.id} to={{
                      pathname: "/table",
                      hash: anObjectMapped.id,
                    }}>
                      <div className="account__item">
                        <div className="account__name">
                          <div className="account__teamA">{anObjectMapped.teamA}</div>
                          <div className="account__teamB">{anObjectMapped.teamB}</div>
                        </div>
                        <div className="account__date">
                          <div className="account__time">{anObjectMapped.time}</div>
                          <div className="account__day">Сегодня</div>
                        </div>
                      </div>
                  </Link>
              )}
            </div>
            
          }

          </div>

          <div className="account__func">
            <div className="account__save account__save--team">
              {userGroup === 'admin' &&
                <Fragment>
                  <Link to={{
                    pathname: "/table",
                    hash: Date.now().toString(),
                    state: { createTable: true }
                  }} >
                     <button>Создать</button>
                  </Link>
                  <Link to={{
                    pathname: "/team",
                  }} >
                    <button>Команды</button>
                  </Link>
                  <Link to={{
                    pathname: "/player",
                  }} >
                    <button>Игроки</button>
                  </Link>
                </Fragment>
              }        
            </div>
            <div className="account__close">
              <a href="mailto:morozov@itg-soft.by" className="account__teh button">Написать в техподдержку</a>
              <button className="account__exit" onClick={() => {props.onClick(false)}}>Выйти</button>
            </div>
            
          </div>
        </div>
      </Fragment>
    )

  }

}
  
export default Account;