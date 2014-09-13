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
  };
});

surveyDirectives.directive('questionDetails', function() {
  return {
    restrict: 'E',
    scope: {
      'question': '='
    },
    templateUrl: '/partials/directiveTemplates/questionDetails',

    link: function(scope, element, attrs) {
      element.bind('mouseenter', function() {
        element.children(0).addClass('my-panel-active');
        console.log('enter');
      });
      element.bind('mouseleave', function() {
        element.children(0).removeClass('my-panel-active');
        console.log('leave');
      });
    }
  };
});

surveyDirectives.directive('surveyDetails', function() {
  return {
    restrict: 'E',
    scope: {
      'survey': '='
    },
    templateUrl: '/partials/directiveTemplates/surveyDetails'
  };
});