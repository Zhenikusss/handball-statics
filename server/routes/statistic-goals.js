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

    if (Object.keys(team).length == 0) {
      sql.query(`SELECT * FROM info_table WHERE YEAR(date)=${year}`, function (err, result, fields) {
        if (err) throw err;
        const arrPlayers = [];

        result.forEach(objForm => {
          Object.keys(objForm).forEach(nameKey => {      
            if (nameKey.indexOf('teamPlayer') > -1) {
              const fieldNumberPlayer = 'gPlayer' + nameKey.replace('teamPlayer', '');
              let goals = objForm[fieldNumberPlayer];

              if (goals === '') {
                goals = '0';
              }

              if (objForm[nameKey] != '') {
                const newObjPlayer = {
                  player: objForm[nameKey],
                  countGoals: goals,
                  countGames: '',
                }
                arrPlayers.push(newObjPlayer);
              }
            }
          })
          
        });
        result = arrPlayers;
        res.json(result);
    });
    } else {
      // sql.query(`SELECT * FROM info_table WHERE YEAR(date)=${year} AND gender='${team.gender}'`, function (err, result, fields) {
      // sql.query(`SELECT * FROM info_table WHERE gender='${team.gender}' AND tournament='chrb'`, function (err, result, fields) {
      sql.query(`SELECT * FROM info_table WHERE gender='${team.gender}' AND tournament='${team.tournament}'`, [team.gender, team.tournament], function (err, result, fields) {
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
    }

    sql.end();
    
  });

module.exports = router;