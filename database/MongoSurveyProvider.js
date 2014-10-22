var mongoose = require('mongoose');

var Survey = require('./models/Survey');
var Answer = require('./models/Answer');
var User = require('./models/User');
var Message = require('../utils/Messages');

var MongoSurveyProvider = function (environment) {
  console.log(environment);
  this._init(environment);
  this._initCollection();
};

MongoSurveyProvider.prototype = {
  _connection: null,
  _model: null,
  _config: require('../config/database'),

  _init: function (environment) {
    var options = {
      server: {
        socketOptions: {
          keepAlive: 1
        }
      }
    };

    this._connection = mongoose.createConnection(this._config.mongo.connectionString(environment), options);
  },

  _initCollection: function() {
    this._model = this._connection.model('surveys', Survey);
  },

  getSurveyById: function (surveyId, query, doneCallback) {
    this._model.findById(surveyId, query, doneCallback);
  },

  getSurveys: function (filter, query, doneCallback) {
    this._model.find(filter, query, doneCallback);
  },

  addSurvey: function (newSurvey, doneCallback) {
    var survey = new this._model(newSurvey);
    survey.save(doneCallback);
  },

  removeAllSurveys: function(doneCallback) {
    this._model.remove({}, doneCallback);
  },

  deleteSurvey: function(surveyId, doneCallback) {
    this._model.findByIdAndRemove(surveyId, doneCallback);
  }
};

module.exports = MongoSurveyProvider;