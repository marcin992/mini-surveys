var surveys = angular.module('surveys');

surveys.directive('surveyDetails', function() {
  return {
    restrict: 'E',
    scope: {
      'survey': '=',
      'updateSurvey': '&'
    },
    templateUrl: 'partials/directives/surveyDetails'
  };
});
