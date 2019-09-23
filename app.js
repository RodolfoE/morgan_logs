var bodyParser = require('body-parser')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var fs = require('fs');
var morgan = require('morgan')
var path = require('path')

app.use(bodyParser.json())

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('insert into korok_logs(":method", ":url", ":response-time", ":status")', { stream: accessLogStream }))
morgan.token('json', function(req, res){ return res.body; })

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
