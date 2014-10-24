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
          var id = $scope.surveys[$scope.selectedSurvey]._id;
          _.remove($scope.surveys, function(survey) {
            return survey._id === id;
          });

          $scope.selectedSurvey = -1;
        })
      },

      /**
       *
       * @param {Number} index
       * @param {Boolean} forceSelect
       */
      selectSurvey: function(index, forceSelect) {
        $scope.selectedSurvey = ($scope.selectedSurvey === index && !forceSelect) ? -1 : index;
      },

      /**
       *
       * @param {Number} index
       */
      hoverSurvey: function(index) {
        $scope.hoveredSurvey = index;
      }
    });

    Surveys.list(function(result) {
      $scope.surveys = result.data;
    });


  }
]);