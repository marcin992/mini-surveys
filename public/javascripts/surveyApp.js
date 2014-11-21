var app = angular.module('surveyApp', [
  'ui.router',
  'common',
  'surveys',
  'xeditable',
  'angles',
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
        abstract: true,
        controller: 'SurveyDetailsController'
      })
      .state('surveyDetails.edit', {
        url: '',
        templateUrl: 'partials/editSurvey'
      })
      .state('surveyDetails.editQuestions', {
        url: '/questions',
        templateUrl: 'partials/editQuestions'
      })
      .state('surveyDetails.sharing', {
        url: '/sharing',
        templateUrl: 'partials/sharing'
      })
      .state('surveyDetails.analysis', {
        url: '/analysis',
        templateUrl: 'partials/analysis'
      });
  }]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});