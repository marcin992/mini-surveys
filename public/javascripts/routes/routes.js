/**
 * Created by Marcin on 2014-08-25.
 */

angular.module('surveyApp', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'SurveyController',
        templateUrl: 'partials/dashboard'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);