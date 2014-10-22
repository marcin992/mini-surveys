/**
 * Created by Marcin on 2014-09-27.
 */

var surveys = angular.module('surveys');

surveys.directive('surveyList', function() {
  return {
    restrict: 'E',
    scope: false,
    template: '<table class="table table-hover">' +
                '<tr class="selectable-row" ng-class="{active:selectedSurvey == $index}" ng-click="selectSurvey($index)" ng-mouseover="hoveredSurvey = $index" ng-mouseleave="hoveredSurvey = -1" ng-repeat="survey in surveys | filter:filter">' +
                  '<td width="80%">' +
                    '<a ng-href="#/{{survey._id}}">{{survey.metadata.title}}</a>' +
                  '</td>' +
                  '<td width="20%">' +
                    '<label ng-show="$index == hoveredSurvey || $index == selectedSurvey" class="glyphicon glyphicon-remove pull-right"></label>' +
                  '</td>' +
                '</tr>' +
              '</table>'
  };
});