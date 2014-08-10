/**
 * Created by Marcin on 2014-08-10.
 */

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var dbConfig = require('./config/database');

var SurveyController = require('./controllers/SurveyController');

var Application = function(serverPort) {
    this.port = serverPort;

    this._init();
    this._connectToDatabase();
    this._registerRoutes();
};

Application.prototype = {
    port: null,
    app: null,
    server: null,

    _init: function() {
        this.app = express();

// view engine setup
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'jade');

        this.app.use(favicon());
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded());
        this.app.use(cookieParser());
        this.app.use(require('less-middleware')(path.join(__dirname, 'public')));
        this.app.use(express.static(path.join(__dirname, 'public')));

        this.app.set('port', process.env.PORT || this.port);


    },

    _connectToDatabase: function() {
        var options = {
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        };

        var environment = this.app.get('env');

        console.log(dbConfig.mongo.connectionString(environment));

        mongoose.connect(dbConfig.mongo.connectionString(environment), options);
    },

    _registerRoutes: function() {
        SurveyController.registerRoutes(this.app);

        /// catch 404 and forward to error handler
        this.app.use(function(req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        if (this.app.get('env') === 'development') {
            this.app.use(function(err, req, res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }

        this.app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
    },

    start: function() {
        var server = this.app.listen(this.app.get('port'), function() {
            console.log('Magic happens on port ' + server.address().port);
        });
    }
};

module.exports = Application;