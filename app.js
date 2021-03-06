var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');

//var event = require('./public/javascripts/Event.js');
//var eventdisp = require('./public/javascripts/EventDispatcher.js');
///var tween = require('./public/javascripts/Tween.js');
//var cssplugin = require('./public/javascripts/CSSPlugin.js');
//var ease = require('./public/javascripts/Ease.js');
//var easel = require('./public/javascripts/easeljs-NEXT.min.js');
//var anim = require('./public/javascripts/animation.js');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', routes.index);
app.get('/users', users.list);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

//var port = process.env.PORT || 80;
//app.listen(port, function() {
//  console.log("Listening on " + port);
//});

http.createServer(app).listen(3000, function(){
  console.log("Express server listening on port 3000");
});
