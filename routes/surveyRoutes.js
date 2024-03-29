/**
 * Created by Marcin on 2014-08-30.
 */

var MessageSender = require('../utils/MessageSender');
var Message = require('../utils/Messages');

module.exports = function(surveyProvider, answerProvider) {
  return {
    getSurveys: function(req, res) {
      surveyProvider.getSurveys({
        'metadata.userId': req.session.passport.user
      }, req.query.query, function(err, surveys) {
        if (err) {
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
        if (err) {
          MessageSender.sendDatabaseError(res, err);
        } else if (!survey) {
          MessageSender.sendMessage(res, Message.NO_SURVEY.en);
        } else {
          MessageSender.sendJsonObject(res, survey);
        }
      });
    },

    addSurvey: function(req, res) {
      var survey = {
        "metadata": {
          "userId": req.session.passport.user,
          "title": req.body.title,
          "description": req.body.description,
          "status": "draft",
          "answerCount": 0,
          "surveyCode": ""
        },
        "questions": []
      };

      surveyProvider.addSurvey(survey)
        .then(function(survey) {
          MessageSender.sendJsonObject(res, survey);
        }, function(err) {
          MessageSender.sendDatabaseError(res, err);
        });

      //surveyProvider.addSurvey(survey, function(err, survey) {
      //  if(err) {
      //    MessageSender.sendDatabaseError(res, err);
      //  } else {
      //    MessageSender.sendJsonObject(res, survey);
      //  }
      //});
    },

    deleteSurvey: function(req, res) {
      surveyProvider.deleteSurvey(req.params.surveyId, function(err, survey) {
        if(err) {
          MessageSender.sendDatabaseError(res, err);
        } else {
          answerProvider.deleteAnswers(req.params.surveyId)
            .then(function() {
              MessageSender.sendJsonObject(res, survey);
            }, function(err) {
              MessageSender.sendError(res, err);
            });
        }
      });
    },

    activateSurvey: function(req, res) {
      surveyProvider.activateSurvey(req.params.surveyId)
        .then(function(survey) {
          MessageSender.sendJsonObject(res, survey);
        }, function(err) {
          MessageSender.sendError(res, err);
        });
    },

    updateSurvey: function(req, res) {
      surveyProvider.updateSurvey(req.params.surveyId, req.body.survey)
        .then(function(survey) {
          MessageSender.sendJsonObject(res, survey);
        }, function(err) {
          MessageSender.sendDatabaseError(res, err);
        });
    },

    getSurveyByCode: function(req, res) {
      surveyProvider.getSurvey({
        "metadata.surveyCode": req.params.surveyCode
      }).then(function(result) {
        MessageSender.sendJsonObject(res, result);
      });
    }
  };
};
