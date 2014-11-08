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
        types: ['oneChoice', 'multiChoice', 'text'],
        selectQuestion: function(index) {
          $scope.selectedQuestion = index;
        }
      });
    },
    templateUrl: 'partials/directives/questions'
  }
});