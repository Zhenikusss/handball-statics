const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

const host = 'electra.hostflyby.net';
const user = 'devitgso_handball';
const database = 'devitgso_handball';
const passwordDatabase = 'PJmpTTXxbnF!4brXxbbMNYRB';
const port = 3306;

router.get('/', function(req, res) {

  const sql = mysql.createConnection({
    host: host,
    user: user,
    database: database,
    password: passwordDatabase,
    port: port
  });

  const year = new Date().getFullYear();
  const team = req.query;

  sql.connect(function(err) {
    if (err) throw err;
  });

  sql.query(`SELECT * FROM info_table`, function (err, result, fields) {
    if (err) throw err;
    const arrPlayers = [];
    
    result.forEach(objForm => {
      Object.keys(objForm).forEach(nameKey => {
        if (nameKey.indexOf('teamPlayer') > -1) {
          const fieldNumberPlayer = 'gPlayer' + nameKey.replace('teamPlayer', '');
          const fieldTeamPlayer = 'team' + nameKey.slice(-1);
          const fieldTournamentPlayer = 'tournament';
          let goals = objForm[fieldNumberPlayer];
                
          if (goals === '') {
            goals = '0';
          }

          if (objForm[nameKey] != '') {
            const newObjPlayer = {
              player: objForm[nameKey],
              countGoals: goals,
              countGames: '',
              team: objForm[fieldTeamPlayer],
              tournament: objForm[fieldTournamentPlayer]
            }
            arrPlayers.push(newObjPlayer);
          }
        }
      })
        
    });
    result = arrPlayers;
    res.json(result);
  });

  sql.end();
    
});

router.post('/', function(req, res) {
  const id = req.body.id;
  const params = req.body.params;

  const sql = mysql.createConnection({
    host: host,
    user: user,
    database: database,
    password: passwordDatabase,
    port: port
  });

  sql.connect(function(err) {
    if (err) throw err;
  });

  const season = Number(params.season);
  const tournament = params.tournament;
  const gender = params.gender;
  const arrPlayers = [];

  const sqlData = 'SELECT * FROM info_table';

  sql.query(sqlData, function (err, result) {
    if (!!tournament) {
      result = result.filter((item) => item.tournament === tournament);
    } 
    if (!!gender) {
      result = result.filter((item) => item.gender === gender);
    } 
    if (!!season) {
      result = result.filter((item) => 
        Number(item.date.substring(0, 4).trim()) === season || 
        Number(item.date.substring(0, 4).trim()) === season + 1
      );
    }

    result.forEach(objForm => {
      Object.keys(objForm).forEach(nameKey => {
        if (nameKey.indexOf('teamPlayer') > -1) {
          const fieldNumberPlayer = 'gPlayer' + nameKey.replace('teamPlayer', '');
          const fieldTeamPlayer = 'team' + nameKey.slice(-1);
          const fieldTournamentPlayer = 'tournament';
          let goals = objForm[fieldNumberPlayer];

          if (goals === '') {
            goals = '0';
          }

          if (objForm[nameKey] != '') {
            const newObjPlayer = {
              player: objForm[nameKey],
              countGoals: goals,
              countGames: '',
              team: objForm[fieldTeamPlayer],
              tournament: objForm[fieldTournamentPlayer]
            }
            arrPlayers.push(newObjPlayer);
          }
        }
      }) 
    });

    result = arrPlayers;

    if (err) throw err;
    res.json(result);
  });

  sql.end();
});

module.exports = router;