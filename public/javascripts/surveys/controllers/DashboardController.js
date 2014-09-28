/**
 * Created by Marcin on 2014-09-27.
 */

var surveys = angular.module('surveys');

surveys.controller('DashboardController', [
  '$scope',
  'Surveys',
  function($scope, Surveys) {
    $scope.surveys = [];

    Surveys.list(function(surveys) {
      $scope.surveys = surveys.data;
    });

    $scope.dispatchMenuAction = function(index) {
      var fn = $scope.contextMenu[index];
      if(fn.function) {
        fn.function();
      }
    };

    $scope.selectSurvey = function(survey) {
      $scope.selectedSurvey = survey;
      $scope.$digest();
    };

    $scope.selectedSurvey = {};

    $scope.addSurvey = function() {
      console.log("add Survey");
    };

    $scope.deleteSurvey = function() {
      console.log('delete survey');
    };

    $scope.contextMenu = [{
      "text": "Add new survey...",
      "function": $scope.addSurvey,
      "href": "#/"
    }, {
      "text": "Delete survey",
      "function": $scope.deleteSurvey,
      "href": "#/"
    }, {
      "text": "Gdsfjsdfkj",
      "href": "#/"
    }];
  }
]);