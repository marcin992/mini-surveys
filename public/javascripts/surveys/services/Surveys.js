/**
 * Created by Marcin on 2014-09-27.
 */

var surveys = angular.module('surveys');

surveys.factory('Surveys', [
  '$http',
  function ($http) {
    return {
      /**
       * Gets survey list of authenticated user.
       * @param {Function} callback
       */
      list: function (callback) {
        $http({
          method: 'GET',
          url: '/api/surveys?query=metadata',
          cache: true
        }).success(callback);
      },

      /**
       * Gets survey by surveyId
       * @param {String} surveyId
       * @param {Function} callback
       */
      getSurveyById: function (surveyId, callback) {
        $http({
          method: 'GET',
          url: '/api/surveys/' + surveyId,
          cache: true
        }).success(callback);
      },

      addSurvey: function(title, description, callback) {
        $http({
          method: 'POST',
          url: '/api/surveys',
          data: {
            title: title,
            description: description
          }
        }).success(callback);
      }
    }
  }
]);