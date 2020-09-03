const express = require('express');
const router = express.Router();

router.post('/', function(req, res, next) {
  console.log(res);
  console.log(req);
  console.log(next);
});

module.exports = router;