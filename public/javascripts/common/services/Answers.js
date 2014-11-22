var common = angular.module('common');

common.factory('Answers', [
  '$http',
  function ($http) {
    return {
      saveAnswers: function(answers) {
        return $http({
          method: 'POST',
          url: '/api/answers',
          data: {
            answers: answers
          }
        });
      },

      getAnswers: function(surveyId) {
        return $http({
          method: 'GET',
          url: '/api/answers/' + surveyId
        });
      },

      deleteAnswers: function(surveyId, questionNumber) {
        return $http({
          method: 'POST',
          url: '/api/answers/' + surveyId,
          data: {
            questionNumber: questionNumber
          }
        });
      }
    };
  }
]);
