/**
 * Created by Marcin on 2014-10-04.
 */

var surveys = angular.module('surveys');

surveys.controller('NewSurveyController', [
  '$scope',
  '$state',
  'Surveys',
  function($scope, $state, Surveys) {
    $scope.title = '';
    $scope.description = '';
    $scope.contextMenu = [{
      "text": "Back",
      "href": "#/"
    }];

    $scope.addSurvey = function() {
      Surveys.addSurvey($scope.title, $scope.description, function(result) {
        console.log(result.data);
        $state.go('surveyDetails', {
          surveyId: result.data._id
        });
      });
    }
  }
]);