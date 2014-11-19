var answers = angular.module('answers');

answers.controller('RespondController', [
  '$scope',
  'Surveys',
  'Answers',
  '$timeout',
  function($scope, Surveys, Answers, $timeout) {
    _.extend($scope, {
      survey: {},
      surveyCode: '',
      answers: {},

      getSurvey: function() {
        $timeout(function() {
          Surveys.getSurveyByCode($scope.surveyCode)
            .then(function(result) {
              $scope.survey = result;
              console.log(result);
            });
        }, 0);

      },

      saveAnswers: function() {
        Answers.saveAnswers($scope.survey._id, $scope.answers)
          .then(function(result) {
            console.log(result);
          })
      },

      dd: function(q) {
        console.log(q);
      }
    });

    $scope.getSurvey();
  }
]);
