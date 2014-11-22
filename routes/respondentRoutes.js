var MessageSender = require('../utils/MessageSender');
var Message = require('../utils/Messages');

module.exports = function(answerProvider, answerMiner) {
  return {
    surveyView: function(req, res) {
      var surveyCode = req.params.surveyCode;

      res.render('respondentPage', {
        surveyCode: surveyCode
      });
    },

    saveAnswer: function(req, res) {
      var answers = req.body.answers;

      answerProvider.saveAnswers(answers)
        .then(function(result) {
          MessageSender.sendJsonObject(res, result);
        }, function(err) {
          MessageSender.sendDatabaseError(res, err);
        })
    },

    getAnswers: function(req, res) {
      answerMiner.countAnswers(req.params.surveyId)
        .then(function(result) {
          MessageSender.sendJsonObject(res, result);
        }, function(err) {
          MessageSender.sendDatabaseError(res, err);
        });
      //answerProvider.getAnswers(req.params.surveyId)
      //  .then(function(result) {
      //    MessageSender.sendJsonObject(res, result);
      //  }, function(err) {
      //    MessageSender.sendDatabaseError(res, err);
      //  });
    },

    deleteAnswers: function(req, res) {
      answerProvider.deleteAnswers(req.params.surveyId, req.body.questionNumber)
        .then(function() {
          MessageSender.sendMessage(res, "Answers deleted");
        }, function(err) {
          MessageSender.sendError(res, err);
        });
    }
  };

};