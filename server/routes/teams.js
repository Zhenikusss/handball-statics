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
  
  sql.connect(function(err) {
    if (err) throw err;
  });

  sql.query(`SELECT id, value, label FROM info_team`, function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });

  sql.end();
    
});

router.post('/', function(req, res) {
  const teams = req.body.teams;

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

  teams.forEach((element) => {
    const teamsKeys = Object.keys(element);
    const teamValues = Object.values(element);

    const nameTablesForInsert = `${teamsKeys.map((item) => {return `${item}`})}`;
    const valueTablesForInsert = `${teamValues.map((item) => {return `'${item}'`})}`;

    insertTable(nameTablesForInsert, valueTablesForInsert);
  });

  function deleteAllStrings() {
    const deleteStrings = 'DELETE FROM info_team';
    sql.query(deleteStrings, function (err, result) {
      if (err) throw err;
    });
  }

  function insertTable(name, value) {
    const insertInto = `REPLACE INTO info_team (${name}) VALUES (${value})`;
  
    sql.query(insertInto, function (err, result) {
      if (err) throw err;
    });
  }
  res.send({ status: 200 });

});
  
module.exports = router;