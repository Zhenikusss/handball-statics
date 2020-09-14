const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

router.post('/', function(req, res) {
  const setLogin = req.body.admin;
  const setPassword = req.body.password;

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

  sql.query("SELECT * FROM admin", function (err, result, fields) {
    if (err) throw err;

    if (result[0].login.toString() === setLogin.toString() && result[0].password.toString() === setPassword.toString()) {
      res.json(true);
      isLoggedIn = true;
    } else {
      res.json(false);
    }
  });

  sql.end();
  
});

module.exports = router;
