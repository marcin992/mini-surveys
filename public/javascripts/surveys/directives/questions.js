var app = angular.module('surveys');

app.directive('questions', function() {
  return {
    restrict: 'E',
    scope: {
      survey: '=',
      updateSurvey: '&'
    },
    controller: function($scope) {
      _.extend($scope, {
        selectedQuestion: -1,
        hoveredQuestion: -1,
        hoveredAnswer: -1,
        types: ['oneChoice', 'multiChoice', 'text'],
        sortableOptions: {
          start: function(e, ui) {
            ui.placeholder.height(50);
            $scope.selectedQuestion = -1;
          },
          update: function(e, ui) {
            $scope.updateSurvey();
          },
          axis: 'y',
          cursor: 'move',
          delay: 200,
          opacity: 0.7,
          scroll: true
        },

        addQuestion: function() {
          $scope.survey.questions.push({
            body: "New question",
            type: 'oneChoice',
            possibleAnswers: []
          });

          $scope.updateSurvey();
        },

        selectQuestion: function(index) {
          $scope.selectedQuestion = index;
        },

        hoverQuestion: function(index) {
          $scope.hoveredSurvey = index;
        },

        hoverAnswer: function(index) {
          $scope.hoveredAnswer = index;
        },

        deleteQuestion: function() {
          $scope.survey.questions.splice($scope.selectedQuestion, 1);
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