var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./app.json');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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


require('child_process').exec('cd /home/pi/raspcamcfg;git log -1 --format=format:\'%h\'',(error,stdout,stderr) => {
    if(stdout) {
        config.lastcommit = stdout;
        //console.log(stdout);
    }
  }
);

require('child_process').exec('tail -1 /var/log/apt/history.log | cut -d\' \' -f2,4',(error,stdout,stderr) => {
    if(stdout) {
        config.lastupgrade = stdout;
        //console.log(stdout);
    }
  }
)


module.exports = app;
