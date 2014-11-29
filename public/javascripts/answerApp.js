var app = angular.module('surveyApp', [
  'ui.router',
  'common',
  'answers',
  'xeditable',
  'ui.sortable',
  'ngStorage'
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('respond', {
        url: '/',
        templateUrl: '/partials/respond',
        controller: 'RespondController'
      })
      .state('responded', {
        url: '/done',
        templateUrl: '/partials/responded',
        controller: 'RespondController'
      });
  }]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});