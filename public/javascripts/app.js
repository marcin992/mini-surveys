var app = angular.module('surveyApp', [
  'ui.router',
  'surveys',
  'xeditable'
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
      .state('newSurvey', {
        url: '/newSurvey',
        templateUrl: 'partials/addSurvey',
        controller: 'NewSurveyController'
      })
      .state('surveyDetails', {
        url: '/:surveyId',
        templateUrl: 'partials/details',
        controller: 'SurveyDetailsController'
      });
  }]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});