var surveys = angular.module('surveys');

surveys.directive('surveyDetails', function() {
  return {
    restrict: 'E',
    scope: {
      'survey': '=',
      'updateSurvey': '&'
    },
    template: '<dl class="dl-horizontal">' +
                '<dt><h4>Title:</h4></dt>' +
                '<dd>' +
                  '<a href="#" editable-text="survey.metadata.title"><h4>{{survey.metadata.title || ""}}</h4></a>' +
                '</dd>' +
                '<dt><h4>Description:</h4></dt>' +
                '<dd>' +
                  '<a href="#" editable-textarea="survey.metadata.description"><h4><span class="line-breakable">{{survey.metadata.description || ""}}</span></h4></a>' +
                '</dd>' +
              '</dl>'
  };
});
