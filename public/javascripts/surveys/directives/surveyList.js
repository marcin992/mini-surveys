/**
 * Created by Marcin on 2014-09-27.
 */

var surveys = angular.module('surveys');

surveys.directive('surveyList', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: 'partials/directives/surveyList'
  };
});