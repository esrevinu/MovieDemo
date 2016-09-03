var express = require('express');
var port=process.env.PORT||3000;
var path = require('path');
var session = require('express-session');
var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var logger = require('morgan');
var fs = require('fs');

var app = express();
var dbUrl = 'mongodb://localhost/moviedemo';

mongoose.connect(dbUrl);
// models loading
var models_path = __dirname + '/app/models';
var walk = function(path){
    fs.readdirSync(path)
        .forEach(function(file){
            var newPath = path+'/'+file;
            var stat = fs.statSync(newPath);
            if(stat.isFile()){
                if(/(.*)\.(js|coffee)/.test(file)){
                    require(newPath);
                }
            }
            else if(stat.isDirectory()){
                walk(newPath);
            }
        })
}

// view engine setup
app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('connect-multiparty')());
app.use(session({
    secret: 'sven',
    resave:false,
    saveUninitialized:true,
    store: new mongoStore({
        url:dbUrl,
        colllection:'sessions'
    })
}));

if('development' === app.get('env')){
    console.log(app.get('env'));
    app.set('showStackError',true);
    app.use(logger('dev'));
    app.locals.pretty = true;
    mongoose.set('debug',true);
}

require('./config/routes')(app)

app.locals.moment = require('moment');

app.listen(port);
console.log('movie demo started on port '+port);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));

// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;
