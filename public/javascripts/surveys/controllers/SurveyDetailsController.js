/**
 * Created by Marcin on 2014-09-27.
 */

var surveys = angular.module('surveys');

surveys.controller('SurveyDetailsController', [
  '$scope',
  '$stateParams',
  'Surveys',
  function($scope, $stateParams, Surveys) {
    _.extend($scope, {
      selectedQuestion: -1,
      sortableOptions: {
        start: function(e, ui) {
          ui.placeholder.height(50);
          $scope.selectedQuestion = -1;
        },
        axis: 'y',
        cursor: 'move',
        delay: 200,
        opacity: 0.7,
        scroll: true
      },
      survey: {},

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
          body: "New question"
        });
      }
    });

    Surveys.getSurveyById($stateParams.surveyId, function(survey) {
      $scope.survey = survey.data;
    });
  }
]);