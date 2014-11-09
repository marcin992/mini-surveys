var app = angular.module('surveys');

app.directive('questions', function() {
  return {
    restrict: 'E',
    scope: {
      sortableOptions: '=',
      survey: '=',
      updateSurvey: '&'
    },
    controller: function($scope) {
      _.extend($scope, {
        selectedQuestion: -1,
        hoveredQuestion: -1,
        types: ['oneChoice', 'multiChoice', 'text'],

        selectQuestion: function(index) {
          $scope.selectedQuestion = index;
        },

        hoverQuestion: function(index) {
          $scope.hoveredSurvey = index;
        },

        deleteQuestion: function(index) {
          $scope.survey.questions.splice(index, 1);
          $scope.updateSurvey();
        },

        addAnswer: function(questionIndex) {
          var possibleAnswers = $scope.survey.questions[questionIndex].possibleAnswers;
          possibleAnswers.push('Answer ' + possibleAnswers.length);

          $scope.updateSurvey();
        },

        deleteAnswer: function(questionIndex, answerIndex) {
          var possibleAnswers = $scope.survey.questions[questionIndex].possibleAnswers;
          possibleAnswers.splice(answerIndex, 1);

          $scope.updateSurvey();
        }
      });
    },
    templateUrl: 'partials/directives/questions'
  }
});