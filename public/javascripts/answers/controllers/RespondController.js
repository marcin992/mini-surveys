var answers = angular.module('answers');

answers.controller('RespondController', [
  '$scope',
  'Surveys',
  '$timeout',
  function($scope, Surveys, $timeout) {
    _.extend($scope, {
      survey: {},
      surveyCode: '',

      getSurvey: function() {
        $timeout(function() {
          Surveys.getSurveyByCode($scope.surveyCode)
            .then(function(result) {
              $scope.survey = result;
              console.log(result);
            });
        }, 0);

      }
    });

    $scope.getSurvey();
  }
]);
