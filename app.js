var bodyParser = require('body-parser')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

//definido rotas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//inicializando morgan
var morgan = require('morgan')
var path = require('path')

app.use(bodyParser.json());

//inicializando Winston
var winston = require('./config/winston');

app.use(morgan('combined', { stream: winston.stream }));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (req.method.toLowerCase() === "post" || req.method.toLowerCase() === "put") {
    //converter body passado pelo cliente da aplicação em base64
    let bodyEmB64 = Buffer.from(JSON.stringify(req.body)).toString('base64');

    // Adiciona log de erro no arquivo passado no obj option do arquivo config/winston.js 
    winston.error(`insert into erro_logs values('${err.status || 500}', '${err.message}', '${req.originalUrl}', '${req.method}', '${req.ip}', '${bodyEmB64}')`);
  } else {
    // Adiciona log de erro no arquivo passado no obj option do arquivo config/winston.js 
    winston.error(`insert into erro_logs values('${err.status || 500}', '${err.message}', '${req.originalUrl}', '${req.method}', '${req.ip}')`);
  }

  // retornar status de erro
  res.status(err.status || 500);
});

module.exports = app;
