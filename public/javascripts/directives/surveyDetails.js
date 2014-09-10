/**
 * Created by Marcin on 2014-09-04.
 */

var surveyDirectives = angular.module('surveyDirectives', []);

surveyDirectives.directive('surveyDetails', function() {
  return {
    restrict: 'E',
    scope: {
      'survey': '='
    },
    templateUrl: '/partials/directiveTemplates/surveyDetails'
  }
});