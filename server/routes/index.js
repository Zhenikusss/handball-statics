const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

router.get('/', function(req, res) {

  const sql = mysql.createConnection({
    host: 'iron.hostflyby.net',
    user: 'devitgso_handball',
    database: 'devitgso_handball',
    password: 'PJmpTTXxbnF!4brXxbbMNYRB',
    port: 3306
  });

  sql.connect(function(err) {
    if (err) throw err;
  });

  sql.query("SELECT * FROM info_form", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
    // console.log(typeof result);
    console.log(result);
  });

  sql.end();
  
});


router.post('/', function(req, res) {
  const gender = req.body;

  const sql = mysql.createConnection({
    host: 'iron.hostflyby.net',
    user: 'devitgso_handball',
    database: 'devitgso_handball',
    password: 'PJmpTTXxbnF!4brXxbbMNYRB',
    port: 3306
  });

  sql.connect(function(err) {
    if (err) throw err;
  });

  const createTable = 'CREATE TABLE IF NOT EXISTS info_form (gender VARCHAR(32))';
  sql.query(createTable, function (err, result) {
    if (err) {
      throw err;
    } 
    console.log("Table created");
  });

  const insertInto = `INSERT INTO info_form (gender) VALUES (${JSON.stringify(gender.gender)})`;
  sql.query(insertInto, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    console.log(result);
  });

  sql.end();
  
});

module.exports = router;