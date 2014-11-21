var Q = require('q');
var _ = require('lodash-node');

var AnswerMiner = function(answerProvider) {
  this.answerProvider = answerProvider;
};

AnswerMiner.prototype = {
  answerProvider: null,

  countAnswers: function(surveyId) {
    var deferred = Q.defer();

    return this.answerProvider.getAnswers(surveyId)
      .then(function(result) {
        var data = {};
        _.each(result, function(answerSet) {
          _.each(answerSet.answers, function(answer, questionNumber) {
            data[questionNumber] = data[questionNumber] || {};
            data[questionNumber][answer] = data[questionNumber][answer]+1 || 1;
          });
        });
        console.log(result[0].answers);
        return data;
      })
  }
};

module.exports = AnswerMiner;
