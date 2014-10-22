/**
 * Created by Marcin on 2014-09-27.
 */

var surveys = angular.module('surveys');

surveys.controller('DashboardController', [
  '$scope',
  'Surveys',
  function($scope, Surveys) {
    _.extend($scope, {
      surveys: [],
      selectedSurvey: -1,
      hoveredSurvey: -1,

      /**
       *
       */
      deleteSurvey: function() {
        Surveys.deleteSurvey($scope.surveys[$scope.selectedSurvey]._id, function(survey) {
          _.remove($scope.surveys, function(survey) {
            return survey._id === $scope.surveys[$scope.selectedSurvey]._id;
          });

          $scope.selectedSurvey = -1;
        })
      },

      /**
       *
       * @param {Number} index
       */
      selectSurvey: function(index) {
        $scope.selectedSurvey = ($scope.selectedSurvey === index) ? -1 : index;
      }
    });

    Surveys.list(function(result) {
      $scope.surveys = result.data;
    });


  }
]);