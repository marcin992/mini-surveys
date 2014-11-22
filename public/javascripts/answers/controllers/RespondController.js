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
      answers: [],

      getSurvey: function() {
        $timeout(function() {
          Surveys.getSurveyByCode($scope.surveyCode)
            .then(function(result) {
              $scope.survey = result;
              $scope.answers = _.map($scope.survey.questions, function(q, index) {
                return {
                  surveyId: $scope.survey._id,
                  questionNumber: index,
                  respond: ''
                }
              });
              console.log($scope.answers);
            });
        }, 0);

      },

      saveAnswers: function() {
        Answers.saveAnswers($scope.answers)
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
