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

  const team = req.query;

  console.log(team)

  sql.connect(function(err) {
    if (err) throw err;
  });

  if (Object.keys(team).length == 0) {
    sql.query(`SELECT * FROM info_players`, function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
  } else {
    sql.query(`SELECT name, number, id FROM info_players WHERE team='${team.team}'`, function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
  }

  sql.end();
  
});

router.post('/', function(req, res) {
  const players = req.body.players;

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

  deleteAllStrings();

  players.forEach((element) => {
    const playerKeys = Object.keys(element);
    const playerValues = Object.values(element);

    const nameTablesForInsert = `${playerKeys.map((item) => {return `${item}`})}`;
    const valueTablesForInsert = `${playerValues.map((item) => {return `'${item}'`})}`;

    insertTable(nameTablesForInsert, valueTablesForInsert);
  });

  function deleteAllStrings() {
    const deleteStrings = 'DELETE FROM info_players';
    sql.query(deleteStrings, function (err, result) {
      if (err) throw err;
    });
  }

  function insertTable(name, value) {
    // console.log(name, value);
    const insertInto = `REPLACE INTO info_players (${name}) VALUES (${value})`;
  
    sql.query(insertInto, function (err, result) {
      if (err) throw err;
    });
  }
  res.send({ status: 200 });

});

module.exports = router;