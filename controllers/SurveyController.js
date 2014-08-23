/**
 * Created by Marcin on 2014-08-10.
 */

var express = require('express');
var _ = require('lodash-node');

var Message = require('../utils/Messages');
var MessageSender = require('../utils/MessageSender');

var SurveyController = function (application, dataProvider) {
  this.application = application;
  this.dataProvider = dataProvider;

  this._init();
};

SurveyController.prototype = {
  application: null,
  dataProvider: null,
  router: null,

  registerRoutes: function () {
    this.router.route('/')
      .post(this._addSurvey);

    this.router.route('/:surveyId')
      .get(this._getSurveyById)
      .put(this._updateSurvey)
      .delete(this._deleteSurvey);

    this.router.route('/:surveyId/questions')
      .post(this._addQuestion);

    this.router.route('/:surveyId/questions/:questionId')
      .get(this._getQuestionById)
      .put(this._updateQuestion)
      .delete(this._deleteQuestion);

    this.application.use('/api/surveys', this.router);
  },

  _init: function () {
    this.router = express.Router();
  },

  _addSurvey: function (req, res) {
    this.dataProvider.addSurvey({
      "title": req.body.title,
      "questionCount": 0,
      "questions": [],
      "userId": req.user._id
    }, function (err, survey) {
      if (err) {
        MessageSender.sendDatabaseError(res, err);
      } else {
        MessageSender.sendJsonObject(res, survey, Message.SURVEY_ADDED.en);
      }
    });
  },

  _getSurveyById: function (req, res) {

  },

  _updateSurvey: function (req, res) {

  },

  _deleteSurvey: function (req, res) {

  },

  _addQuestion: function (req, res) {

  },

  _getQuestionById: function (req, res) {

  },

  _updateQuestion: function (req, res) {

  },

  _deleteQuestion: function (req, res) {

  }
};

module.exports = SurveyController;

//var router = express.Router();
//module.exports = {
//  registerRoutes: function (app) {
//    router.route('/')
//      .post(addSurvey);
//
//    router.route('/:surveyId')
//      .get(getSurveyById)
//      .put(updateSurvey)
//      .delete(deleteSurvey);
//
//    router.route('/:surveyId/questions')
//      .post(addQuestion);
//
//    router.route('/:surveyId/questions/:questionId')
//      .get(getQuestionById)
//      .put(updateQuestion)
//      .delete(deleteQuestion);
//
//    app.use('/api/surveys', router);
//  }
//};
//
//function addSurvey(req, res) {
//  new Survey({
//    title: req.body.title,
//    questionCount: 0,
//    questions: []
//  }).save(function (err, survey) {
//      if (err)
//        MessageSender.sendDatabaseError(res, err);
//      else {
//        MessageSender.sendJsonObject(res, survey, Message.SURVEY_ADDED.en);
//      }
//    });
//}
//
//function addQuestion(req, res) {
//  Survey.findById(req.params.surveyId, function (err, survey) {
//    if (err)
//      MessageSender.sendDatabaseError(res, err);
//    else {
//      survey.addQuestion({
//        number: (survey.questionCount + 1),
//        type: req.body.type,
//        body: req.body.body,
//        possibleAnswers: req.body.possibleAnswers
//      }, function (err, survey) {
//        if (err)
//          MessageSender.sendDatabaseError(res, err);
//        else
//          MessageSender.sendJsonObject(res, survey, Message.QUESTION_ADDED.en);
//      });
//    }
//  });
//}
//
//function getSurveyById(req, res) {
//  Survey.findById(req.params.surveyId, function (err, survey) {
//    if (err)
//      MessageSender.sendDatabaseError(res, err);
//    else {
//      if (survey !== null) {
//        MessageSender.sendJsonObject(res, survey);
//      } else {
//        MessageSender.sendMessage(res, Message.NO_SURVEY.en);
//      }
//    }
//  });
//}
//
//function updateSurvey(req, res) {
//  Survey.findByIdAndUpdate(req.params.surveyId,
//    {
//      title: req.body.title
//    },
//    function (err, survey) {
//      if (err)
//        MessageSender.sendDatabaseError(res, err);
//      else
//        MessageSender.sendJsonObject(res, survey, Message.SURVEY_UPDATED.en);
//    });
//}
//
//function deleteSurvey(req, res) {
//  Survey.findByIdAndRemove(req.params.surveyId, function (err, survey) {
//    if (err)
//      MessageSender.sendDatabaseError(res, err);
//    else
//      MessageSender.sendJsonObject(res, survey, Message.SURVEY_REMOVED.en);
//  });
//}
//
//function getQuestionById(req, res) {
//  Survey.findById(req.params.surveyId, function (err, survey) {
//    if (err)
//      MessageSender.sendDatabaseError(res, err);
//    else {
//      var question = survey.questions.id(req.params.questionId);
//      MessageSender.sendJsonObject(res, question);
//    }
//  });
//}
//
//function updateQuestion(req, res) {
//
//}
//
//function deleteQuestion(req, res) {
//
//}