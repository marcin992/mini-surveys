/**
 * Created by Marcin on 2014-09-27.
 */

var surveys = angular.module('surveys');

surveys.controller('SurveyDetailsController', [
  '$scope',
  '$stateParams',
  'Surveys',
  function($scope, $stateParams, Surveys) {
    _.extend($scope, {
      survey: {}
    });

    Surveys.getSurveyById($stateParams.surveyId, function(survey) {
      $scope.survey = survey.data;
    });
  }
]);