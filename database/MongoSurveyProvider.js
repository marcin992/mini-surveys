/**
 * Created by Marcin on 2014-08-23.
 */

var mongoose = require('mongoose');

var Survey = require('./models/Survey');
var Answer = require('./models/Answer');
var User = require('./models/User');
var Message = require('../utils/Messages');

var MongoSurveyProvider = function (environment) {
  this._init(environment);
};

MongoSurveyProvider.prototype = {
  _config: require('../config/database'),

  _init: function (environment) {
    var options = {
      server: {
        socketOptions: {
          keepAlive: 1
        }
      }
    };

    mongoose.connect(this._config.mongo.connectionString(environment), options);
  },

  getSurveyById: function (surveyId, query, doneCallback) {
    Survey.findById(surveyId, query, doneCallback);
  },

  getSurveys: function (filter, query, doneCallback) {
    Survey.find(filter, query, doneCallback);
  },

  addSurvey: function (newSurvey, doneCallback) {
    var survey = new Survey(newSurvey);
    survey.save(doneCallback);
  }
};

module.exports = MongoSurveyProvider;