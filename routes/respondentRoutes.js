var MessageSender = require('../utils/MessageSender');
var Message = require('../utils/Messages');

module.exports = function(answerProvider) {
  return {
    surveyView: function(req, res) {
      var surveyCode = req.params.surveyCode;

      res.render('respondentPage', {
        surveyCode: surveyCode
      });
    },

    saveAnswer: function(req, res) {
      var surveyId = req.params.surveyId;
      var answers = req.body.answers;

      answerProvider.saveAnswers(surveyId, answers)
        .then(function(result) {
          MessageSender.sendJsonObject(res, result);
        }, function(err) {
          MessageSender.sendDatabaseError(res, err);
        })
    },

    getAnswers: function(req, res) {

    }
  };

};
