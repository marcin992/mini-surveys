/**
 * Created by Marcin on 2014-09-04.
 */

var surveyDirectives = angular.module('surveyDirectives', []);

surveyDirectives.directive('questionDetails', function() {
  return {
    restrict: 'E',
    scope: {
      'question': '='
    },
    templateUrl: '/partials/directiveTemplates/questionDetails'
  }
});