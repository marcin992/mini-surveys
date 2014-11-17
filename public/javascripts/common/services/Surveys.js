/**
 * Created by Marcin on 2014-09-27.
 */

var common = angular.module('common');

common.factory('Surveys', [
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
          cache: false
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
          url: '/api/surveys/' + surveyId
        }).success(callback);
      },

      /**
       *
       * @param {String} surveyCode
       * @returns {*}
       */
      getSurveyByCode: function(surveyCode) {
        return $http({
          method: 'GET',
          url: '/api/code/' + surveyCode,
          cache: true
        }).then(function(result) {
          return result.data.data;
        });
      },

      /**
       *
       * @param {String} title
       * @param {String} description
       * @param {Function} callback
       */
      addSurvey: function(title, description, callback) {
        $http({
          method: 'POST',
          url: '/api/surveys',
          data: {
            title: title,
            description: description
          }
        }).success(callback);
      },

      /**
       *
       * @param surveyId
       * @param callback
       */
      deleteSurvey: function(surveyId, callback) {
        $http({
          method: 'DELETE',
          url: '/api/surveys/' + surveyId
        }).success(callback);
      },

      /**
       *
       * @param {String} surveyId
       * @param {Object} updatingSurvey
       * @returns {Promise}
       */
      updateSurvey: function(surveyId, updatingSurvey) {
        return $http({
          method: 'PUT',
          url: '/api/surveys/' + surveyId,
          data: {
            survey: updatingSurvey
          }
        });
      }
    }
  }
]);