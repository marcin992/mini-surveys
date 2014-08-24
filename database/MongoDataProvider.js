/**
 * Created by Marcin on 2014-08-23.
 */

var mongoose = require('mongoose');

var Survey = require('./models/Survey');
var Answer = require('./models/Answer');
var User = require('./models/User');
var Message = require('../utils/Messages');

var MongoDataProvider = function (environment) {
  this._init(environment);
};

MongoDataProvider.prototype = {
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

  addSurvey: function (newSurvey, doneCallback) {
    new Survey(newSurvey).save(doneCallback);
  },

  addQuestion: function (surveyId, newQuestion, doneCallback) {
    Survey.findById(surveyId, function (err, survey) {
      if (err)
        throw err;
      if (!survey) {
        throw new Error(Message.NO_SURVEY.en);
      }
      survey.questions.push(newQuestion);
      survey.save(doneCallback);
    });
  },

  getSurveyById: function (surveyId, doneCallback) {
    Survey.findById(surveyId, doneCallback);
  },

  updateSurvey: function (surveyId, changedSurvey, doneCallback) {
    Survey.findByIdAndUpdate(surveyId, changedSurvey, doneCallback);
  },

  deleteSurvey: function (surveyId, doneCallback) {
    Survey.findByIdAndRemove(surveyId, doneCallback);
  },

  getSurvey: function (filter, doneCallback) {
    Survey.find(filter, doneCallback);
  },

  getQuestionById: function (surveyId, questionId, doneCallback) {
    doneCallback();
  },

  removeAllSurveys: function (doneCallback) {
    Survey.remove({}, doneCallback);
  },

  removeAllAnswers: function (doneCallback) {
    Answer.remove({}, doneCallback);
  },

  removeAllUsers: function (doneCallback) {
    User.remove({}, doneCallback);
  }

};

module.exports = MongoDataProvider;