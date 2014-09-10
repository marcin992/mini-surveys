/**
 * Created by Marcin on 2014-08-30.
 */

var MessageSender = require('../utils/MessageSender');
var Message = require('../utils/Messages');

module.exports = function(surveyProvider) {
  return {
    getSurveys: function(req, res) {
      surveyProvider.getSurveys({
        userId: req.session.passport.user
      }, req.query.query, function(err, surveys) {
        if(err) {
          MessageSender.sendDatabaseError(res, err);
        } else if (surveys.length === 0) {
          MessageSender.sendMessage(res, Message.NO_SURVEY.en);
        } else {
          MessageSender.sendJsonObject(res, surveys);
        }
      });
    },

    getSurveyById: function(req, res) {
      surveyProvider.getSurveyById(req.params.surveyId, function(err, survey) {
        if(err) {
          MessageSender.sendDatabaseError(res, err);
        } else if (!survey) {
          MessageSender.sendMessage(res, Message.NO_SURVEY.en);
        } else {
          MessageSender.sendJsonObject(res, survey);
        }
      })
    }
  }
}