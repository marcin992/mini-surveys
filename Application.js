/**
 * Created by Marcin on 2014-08-10.
 */

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var https = require('https');
var fs = require('fs');

var MongoSurveyProvider = require('./database/MongoSurveyProvider');

var Application = function (serverPort) {
  this.port = serverPort;

  this._init();
  this._registerRoutes();
};

Application.prototype = {
  port: null,
  app: null,
  server: null,
  surveyProvider: null,

  _init: function () {
    this.app = express();

// view engine setup
    this.app.set('views', path.join(__dirname, 'public', 'views'));
    this.app.set('view engine', 'jade');

    this.app.use(favicon());
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded());
    this.app.use(cookieParser());
    this.app.use(require('less-middleware')(path.join(__dirname, 'public')));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(session({
      secret: "very9difficult8secret7key6bitches"
    }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(flash());

    this.app.set('port', process.env.PORT || this.port);

    this.app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });

    require('./config/passport')(passport);

    this.surveyProvider = new MongoSurveyProvider(this.app.get('env'));
  },

  _registerRoutes: function () {
    var routes = require('./routes/routes')(this.app, this.surveyProvider, passport);
  },

  start: function () {
    var config = require('./config/ssl');
    var server = https.createServer(config, this.app);
    server.listen(8080);
    // var server = this.app.listen(this.app.get('port'), function () {
    //   console.log('Magic happens on port ' + server.address().port);
    // });
  }
};

module.exports = Application;