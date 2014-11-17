/**
 * Created by Marcin on 2014-09-27.
 */

var surveys = angular.module('surveys');

surveys.controller('SurveyDetailsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Surveys',
  function($scope, $stateParams, $location, Surveys) {
    _.extend($scope, {
      selectedQuestion: -1,
      survey: {},
      address: '',

      updateSurvey: function(data) {
        Surveys.updateSurvey($scope.survey._id, $scope.survey)
          .then(function(survey) {
            console.log(survey);
          });
      },

      selectQuestion: function(index) {
        $scope.selectedQuestion = index;
      },

      addQuestion: function() {
        $scope.survey.questions.push({
          body: "New question",
          type: 'oneChoice',
          possibleAnswers: []
        });
      }
    });

    Surveys.getSurveyById($stateParams.surveyId, function(survey) {
      $scope.survey = survey.data;
      $scope.address = $location.absUrl().replace(/(https?:\/\/.*?\/)(.*)/, '$1' + 'survey/' + $scope.survey.metadata.surveyCode);
    });


  }
]);