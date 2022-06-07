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

  const queryParams = req._parsedOriginalUrl.query;

  sql.connect(function(err) {
    if (err) throw err;
  });

  sql.query(`SELECT * FROM info_table WHERE id=${queryParams}`, function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });

  sql.end();
  
});

router.post('/', function(req, res) {
  const infoTableName = Object.keys(req.body.tableInfo);
  const infoTableValue = Object.values(req.body.tableInfo);
  const arrayData = req.body.tableInfo;

  const sql = mysql.createConnection({
    host: host,
    user: user,
    database: database,
    password: passwordDatabase,
    port: port
  });

  const queryParams = req.body.pathHash;

  sql.connect(function(err) {
    if (err) throw err;
  });

  const nameTables = `${infoTableName.map((item) => {return `${item} text not null`})}`;
  const nameTablesForInsert = `${infoTableName.map((item) => {return `${item}`})}`;
  const valueTablesForInsert = `${infoTableValue.map((item) => {return `'${item}'`})}`;

  function createAndInsertTable() {
    const createTable = `CREATE TABLE IF NOT EXISTS info_table (
      id TEXT PRIMARY KEY,
      ${nameTables}
    )`;
  
    sql.query(createTable, function (err, result) {
      if (err) {
        throw err;
      } 
      console.log("Table created");
    });
  
    const insertInto = `INSERT INTO info_table (${nameTablesForInsert}) VALUES (${valueTablesForInsert})`;
  
    sql.query(insertInto, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  }

  function changeDataTable() {
    const arrayForUpdate = [];

    Object.entries(arrayData).forEach(([key, value]) => {
      if (key === 'edit') {
        if (value === 'true') {
          value = 1;
        } else {
          value = 0;
        }
      }
      let newDataPushArray = `${key} = '${value}'`;
      arrayForUpdate.push(newDataPushArray);
    });

    let newArrayForUpdate = `${arrayForUpdate.map((item) => {return `${item}`})}`;

    const changeTable = `UPDATE info_table SET ${newArrayForUpdate} WHERE id=${queryParams}`;

    sql.query(changeTable, function (err, result) {
      if (err) throw err;
      console.log(`id = ${queryParams} updated`);
    });
  }

  sql.query(`SELECT id FROM info_table`, function (err, result, fields) {
    if (err) throw err;

    let newArrResult = [];

    result.forEach(el => {
      let id = el.id.toString();
      newArrResult.push(id);
    });

    if (newArrResult.includes(queryParams)) {
      changeDataTable();
    } else {
      createAndInsertTable();
    }   

  });

  res.send({ status: 200 });

});

module.exports = router;