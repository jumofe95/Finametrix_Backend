var createError = require('http-errors');

// We load the express and body-parser modules
var express = require('express');
var bodyParser = require('body-parser');

// We call express to be able to create the server
var app = express();

// import the routes
var newsRouterApi = require('./routes/api/news');

// import the cors for allow a user agent (client) to obtain permission to access the server
var cors = require('cors');

var path = require('path');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// -- load middlewares --

//implemented CORS Policy
app.use(cors());

// configure bodyParser to convert the body of our requests to JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// load the routes
app.use('/api/news', newsRouterApi);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
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


// export this module in order to use the app variable outside of this file
module.exports = app;
