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

  sql.query(`SELECT id, teamA, teamB, date, time, tournament, gender, resultGameA, resultGameB FROM info_table`, function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });

  sql.end();
  
});

module.exports = router;