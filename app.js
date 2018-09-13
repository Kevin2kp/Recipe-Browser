//Node & NPM Modules

const path = require('path');
const crypto = require('crypto');
const favicon = require('serve-favicon');
const url = require('url');


//Express & Middleware

const hbs = require('express-hbs');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

//Routers

const main_router = require('./src/routes/router');

const app = express();
const session_private_key = crypto.randomBytes(20).toString('utf8');


/*----------------------------------------------------------------------------------------------------------------------
 SET UP & MIDDLEWARE
 ----------------------------------------------------------------------------------------------------------------------*/


//View Engine
app.engine('hbs', hbs.express4({
	defaultLayout: path.resolve(__dirname, 'src', 'views', 'layout', 'default.hbs'),
	layoutsDir: path.resolve(__dirname, 'src', 'views', 'layout'),
}));
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'src', 'views'));

//Middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: session_private_key,
	resave:false,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));


/*----------------------------------------------------------------------------------------------------------------------
 ROUTES
 ----------------------------------------------------------------------------------------------------------------------*/


app.use('/', main_router);









/*----------------------------------------------------------------------------------------------------------------------
ERROR HANDLING
 ----------------------------------------------------------------------------------------------------------------------*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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
