/**
 * Created by Marcin on 2014-09-27.
 */

var surveys = angular.module('surveys');

surveys.directive('surveyList', function() {
  return {
    restrict: 'E',
    scope: false,
    template: '<table class="table table-hover table-bordered">' +
                '<tr ng-class="{success:selectedSurvey == $index}" ng-mouseover="hoverSurvey($index)" ng-mouseleave="hoverSurvey(-1)" ng-repeat="survey in surveys | filter:filter">' +
                  '<td ng-click="selectSurvey($index)" class="selectable-row" width="90%">' +
                    '<a ng-href="#/{{survey._id}}">{{survey.metadata.title}}</a>' +
                  '</td>' +
                  '<td width="10%">' +
                    '<a ng-click="selectSurvey($index, true)" href="#" data-toggle="modal" data-target="#confirmationModal" ng-show="$index == hoveredSurvey || $index == selectedSurvey">' +
                      '<span class="glyphicon glyphicon-remove pull-right"></label>' +
                    '</a>' +
                  '</td>' +
                '</tr>' +
              '</table>'
  };
});