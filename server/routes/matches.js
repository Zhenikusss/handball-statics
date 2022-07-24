const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

const host = 'electra.hostflyby.net';
const user = 'devitgso_handball';
const database = 'devitgso_handball';
const passwordDatabase = 'PJmpTTXxbnF!4brXxbbMNYRB';
const port = 3306;

router.get('/', function(req, res) {
  const params = req.query;

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

  const sqlData = `SELECT id, teamA, teamB, date, time, tournament, 
    gender, resultGameA, resultGameB, resultGame30A, 
    resultGame30B FROM info_table`;

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
    if (err) throw err;
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

  if (params) {
    const season = Number(params.season);
    const tournament = params.tournament;
    const gender = params.gender;

    const sqlData = `SELECT id, teamA, teamB, date, time, tournament, 
      gender, resultGameA, resultGameB, resultGame30A, 
      resultGame30B FROM info_table`;

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
      if (err) throw err;
      res.json(result);
    });
  }

  if (id) {
    const deleteString = `DELETE FROM info_table WHERE id = ${id}`;

    sql.query(deleteString, function (err, result) {
      if (err) throw err;
    });

    res.send({ status: 200 });
  }

  sql.end();
});

module.exports = router;