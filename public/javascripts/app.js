var app = angular.module('surveyApp', [
  'ui.router',
  'surveys',
  'xeditable',
  'ui.sortable'
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
        templateUrl: 'partials/surveyView',
        abstract: true
      })
      .state('surveyDetails.edit', {
        url: '',
        templateUrl: 'partials/editSurvey',
        controller: 'SurveyDetailsController'
      })
      .state('surveyDetails.editQuestions', {
        url: '/questions',
        templateUrl: 'partials/editQuestions',
        controller: 'SurveyDetailsController'
      });
  }]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});