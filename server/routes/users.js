const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

const host = 'electra.hostflyby.net';
const user = 'devitgso_handball';
const database = 'devitgso_handball';
const passwordDatabase = 'PJmpTTXxbnF!4brXxbbMNYRB';
const port = 3306;

router.post('/', function(req, res) {
  const setLogin = req.body.admin;
  const setPassword = req.body.password;

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

  sql.query("SELECT * FROM admin", function (err, result, fields) {
    if (err) throw err;

    if (result[0].login.toString() === setLogin.toString() && result[0].password.toString() === setPassword.toString()) {
      res.json({
        isLoggedIn: true,
        usersGroup: 'admin',
      });
      // isLoggedIn = true;
    } else if (result[1].login.toString() === setLogin.toString() && result[1].password.toString() === setPassword.toString()) {
      res.json({
        isLoggedIn: true,
        usersGroup: 'user',
      });
    }else {
      res.json(false);
    }
  });

  sql.end();
  
});

module.exports = router;
