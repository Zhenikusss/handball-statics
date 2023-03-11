const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const matchesRouter = require('./routes/matches');
const teamsRouter = require('./routes/teams');
const seasonsRouter = require('./routes/seasons');
const playersRouter = require('./routes/players');
const statisticScore = require('./routes/statistic-score');
const audiences = require('./routes/audiences');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// var bodyParser = require('body-parser');
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));

app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

app.use('/data', indexRouter);
app.use('/matches', matchesRouter);
app.use('/teams', teamsRouter);
app.use('/seasons', seasonsRouter);
app.use('/players', playersRouter);
app.use('/statistic-score', statisticScore);
app.use('/audiences', audiences);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'auth', 'index.html'));
});

app.use('/auth', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;