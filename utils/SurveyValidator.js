/**
 * Created by Marcin on 2014-08-16.
 */

var Message = require('./Messages');
var _ = require('underscore');

module.exports = {
  validate: function(survey) {
    var messages = [];
    this._appendIf(messages,
      this._validateIfAllKeysArePresent(survey));
    this._appendIf(messages,
      this._validateTitleLength(survey.title));
    this._appendIf(messages,
      this._validateQuestionCount(survey));
  },

  _appendIf: function(array, message) {
    if(message !== 0)
      array.push(message);
  },

  _validateIfAllKeysArePresent: function(survey) {
    var surveyKeys = [
      'title', 'questionCount', 'questions'
    ];

    var result = true;

    _.each(surveyKeys, function(element) {
      result = _.has(survey, element);
    });

    return (!result) ? Message.VALIDATION_KEYS.en
      : 0;
  },

  _validateTitleLength: function(title) {
    var result = (title.length < 3 || title.length > 50)
      ? Message.VALIDATION_SURVEY_TITLE.en
      : 0;

    return result;
  },

  _validateQuestionCount: function(survey) {
    return (survey.questionCount !== survey.questions.length)
      ? Message.VALIDATION_QUESTION_COUNT.en
      : 0;
  }
};