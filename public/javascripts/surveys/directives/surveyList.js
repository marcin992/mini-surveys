/**
 * Created by Marcin on 2014-09-27.
 */

var surveys = angular.module('surveys');

surveys.directive('surveyList', function() {
  return {
    restrict: 'E',
    scope: false,
    template: '<table class="table table-hover table-bordered">' +
                '<tr survey-row survey="survey" select-survey="selectSurvey(survey)" ng-repeat="survey in surveys | filter:filter">' +
                  '<td width="80%">' +
                    '<a ng-href="#/{{survey._id}}">{{survey.metadata.title}}</a>' +
                  '</td>' +
                  '<td width="20%">' +
                    '<label class="glyphicon glyphicon-arrow-left pull-right"></label>' +
                  '</td>' +
                '</tr>' +
              '</table>'
  };
});