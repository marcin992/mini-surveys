var MessageSender = require('../utils/MessageSender');
var Message = require('../utils/Messages');
var _ = require('lodash-node');

module.exports = function (answerProvider, answerMiner) {
  return {
    surveyView: function (req, res) {
      var surveyCode = req.params.surveyCode;

      res.render('respondentPage', {
        surveyCode: surveyCode
      });
    },

    saveAnswer: function (req, res) {
      var answers = req.body.answers;

      _.each(req.body.answers, function (answer, index) {
        if (_.isArray(answer.respond)) {
          answers.splice(index, 1);
          _.each(answer.respond, function(respond) {
            answers.push({
              surveyId: answer.surveyId,
              questionNumber: answer.questionNumber,
              respond: respond
            });
          });
        }
      });

      answerProvider.saveAnswers(answers)
        .then(function (result) {
          MessageSender.sendJsonObject(res, result);
        }, function (err) {
          MessageSender.sendDatabaseError(res, err);
        })
    },

    getAnswers: function (req, res) {
      answerMiner.countAnswers(req.params.surveyId)
        .then(function (result) {
          MessageSender.sendJsonObject(res, result);
        }, function (err) {
          MessageSender.sendDatabaseError(res, err);
        });
      //answerProvider.getAnswers(req.params.surveyId)
      //  .then(function(result) {
      //    MessageSender.sendJsonObject(res, result);
      //  }, function(err) {
      //    MessageSender.sendDatabaseError(res, err);
      //  });
    },

    deleteAnswers: function (req, res) {
      answerProvider.deleteAnswers(req.params.surveyId, req.body.questionNumber)
        .then(function () {
          MessageSender.sendMessage(res, "Answers deleted");
        }, function (err) {
          MessageSender.sendError(res, err);
        });
    }
  };

};