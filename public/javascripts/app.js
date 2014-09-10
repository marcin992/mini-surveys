/**
 * Created by Marcin on 2014-08-25.
 */

var app = angular.module('surveyApp', [
  'ngRoute',
  'surveyControllers',
  'surveyServices',
  'surveyDirectives'
]);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'SurveyListController',
      templateUrl: 'partials/profile'
    })
    .when('/dashboard', {
      controller: 'SurveyListController',
      templateUrl: 'partials/dashboard'
    })
    .when('/:surveyId', {
      controller: 'SurveyDetailsController',
      templateUrl: 'partials/details'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);