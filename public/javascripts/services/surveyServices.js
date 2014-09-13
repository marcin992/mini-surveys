/**
 * Created by Marcin on 2014-08-30.
 */

var surveyServices = angular.module('surveyServices', []);

surveyServices.factory('Surveys', ['$http', function($http) {
  return {
    list: function(callback) {
      $http({
        method: 'GET',
        url: '/api/surveys?query=metadata.title metadata.answerCount',
        cache: true
      }).success(callback);
    },

    getSurveyById: function(surveyId, callback) {
      $http({
        method: 'GET',
        url: '/api/surveys/' + surveyId,
        cache: true
      }).success(callback);
    }
  }
}]);