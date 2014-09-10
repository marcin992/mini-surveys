/**
 * Created by Marcin on 2014-08-25.
 */

var surveyControllers = angular.module('surveyControllers', []);

surveyControllers.controller('SurveyListController', ['$scope', 'Surveys', function($scope, Surveys) {
  Surveys.list(function(surveys) {
    $scope.surveys = surveys.data;
  });
}]);

surveyControllers.controller('SurveyDetailsController', [
  '$scope',
  '$routeParams',
  'Surveys',
  function($scope, $routeParams, Surveys) {
    console.log($routeParams.toString());
    Surveys.getSurveyById($routeParams.surveyId, function(result) {
      $scope.survey = result.data;
    })
  }]);