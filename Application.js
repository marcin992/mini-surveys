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

var SurveyController = require('./controllers/SurveyController');
var ViewController = require('./controllers/ViewController');
var AuthenticationController = require('./controllers/AuthenticationController');
var MongoDataProvider = require('./database/MongoDataProvider');

var Application = function (serverPort) {
  this.port = serverPort;

  this._init();
  this._registerRoutes();
};

Application.prototype = {
  port: null,
  app: null,
  server: null,
  dataProvider: null,
  surveyController: null,
  viewController: null,
  authenticationController: null,

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

    require('./config/passport')(passport);

    this.dataProvider = new MongoDataProvider(this.app.get('env'));
  },

  _registerRoutes: function () {
    this.surveyController = new SurveyController(this.app, this.dataProvider);
    this.surveyController.registerRoutes();

    this.viewController = new ViewController(this.app);
    this.viewController.registerRoutes();

    this.authenticationController = new AuthenticationController(this.app, passport);
    this.authenticationController.registerRoutes();

    /// catch 404 and forward to error handler
    this.app.use(function (req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    if (this.app.get('env') === 'development') {
      this.app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    this.app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });
  },

  start: function () {
    var server = this.app.listen(this.app.get('port'), function () {
      console.log('Magic happens on port ' + server.address().port);
    });
  }
};

module.exports = Application;