/**
 * Created by Marcin on 2014-08-10.
 */

var express = require('express');
var router = express.Router();

var Survey = require('../models/Survey');
var Message = require('../utils/Messages');
var MessageSender = require('../utils/MessageSender');

module.exports = {
  registerRoutes: function (app) {
    router.route('/')
      .post(addSurvey);

    router.route('/:surveyId')
      .get(getSurveyById)
      .put(updateSurvey)
      .delete(deleteSurvey);

    router.route('/:surveyId/questions')
      .post(addQuestion);

    router.route('/:surveyId/questions/:questionId')
      .get(getQuestionById)
      .put(updateQuestion)
      .delete(deleteQuestion);

    app.use('/api/surveys', router);
  }
};

function addSurvey(req, res) {
  new Survey({
    title: req.body.title,
    questionCount: 0,
    questions: []
  }).save(function (err, survey) {
      if (err)
        MessageSender.sendDatabaseError(res, err);
      else {
        MessageSender.sendJsonObject(res, survey, Message.SURVEY_ADDED.en);
      }
    });
}

function addQuestion(req, res) {
  Survey.findById(req.params.surveyId, function (err, survey) {
    if (err)
      MessageSender.sendDatabaseError(res, err);
    else {
      survey.questions.push({
        number: (survey.questionCount + 1),
        type: req.body.type,
        body: req.body.body,
        possibleAnswers: req.body.possibleAnswers
      });
      survey.questionCount += 1;
      survey.save(function (err, survey) {
        if (err)
          MessageSender.sendDatabaseError(res, err);
        else
          MessageSender.sendJsonObject(res, survey, Message.QUESTION_ADDED.en);
      });
    }
  });
}

function getSurveyById(req, res) {
  Survey.findById(req.params.surveyId, function (err, survey) {
    if (err)
      MessageSender.sendDatabaseError(res, err);
    else {
      if (survey !== null) {
        MessageSender.sendJsonObject(res, survey);
      } else {
        MessageSender.sendMessage(res, Message.NO_SURVEY.en);
      }
    }
  });
}

function updateSurvey(req, res) {
  Survey.findByIdAndUpdate(req.params.surveyId,
    {
      title: req.body.title
    },
    function (err, survey) {
      if (err)
        MessageSender.sendDatabaseError(res, err);
      else
        MessageSender.sendJsonObject(res, survey, Message.SURVEY_UPDATED.en);
    });
}

function deleteSurvey(req, res) {
  Survey.findByIdAndRemove(req.params.surveyId, function (err, survey) {
    if (err)
      MessageSender.sendDatabaseError(res, err);
    else
      MessageSender.sendJsonObject(res, survey, Message.SURVEY_REMOVED.en);
  });
}

function getQuestionById(req, res) {
  Survey.findById(req.params.surveyId, function (err, survey) {
    if (err)
      MessageSender.sendDatabaseError(res, err);
    else {
      var question = survey.questions.id(req.params.questionId);
      MessageSender.sendJsonObject(res, question);
    }
  });
}