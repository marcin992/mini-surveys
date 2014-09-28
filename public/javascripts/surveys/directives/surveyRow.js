/**
 * Created by Marcin on 2014-09-27.
 */

var surveys = angular.module('surveys');

surveys.directive('surveyRow', function() {
  return {
    restrict: 'A',
    scope: {
      'survey': '=',
      'selectSurvey': '&'
    },
    link: function(scope, element, attrs) {
      element.on('mouseenter', function(event) {
        //event.preventDefault();
        console.log(scope.survey.metadata.title);
        scope.selectSurvey({survey: scope.survey});
      })
    }
  };
});