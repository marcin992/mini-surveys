var common = angular.module('common');

common.factory('Answers', [
  '$http',
  function ($http) {
    return {
      saveAnswers: function(surveyId, answers) {
        return $http({
          method: 'POST',
          url: '/api/answers/' + surveyId,
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
      }
    };
  }
]);
