var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var Q = require('q');
var _ = require('lodash-node');

var Survey = require('./models/Survey');
var Answer = require('./models/Answer');
var User = require('./models/User');
var Message = require('../utils/Messages');

/**
 *
 * @param environment
 * @constructor
 */
var MongoAnswerProvider = function (environment) {
  console.log(environment);
  this._init(environment);
  this._initCollection();
};

MongoAnswerProvider.prototype = {
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
    this._model = this._connection.model('answers', Answer);
  },

  saveAnswers: function(answers) {
    var model = this._model;
    return Q.denodeify(model.collection.insert.bind(model.collection))(answers);




    //var respond = new this._model({
    //  surveyId: surveyId,
    //  answers: answers
    //});
    //
    //return Q.denodeify(respond.save.bind(respond))()
    //  .then(function(result) {
    //    // some stupid thing with denodeify save
    //    return result[0];
    //  })
  },

  getAnswers: function(surveyId) {
    var model = this._model;

    return Q.denodeify(model.find.bind(model))({
      surveyId: surveyId
    });
  },

  deleteAnswers: function(surveyId, questionNumber) {
    var model = this._model;

    return Q.denodeify(model.collection.remove.bind(model.collection))({
      surveyId: surveyId,
      questionNumber: questionNumber
    });
  },

  countAnswers: function(surveyId) {
    var model = this._model;
    return Q.denodeify(model.aggregate.bind(model))([{
      $match: {
        surveyId: {
          $eq: surveyId
        }
      }
    }, {
      $group: {
        _id: {
          questionNumber: "$questionNumber",
          respond: "$respond"
        }, count: { $sum: 1 }
      }
    }]);
  }
};

module.exports = MongoAnswerProvider;