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
    templateUrl: '/partials/directiveTemplates/questionDetails',

    link: function(scope, element, attrs) {
      element.bind('mouseenter', function() {
        element.children(1).addClass('my-panel-active');
        console.log('enter');
      });
      element.bind('mouseleave', function() {
        element.children(1).removeClass('my-panel-active');
        console.log('leave');
      });
    }
  };
});