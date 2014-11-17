var mongoose = require('mongoose');
var Q = require('q');
var _ = require('lodash-node');

var Survey = require('./models/Survey');
var Answer = require('./models/Answer');
var User = require('./models/User');
var Message = require('../utils/Messages');

var CODE_LENGTH = 10;

/**
 *
 * @param {String} environment
 * @constructor
 */
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

  /**
   *
   * @param {String} surveyId
   * @param {String} query
   * @param {Function} doneCallback
   */
  getSurveyById: function (surveyId, query, doneCallback) {
    this._model.findById(surveyId, query, doneCallback);
  },

  /**
   *
   * @param {Object} filter
   * @returns {q.Promise}
   */
  getSurvey: function(filter) {
    var model = this._model;
    return Q.denodeify(model.findOne.bind(model))(filter);
  },

  /**
   *
   * @param {Object} filter
   * @param {String} query
   * @param {Function} doneCallback
   */
  getSurveys: function (filter, query, doneCallback) {
    this._model.find(filter, query, doneCallback);
  },

  /**
   *
   * @param {Object} newSurvey
   * @returns {q.Promise}
   */
  addSurvey: function (newSurvey) {
    var survey = new this._model(newSurvey);
    var surveyCode = generateCode(CODE_LENGTH);
    survey.metadata.surveyCode = surveyCode;
    return Q.denodeify(survey.save.bind(survey))()
      .then(function(result) {

        // some stupid thing with denodeify save
        return result[0];
      });
  },

  /**
   *
   * @param {String} surveyId
   * @param {Object} updatingSurvey
   * @returns {Q.promise}
   */
  updateSurvey: function(surveyId, updatingSurvey) {
    var deferred = Q.defer();
    var options = {
      runValidators: true
    };

    this._model.findById(surveyId, function(err, survey) {
      if(err) {
        deferred.reject(err);
      } else if(!survey) {
        deferred.reject();
      } else {
        survey.metadata = updatingSurvey.metadata;
        survey.questions = updatingSurvey.questions;
        for(var i = 0; i < survey.questions.length; i++) {
          _.extend(survey.questions[i], updatingSurvey.questions[i]);
        }
        survey.save(function(err, survey) {
          if(err) {
            deferred.reject(err);
          } else {
            deferred.resolve(survey);
          }
        });
      }
    }.bind(this));

    return deferred.promise;
  },

  /**
   *
   * @param {Function} doneCallback
   */
  removeAllSurveys: function(doneCallback) {
    this._model.remove({}, doneCallback);
  },

  /**
   *
   * @param {String} surveyId
   * @param {Function} doneCallback
   */
  deleteSurvey: function(surveyId, doneCallback) {
    this._model.findByIdAndRemove(surveyId, doneCallback);
  }
};

module.exports = MongoSurveyProvider;


var generateCode = function(codeLength) {
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var text = '';

  for(var i = 0; i < codeLength; i++) {
    text += possible.charAt(Math.random() * possible.length);
  }

  return text;
};