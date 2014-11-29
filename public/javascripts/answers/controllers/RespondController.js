var answers = angular.module('answers');

answers.controller('RespondController', [
  '$scope',
  'Surveys',
  'Answers',
  '$timeout',
  '$localStorage',
  function ($scope, Surveys, Answers, $timeout, $localStorage) {
    _.extend($scope, {
      survey: {},
      surveyCode: '',
      answers: [],
      $storage: $localStorage.$default({
        responded: false
      }),

      getSurvey: function () {
        $timeout(function () {
          Surveys.getSurveyByCode($scope.surveyCode)
            .then(function (result) {
              $scope.survey = result;
              $scope.answers = _.map($scope.survey.questions, function (q, index) {
                return {
                  surveyId: $scope.survey._id,
                  questionNumber: index,
                  respond: ''
                }
              });
            });
        }, 0);

      },

      saveAnswers: function () {
        Answers.saveAnswers($scope.answers)
          .then(function (result) {
            $scope.$storage[$scope.surveyCode] = {
              responded: true
            }
          });
      },

      dd: function (q) {
        console.log(q);
      }
    });

    $scope.getSurvey();
  }
]);
