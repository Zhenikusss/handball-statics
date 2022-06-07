import React, { useEffect, useState, useRef, Fragment } from 'react';
import { useForm, Controller } from "react-hook-form";
import {
  Link,
  useLocation
} from 'react-router-dom';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  MenuItem,
  FormControl,
  Checkbox,
} from '@material-ui/core';
import $ from 'jquery-ajax';
import Players from '../players';
// import { team } from '../defaultValues';
import Popup from '../popup-window/index';

const useUnload = fn => {
  const cb = useRef(fn);

  useEffect(() => {
    cb.current = fn;
  }, [fn]);

  useEffect(() => {
    const onUnload = (...args) => cb.current?.(...args);
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, []);
};

function Table () {
  const [ tableInfo, setTableInfo ] = useState({
    age: '',
    city: '',
    date: '',
    gender: '',
    id: '',
    place: '',
    resultGame30A: '',
    resultGame30B: '',
    resultGame60A: '',
    resultGame60B: '',
    resultGameA: '',
    resultGameAdd7A: '',
    resultGameAdd7B: '',
    resultGameAddOneA: '',
    resultGameAddOneB: '',
    resultGameAddTwoA: '',
    resultGameAddTwoB: '',
    resultGameB: '',
    teamA: '',
    teamB: '',
    time: '',
    tournament: '',
    spectators: '',
    hallCapacity: '',
    protests: '',
    comments: '',
    referee1: '',
    referee2: '',
    inspector: '',
    mainReferee: '',
    timeOut1A: '',
    timeOut2A: '',
    timeOut3A: '',
    num7mA: '',
    numGoalsA: '',
    timeOut1B: '',
    timeOut2B: '',
    timeOut3B: '',
    num7mB: '',
    numGoalsB: '',
    teamOfAA: '',
    teamOfA1A: '',
    teamOfA2A: '',
    teamOfA3A: '',
    teamOfA4A: '',
    teamOfA5A: '',
    teamOfA6A: '',
    teamOfA7A: '',
    teamOfA8A: '',
    teamOfA9A: '',
    teamOfA10A: '',
    teamOfA11A: '',
    teamOfA12A: '',
    teamOfA13A: '',
    teamOfA14A: '',
    teamOfA15A: '',
    teamOfA16A: '',
    teamOfA17A: '',
    teamOfA18A: '',
    teamOfA19A: '',
    teamOfA20A: '',
    teamOfA21A: '',
    teamOfA22A: '',
    teamOfA23A: '',
    teamOfAPointA: '',
    teamOfAB: '',
    teamOfA1B: '',
    teamOfA2B: '',
    teamOfA3B: '',
    teamOfA4B: '',
    teamOfA5B: '',
    teamOfA6B: '',
    teamOfA7B: '',
    teamOfA8B: '',
    teamOfA9B: '',
    teamOfA10B: '',
    teamOfA11B: '',
    teamOfA12B: '',
    teamOfA13B: '',
    teamOfA14B: '',
    teamOfA15B: '',
    teamOfA16B: '',
    teamOfA17B: '',
    teamOfA18B: '',
    teamOfA19B: '',
    teamOfA20B: '',
    teamOfA21B: '',
    teamOfA22B: '',
    teamOfA23B: '',
    teamOfAPointB: '',
    player1A: '',
    player2A: '',
    player3A: '',
    player4A: '',
    player5A: '',
    player6A: '',
    player7A: '',
    player8A: '',
    player9A: '',
    player10A: '',
    player11A: '',
    player12A: '',
    player13A: '',
    player14A: '',
    player15A: '',
    player16A: '',
    teamPlayer1A: '',
    teamPlayer2A: '',
    teamPlayer3A: '',
    teamPlayer4A: '',
    teamPlayer5A: '',
    teamPlayer6A: '',
    teamPlayer7A: '',
    teamPlayer8A: '',
    teamPlayer9A: '',
    teamPlayer10A: '',
    teamPlayer11A: '',
    teamPlayer12A: '',
    teamPlayer13A: '',
    teamPlayer14A: '',
    teamPlayer15A: '',
    teamPlayer16A: '',
    gPlayer1A: '',
    gPlayer2A: '',
    gPlayer3A: '',
    gPlayer4A: '',
    gPlayer5A: '',
    gPlayer6A: '',
    gPlayer7A: '',
    gPlayer8A: '',
    gPlayer9A: '',
    gPlayer10A: '',
    gPlayer11A: '',
    gPlayer12A: '',
    gPlayer13A: '',
    gPlayer14A: '',
    gPlayer15A: '',
    gPlayer16A: '',
    pPlayer1A: '',
    pPlayer2A: '',
    pPlayer3A: '',
    pPlayer4A: '',
    pPlayer5A: '',
    pPlayer6A: '',
    pPlayer7A: '',
    pPlayer8A: '',
    pPlayer9A: '',
    pPlayer10A: '',
    pPlayer11A: '',
    pPlayer12A: '',
    pPlayer13A: '',
    pPlayer14A: '',
    pPlayer15A: '',
    pPlayer16A: '',
    t1Player1A: '',
    t1Player2A: '',
    t1Player3A: '',
    t1Player4A: '',
    t1Player5A: '',
    t1Player6A: '',
    t1Player7A: '',
    t1Player8A: '',
    t1Player9A: '',
    t1Player10A: '',
    t1Player11A: '',
    t1Player12A: '',
    t1Player13A: '',
    t1Player14A: '',
    t1Player15A: '',
    t1Player16A: '',
    t2Player1A: '',
    t2Player2A: '',
    t2Player3A: '',
    t2Player4A: '',
    t2Player5A: '',
    t2Player6A: '',
    t2Player7A: '',
    t2Player8A: '',
    t2Player9A: '',
    t2Player10A: '',
    t2Player11A: '',
    t2Player12A: '',
    t2Player13A: '',
    t2Player14A: '',
    t2Player15A: '',
    t2Player16A: '',
    t3Player1A: '',
    t3Player2A: '',
    t3Player3A: '',
    t3Player4A: '',
    t3Player5A: '',
    t3Player6A: '',
    t3Player7A: '',
    t3Player8A: '',
    t3Player9A: '',
    t3Player10A: '',
    t3Player11A: '',
    t3Player12A: '',
    t3Player13A: '',
    t3Player14A: '',
    t3Player15A: '',
    t3Player16A: '',
    t4Player1A: '',
    t4Player2A: '',
    t4Player3A: '',
    t4Player4A: '',
    t4Player5A: '',
    t4Player6A: '',
    t4Player7A: '',
    t4Player8A: '',
    t4Player9A: '',
    t4Player10A: '',
    t4Player11A: '',
    t4Player12A: '',
    t4Player13A: '',
    t4Player14A: '',
    t4Player15A: '',
    t4Player16A: '',
    drPlayer1A: '',
    drPlayer2A: '',
    drPlayer3A: '',
    drPlayer4A: '',
    drPlayer5A: '',
    drPlayer6A: '',
    drPlayer7A: '',
    drPlayer8A: '',
    drPlayer9A: '',
    drPlayer10A: '',
    drPlayer11A: '',
    drPlayer12A: '',
    drPlayer13A: '',
    drPlayer14A: '',
    drPlayer15A: '',
    drPlayer16A: '',
    kshPlayer1A: '',
    kshPlayer2A: '',
    kshPlayer3A: '',
    kshPlayer4A: '',
    kshPlayer5A: '',
    kshPlayer6A: '',
    kshPlayer7A: '',
    kshPlayer8A: '',
    kshPlayer9A: '',
    kshPlayer10A: '',
    kshPlayer11A: '',
    kshPlayer12A: '',
    kshPlayer13A: '',
    kshPlayer14A: '',
    kshPlayer15A: '',
    kshPlayer16A: '',
    player1B: '',
    player2B: '',
    player3B: '',
    player4B: '',
    player5B: '',
    player6B: '',
    player7B: '',
    player8B: '',
    player9B: '',
    player10B: '',
    player11B: '',
    player12B: '',
    player13B: '',
    player14B: '',
    player15B: '',
    player16B: '',
    teamPlayer1B: '',
    teamPlayer2B: '',
    teamPlayer3B: '',
    teamPlayer4B: '',
    teamPlayer5B: '',
    teamPlayer6B: '',
    teamPlayer7B: '',
    teamPlayer8B: '',
    teamPlayer9B: '',
    teamPlayer10B: '',
    teamPlayer11B: '',
    teamPlayer12B: '',
    teamPlayer13B: '',
    teamPlayer14B: '',
    teamPlayer15B: '',
    teamPlayer16B: '',
    gPlayer1B: '',
    gPlayer2B: '',
    gPlayer3B: '',
    gPlayer4B: '',
    gPlayer5B: '',
    gPlayer6B: '',
    gPlayer7B: '',
    gPlayer8B: '',
    gPlayer9B: '',
    gPlayer10B: '',
    gPlayer11B: '',
    gPlayer12B: '',
    gPlayer13B: '',
    gPlayer14B: '',
    gPlayer15B: '',
    gPlayer16B: '',
    pPlayer1B: '',
    pPlayer2B: '',
    pPlayer3B: '',
    pPlayer4B: '',
    pPlayer5B: '',
    pPlayer6B: '',
    pPlayer7B: '',
    pPlayer8B: '',
    pPlayer9B: '',
    pPlayer10B: '',
    pPlayer11B: '',
    pPlayer12B: '',
    pPlayer13B: '',
    pPlayer14B: '',
    pPlayer15B: '',
    pPlayer16B: '',
    t1Player1B: '',
    t1Player2B: '',
    t1Player3B: '',
    t1Player4B: '',
    t1Player5B: '',
    t1Player6B: '',
    t1Player7B: '',
    t1Player8B: '',
    t1Player9B: '',
    t1Player10B: '',
    t1Player11B: '',
    t1Player12B: '',
    t1Player13B: '',
    t1Player14B: '',
    t1Player15B: '',
    t1Player16B: '',
    t2Player1B: '',
    t2Player2B: '',
    t2Player3B: '',
    t2Player4B: '',
    t2Player5B: '',
    t2Player6B: '',
    t2Player7B: '',
    t2Player8B: '',
    t2Player9B: '',
    t2Player10B: '',
    t2Player11B: '',
    t2Player12B: '',
    t2Player13B: '',
    t2Player14B: '',
    t2Player15B: '',
    t2Player16B: '',
    t3Player1B: '',
    t3Player2B: '',
    t3Player3B: '',
    t3Player4B: '',
    t3Player5B: '',
    t3Player6B: '',
    t3Player7B: '',
    t3Player8B: '',
    t3Player9B: '',
    t3Player10B: '',
    t3Player11B: '',
    t3Player12B: '',
    t3Player13B: '',
    t3Player14B: '',
    t3Player15B: '',
    t3Player16B: '',
    t4Player1B: '',
    t4Player2B: '',
    t4Player3B: '',
    t4Player4B: '',
    t4Player5B: '',
    t4Player6B: '',
    t4Player7B: '',
    t4Player8B: '',
    t4Player9B: '',
    t4Player10B: '',
    t4Player11B: '',
    t4Player12B: '',
    t4Player13B: '',
    t4Player14B: '',
    t4Player15B: '',
    t4Player16B: '',
    drPlayer1B: '',
    drPlayer2B: '',
    drPlayer3B: '',
    drPlayer4B: '',
    drPlayer5B: '',
    drPlayer6B: '',
    drPlayer7B: '',
    drPlayer8B: '',
    drPlayer9B: '',
    drPlayer10B: '',
    drPlayer11B: '',
    drPlayer12B: '',
    drPlayer13B: '',
    drPlayer14B: '',
    drPlayer15B: '',
    drPlayer16B: '',
    kshPlayer1B: '',
    kshPlayer2B: '',
    kshPlayer3B: '',
    kshPlayer4B: '',
    kshPlayer5B: '',
    kshPlayer6B: '',
    kshPlayer7B: '',
    kshPlayer8B: '',
    kshPlayer9B: '',
    kshPlayer10B: '',
    kshPlayer11B: '',
    kshPlayer12B: '',
    kshPlayer13B: '',
    kshPlayer14B: '',
    kshPlayer15B: '',
    kshPlayer16B: '',
    edit: 0,
  });

  const [playersA, setPlayersA] = useState([]);
  const [playersB, setPlayersB] = useState([]);

  const [team, setTeam] = useState([]);

  const { control, handleSubmit } = useForm({
    defaultValues: {},
   });
  const [ newForm, setNewForm ] = useState(false);
  const [ save, setSave ] = useState({
    save: false,
  });

  const teamA = tableInfo.teamA;
  const teamB = tableInfo.teamB;

  let protocol = window.location.protocol;
  let pathHash = window.location.hash.match(/\d+/g);
  if (pathHash != null) {
    pathHash = pathHash.join([]);
  } else {
    pathHash = 0;
  }

  const location = useLocation();
  let tableCreate = false;
  if (location.state === undefined) {
    tableCreate = false;
  } else {
    tableCreate = location.state.createTable;
  }

  let userGroup = localStorage.getItem('UsersGroup');

  const handleChangeInfo = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    if (fieldName.includes('teamPlayer')) {
      const fieldNumberPlayer = 'player' + fieldName.replace('teamPlayer', '');
      const teamAOrB = 'players' + fieldName.substring(fieldName.length - 1);
      let numberPlayer = '';

      if (teamAOrB === 'playersA') {
        playersA.forEach(element => {
          if (element.name === fieldValue) {
            numberPlayer = element.number;
          }
        });
      } else if (teamAOrB === 'playersB') {
        playersB.forEach(element => {
          if (element.name === fieldValue) {
            numberPlayer = element.number;
          }
        });
      } else {
        console.log('не существует')
      }
      
      setTableInfo((data) => ({
        ...data,
        [fieldNumberPlayer]: numberPlayer,
        id: pathHash,
      }));
    }

    setTableInfo((data) => ({
      ...data,
      [fieldName]: fieldValue,
      id: pathHash,
    }));
    
  }

  const handleChangeCheckBox = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.checked;

    setTableInfo((data) => ({
      ...data,
      [fieldName]: fieldValue,
      id: pathHash,
    }));
  }

  const printTable = (e) => {
    window.print()
  }

  const onSubmit = () => {
    const popupWindow = document.querySelector('.popup-window');
    $.ajax ({
      type:'POST',
      // url:`${protocol}//handball.devitgso.iron.hostflyby.net/data`,
      url:'http://localhost:3001',
      dataType:'json',
      data: { tableInfo, pathHash },
      success: function() {
        setSave({save: true});
        popupWindow.classList.add('open');
        setTimeout(() => popupWindow.classList.remove('open'), 3000);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        setSave({save: false});
        popupWindow.classList.add('open');
        setTimeout(() => popupWindow.classList.remove('open'), 3000);
        // console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
      }
    });
  };

  useEffect(() => {
    $.ajax ({      
      type:'GET',
      // url:`${protocol}//handball.devitgso.iron.hostflyby.net/data`,
      url:'http://localhost:3001',
      dataType:'json',
      data: pathHash,
      success: function(data) {
        if (data.length > 0) {
          setTableInfo(data[data.length - 1]);
          setNewForm(false);
        } else {
          setNewForm(true);
        }
      }
    });

    $.ajax ({      
      type:'GET',
      // url:`${protocol}//handball.devitgso.iron.hostflyby.net/teams`,
      url:'http://localhost:3001/teams',
      dataType:'json',
      success: function(data) {
        setTeam(data);
      }
    });
  }, []);

  useEffect(() => {
    $.ajax ({   
      type:'GET',
      // url:`${protocol}//handball.devitgso.iron.hostflyby.net/players?team=${teamA}`,
      url:`http://localhost:3001/players?team=${teamA}`,
      dataType:'json',
      success: function(data) {
        setPlayersA(data)
      }
    });

    $.ajax ({   
      type:'GET',
      // url:`${protocol}//handball.devitgso.iron.hostflyby.net/players?team=${teamB}`,
      url:`http://localhost:3001/players?team=${teamB}`,
      dataType:'json',
      success: function(data) {
        setPlayersB(data)
      }
    });
  }, [teamA, teamB]);

  // useUnload(e => {
  //   e.preventDefault();
  //   e.returnValue = '';
  // });

  return (
    <div>

        <form onSubmit={handleSubmit(onSubmit)} className="table">

          <div className = 'table__title'>Белорусская федерация гандбола</div>

          <div className = 'table__contact'>
            <div className = 'table__phone'>Факс: 017-3799654 / Моб. 029-1826983</div>
            <div className = 'table__email'><a href='mailto:office@handball.by'>office@handball.by</a></div>
          </div>

          
          <div className="table__block">

            <div className = 'table__row'>
              <div className = 'table__rang tr yellow'>Ранг матча</div>
              <div className = 'table__protocol'>
                  <div className = 'table__row'>


                    <section className = 'table__rul table__gender tr'>

                    <Controller
                      as={
                        <FormControl>
                          <RadioGroup value={tableInfo.gender} aria-label="gender" name="gender" onChange={(event) => handleChangeInfo(event)}>

                           <div className = 'gender__male'>
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              label="Мужчины"
                            />
                           </div>

                           <div className = 'gender__female'>
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              label="Женщины"
                            />
                           </div>

                          </RadioGroup>
                        </FormControl>
                       }
                        name="gender"
                        control={control}
                    />

                    </section>


                    <div className = 'table__prot tr yellow'>Протокол матча</div>
                     
                  </div>

                  <div className = 'table__row'>

                  <section className = 'table__rul table__tournament tr'>

                  <Controller
                      as={
                      <FormControl>
                        <RadioGroup value={tableInfo.age} aria-label="tournament" name="age" onChange={(event) => handleChangeInfo(event)}>

                         <div className = 'tournament__adults'>
                          <FormControlLabel
                            value="adults"
                            control={<Radio />}
                            label="Взрослые"
                          />
                         </div>

                         <div className = 'tournament__juniors'>
                          <FormControlLabel
                            value="juniors"
                            control={<Radio />}
                            label="Юниоры"
                          />
                         </div>

                         <div className = 'tournament__international'>
                          <FormControlLabel
                            value="international"
                            control={<Radio />}
                            label="Международный"
                          />
                         </div>
                        </RadioGroup>
                      </FormControl>
                      }
                        name="age"
                        control={control}
                    />

                  </section>

                  <section className = 'table__rul table__tournament tr'>

                  <Controller
                      as={
                      <FormControl>
                        <RadioGroup value={tableInfo.tournament} aria-label="tournament-cup" name="tournament" onChange={(event) => handleChangeInfo(event)}>

                         <div className = 'tournament-cup__CHRB'>
                          <FormControlLabel
                            value="chrb"
                            control={<Radio />}
                            label="ЧРБ"
                          />
                         </div>

                         <div className = 'tournament-cup__KRB'>
                          <FormControlLabel
                            value="krb"
                            control={<Radio />}
                            label="КРБ"
                          />
                         </div>

                         <div className = 'tournament-cup__PRB'>
                          <FormControlLabel
                            value="prb"
                            control={<Radio />}
                            label="ПРБ"
                          />
                         </div>

                         <div className = 'tournament-cup__tournament'>
                          <FormControlLabel
                            value="tournament"
                            control={<Radio />}
                            label="Турнир"
                          />
                         </div>

                        </RadioGroup>
                      </FormControl>
                      }
                        name="tournament"
                        control={control}
                    />

                  </section>                

                  </div>


              </div>

            </div>

            <div className = 'table__row'>
              <div className = 'team'>
                <div className = 'team__item team__home'>

                  <div className = 'table__row tr team__title green'>Хозяева</div>
                  <div className = 'table__row tr'>
                    <div className = 'team__title-A green'>A</div>
                    <div className = 'team__name'>

                    <Controller
                      as={
                        <FormControl>
                          <TextField value={tableInfo.teamA} name="teamA" onChange={(event) => handleChangeInfo(event)}
                            select
                            helperText="Пожалуйста, выберите команду"
                          >
                            {team.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </FormControl>
                      }
                        name="teamA"
                        control={control}
                    />

                    </div>
                  </div>
                    
                </div>
                <div className = 'team__item team__guest'>
                    
                <div className = 'table__row tr team__title blue'>Гости</div>
                  <div className = 'table__row tr'>
                    <div className = 'team__title-B blue'>Б</div>
                    <div className = 'team__name'>
                    
                    <Controller
                      as={
                        <FormControl>
                          <TextField value={tableInfo.teamB} name="teamB" onChange={(event) => handleChangeInfo(event)}
                            select
                            helperText="Пожалуйста, выберите команду"
                          >
                            {team.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </FormControl>
                      }
                        name="teamB"
                        control={control}
                    />

                    </div>
                  </div>

                </div>
              </div>
              <div className = 'result tr'>

                <div className = 'result__title'>Финальный результат</div>
                <div className = 'result__team tr'>
                  <Controller 
                    as={
                      <FormControl>
                        <TextField label="A" type="number" value={tableInfo.resultGameA} name="resultGameA" onChange={(event) => handleChangeInfo(event)} />
                      </FormControl>
                    }
                    name="resultGameA" 
                    control={control} 
                  />
                </div>
                <div className = 'result__team tr'>
                  <Controller 
                    as={
                      <FormControl>
                        <TextField label="Б" type="number" value={tableInfo.resultGameB} name="resultGameB" onChange={(event) => handleChangeInfo(event)} />
                      </FormControl>
                    }
                    name="resultGameB" 
                    control={control} 
                  />
                </div>

              </div>
            </div>

            <div className = 'table__row result__time'>

              <div className = 'result tr'>
                <div className = 'result__title yellow'>После 1 тайма (30`)</div>
                <div className = 'result__team tr'>
                  <Controller 
                    as={
                      <FormControl>
                        <TextField label="A" type="number" value={tableInfo.resultGame30A} name="resultGame30A" onChange={(event) => handleChangeInfo(event)} />
                      </FormControl>
                    }
                    name="resultGame30A" 
                    control={control} 
                  />
                </div>
                <div className = 'result__team tr'>
                  <Controller 
                    as={
                      <FormControl>
                        <TextField label="Б" type="number" value={tableInfo.resultGame30B} name="resultGame30B" onChange={(event) => handleChangeInfo(event)} />
                      </FormControl>
                    }
                    name="resultGame30B" 
                    control={control} 
                  />
                </div>
              </div>

              <div className = 'result tr'>
                <div className = 'result__title yellow'>После основного времени (60`)</div>
                <div className = 'result__team tr'>
                  <Controller 
                    as={
                      <FormControl>
                        <TextField label="А" type="number" value={tableInfo.resultGame60A} name="resultGame60A" onChange={(event) => handleChangeInfo(event)} />
                      </FormControl>
                    }
                    name="resultGame60A" 
                    control={control} 
                  />
                </div>
                <div className = 'result__team tr'>
                  <Controller 
                    as={
                      <FormControl>
                        <TextField label="Б" type="number" value={tableInfo.resultGame60B} name="resultGame60B" onChange={(event) => handleChangeInfo(event)} />
                      </FormControl>
                    }
                    name="resultGame60B" 
                    control={control} 
                  />
                </div>
              </div>

              <div className = 'result tr'>
                <div className = 'result__title yellow'>1 доп. время</div>
                <div className = 'result__team tr'>
                  <Controller 
                    as={
                      <FormControl>
                        <TextField label="А" type="number" value={tableInfo.resultGameAddOneA} name="resultGameAddOneA" onChange={(event) => handleChangeInfo(event)} />
                      </FormControl>
                    }
                    name="resultGameAddOneA" 
                    control={control} 
                  />
                </div>
                <div className = 'result__team tr'>
                  <Controller 
                    as={
                      <FormControl>
                        <TextField label="Б" type="number" value={tableInfo.resultGameAddOneB} name="resultGameAddOneB" onChange={(event) => handleChangeInfo(event)} />
                      </FormControl>
                    }
                    name="resultGameAddOneB" 
                    control={control} 
                  />
                </div>
              </div>

              <div className = 'result tr'>
                <div className = 'result__title yellow'>2 доп. время</div>
                <div className = 'result__team tr'>
                  <Controller 
                    as={
                      <FormControl>
                        <TextField label="А" type="number" value={tableInfo.resultGameAddTwoA} name="resultGameAddTwoA" onChange={(event) => handleChangeInfo(event)} />
                      </FormControl>
                    }
                    name="resultGameAddTwoA" 
                    control={control} 
                  />
                </div>
                <div className = 'result__team tr'>
                  <Controller 
                    as={
                      <FormControl>
                        <TextField label="Б" type="number" value={tableInfo.resultGameAddTwoB} name="resultGameAddTwoB" onChange={(event) => handleChangeInfo(event)} />
                      </FormControl>
                    }
                    name="resultGameAddTwoB" 
                    control={control} 
                  />
                </div>
              </div>

              <div className = 'result tr'>
                <div className = 'result__title yellow'>После 7м бросков</div>
                <div className = 'result__team tr'>
                  <Controller 
                    as={
                      <FormControl>
                        <TextField label="А" type="number" value={tableInfo.resultGameAdd7A} name="resultGameAdd7A" onChange={(event) => handleChangeInfo(event)} />
                      </FormControl>
                    }
                    name="resultGameAdd7A" 
                    control={control} 
                  />
                </div>
                <div className = 'result__team tr'>
                  <Controller 
                    as={
                      <FormControl>
                        <TextField label="Б" type="number" value={tableInfo.resultGameAdd7B} name="resultGameAdd7B" onChange={(event) => handleChangeInfo(event)} />
                      </FormControl>
                    }
                    name="resultGameAdd7B" 
                    control={control} 
                  />
                </div>
              </div>

            </div>

            <div className = 'table__row info-match'>
              <div className = 'info-match__item info-match__city tr'>
                <Controller 
                  as={
                    <FormControl>
                      <TextField label="Город" value={tableInfo.city} name="city" onChange={(event) => handleChangeInfo(event)} />
                    </FormControl>
                  }
                  name="city" 
                  control={control} 
                />
              </div>
              <div className = 'info-match__item info-match__place tr'>
                <Controller 
                  as={
                    <FormControl>
                      <TextField label="Зал" value={tableInfo.place} name="place" onChange={(event) => handleChangeInfo(event)} />
                    </FormControl>
                  }
                  name="place" 
                  control={control} 
                />
              </div>

              <div className = 'info-match__item info-match__date tr'>
                  <Controller
                    as={
                      <FormControl>
                        <TextField
                          id="date"
                          name="date"
                          label="Дата"
                          type="date"
                          value={tableInfo.date}
                          onChange={(event) => {handleChangeInfo(event)}}
                        />
                      </FormControl>
                    }
                    control={control}
                    name="date"
                  />
              </div>

              <div className = 'info-match__item info-match__time tr'>
                  <Controller
                    as={
                      <FormControl>
                        <TextField
                          id="time"
                          name="time"
                          label="Время"
                          type="time"
                          value={tableInfo.time}
                          onChange={(event) => {handleChangeInfo(event)}}
                        />
                      </FormControl>
                    }
                    control={control}
                    name="time"
                  />
              </div>

            </div>
          
            {tableCreate !== true && <Players handleChangeInfo={handleChangeInfo} playersTeamA = {playersA} playersTeamB = {playersB} tableInfo={tableInfo} control = {control}/>}
            
          </div>
      
          <div className="account__func account__func_table">

            {userGroup === 'user' ?
            
              tableInfo.edit === 1 ?
                  <Fragment>
                    <div className="btn-save" onClick={() => window.print()}>Печать</div>
                    <Link to="/account"><button className="button">Назад</button></Link>
                  </Fragment>
                : 
                  <Fragment>
                    <div className="checkbox-table">
                      <Controller as={
                          <FormControl>
                            <FormControlLabel
                              label="Сохранить с подачей?"
                              control={
                                <Checkbox
                                  checked={Boolean(tableInfo.edit)}
                                  onChange={(event) => {handleChangeCheckBox(event)}}
                                  name="edit" 
                                />
                              }
                            />
                          </FormControl>
                        }
                        control={control}
                        name="edit"
                      />
                    </div>
                    <button className="button">Сохранить</button>
                    <div className="btn-save" onClick={() => window.print()}>Печать</div>
                    <Link to="/account"><button className="button">Назад</button></Link>
                  </Fragment>
              :
              <Fragment>
                <button className="button">Сохранить</button>
                <div className="btn-save" onClick={printTable}>Печать</div>
                <Link to="/account"><button className="button">Назад</button></Link>
              </Fragment>
            }

          </div>
    
    </form>

    
    <Popup save={save.save} />

    </div> 
  );
}

export default Table;