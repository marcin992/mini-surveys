/**
 * Created by Marcin on 2014-09-27.
 */

var surveys = angular.module('surveys');

surveys.controller('DashboardController', [
  '$scope',
  'Surveys',
  function($scope, Surveys) {
    $scope.surveys = [{
      isSelected: false
    }];

    $scope.contextMenu = [{
      "text": "Add new survey...",
      "function": $scope.addSurvey,
      "href": "#/newSurvey"
    }];

    $scope.addSurvey = function() {
      console.log('dashboard');
    };


    Surveys.list(function(surveys) {
      $scope.surveys = _.map(surveys.data, function(survey) {
        return _.extend(survey, {
          isSelected: false
        });
      });


    });

    $scope.dispatchMenuAction = function(index) {
      var fn = $scope.contextMenu[index];
      if(fn.function) {
        fn.function();
      }
    };

    $scope.hoverSurvey = function(survey) {
      $scope.hoveredSurvey = survey;
    };

    $scope.selectSurvey = function(survey) {
      var currentStatus = survey.isSelected;
      _.forEach($scope.surveys, function(survey) {
        survey.isSelected = false;
      });
      $scope.selectedSurvey = !currentStatus ? survey : null;
      survey.isSelected = !currentStatus;



    };

    $scope.selectedSurvey = null;


    $scope.deleteSurvey = function() {
      Surveys.deleteSurvey($scope.selectedSurvey._id, function(result) {
        _.remove($scope.surveys, function(survey) {
          return survey._id === $scope.selectedSurvey._id;
        });
      });
    };

  }
]);