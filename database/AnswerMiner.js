var Q = require('q');
var _ = require('lodash-node');

var AnswerMiner = function(answerProvider) {
  this.answerProvider = answerProvider;
};

AnswerMiner.prototype = {
  answerProvider: null,

  countAnswers: function(surveyId) {
    var deferred = Q.defer();

    return this.answerProvider.countAnswers(surveyId)
      .then(function(data) {
        var grouped = _.groupBy(data, function(element) {
          return element._id.questionNumber;
        });

        return _.mapValues(grouped, function(element) {
          return {
            labels: _.map(element, function(answer) {
              return answer._id.respond;
            }),
            values: _.map(element, function(answer) {
              return answer.count;
            })
          }
        });



        //var data = {};
        //_.each(result, function(answerSet) {
        //  _.each(answerSet.answers, function(answer, questionNumber) {
        //    data[questionNumber] = data[questionNumber] || {};
        //    data[questionNumber][answer] = data[questionNumber][answer]+1 || 1;
        //  });
        //});
        //var result = _.mapValues(data, function(res) {
        //  return {
        //    labels: _.keys(res),
        //    values: _.values(res)
        //  };
        //});
        //return result;
      })
  }
};

module.exports = AnswerMiner;
