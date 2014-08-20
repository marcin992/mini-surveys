/**
 * Created by Marcin on 2014-08-16.
 */

var assert = require('assert');
var SurveyValidator = require('../../utils/SurveyValidator');
var Message = require('../../utils/Messages');

describe('Validation tests', function() {
  describe('Key validation', function() {
    it('Should return message that survey object is incomplete', function() {
      var incompleteSurvey = {
        title: "Dummy title",
        questionCount: 123
      };

      var message = SurveyValidator._validateIfAllKeysArePresent(incompleteSurvey);
      assert.equal(message, Message.VALIDATION_KEYS.en);
    });

    it('Should return no message if the survey is complete', function() {
      var completeSurvey = {
        title: "Dummy title",
        questionCount: 123,
        questions: []
      };

      var message = SurveyValidator._validateIfAllKeysArePresent(completeSurvey);
      assert.equal(message, 0);
    });
  });

  describe('Title validation', function() {
    it('Should return message that title is inappropriate.', function() {
      var TITLE_LENGTH = 51;
      var dummyTitle = '';
      for(var i = 0; i < TITLE_LENGTH; i++) {
        dummyTitle += 'a';
      }

      var message = SurveyValidator._validateTitleLength(dummyTitle);
      assert.equal(message, Message.VALIDATION_SURVEY_TITLE.en);
    });
  });


});