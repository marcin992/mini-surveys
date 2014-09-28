/**
 * Created by Marcin on 2014-08-25.
 */

var app = angular.module('surveyApp', [
  'ui.router',
  'surveys'
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: 'partials/dashboard',
        controller: 'DashboardController'
      })
      .state('surveyDetails', {
        url: '/:surveyId',
        templateUrl: 'partials/details',
        controller: 'SurveyDetailsController'
      });
  }]);