/**
 * Created by Marcin on 2014-09-02.
 */

var surveyDirectives = angular.module('surveyDirectives', []);

surveyDirectives.directive('surveyList', function() {
  return {
    restrict: 'E',
    scope: {
      'surveys': '=',
      'filter': '='
    },
    templateUrl: '/partials/directiveTemplates/surveyList'
  }
});

surveyDirectives.directive('questionDetails', function() {
  return {
    restrict: 'E',
    scope: {
      'question': '='
    },
    templateUrl: '/partials/directiveTemplates/questionDetails'
  }
});

surveyDirectives.directive('surveyDetails', function() {
  return {
    restrict: 'E',
    scope: {
      'survey': '='
    },
    templateUrl: '/partials/directiveTemplates/surveyDetails'
  }
});