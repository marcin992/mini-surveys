/**
 * Created by Marcin on 2014-09-27.
 */

var surveys = angular.module('surveys');

surveys.controller('SurveyDetailsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Surveys',
  'Answers',
  function($scope, $stateParams, $location, Surveys, Answers) {
    _.extend($scope, {
      selectedQuestion: -1,
      survey: {},
      address: '',
      answers: [],
      chartData: [],

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
      },

      getAnswers: function() {
        Answers.getAnswers($scope.survey._id)
          .then(function(result) {
            $scope.answers = $scope._prepareChartData(result.data.data);
          });
      },

      _prepareChartData: function(answers) {
        return _.map(answers, function(answer) {
          return {
            "labels": answer.labels,
            "datasets": [{
              fillColor : "rgba(25,52,65,0.6)",
              strokeColor : "#3E606F",
              pointColor : "rgba(151,187,205,0)",
              pointStrokeColor : "#e67e22",
              data: answer.values
            }]
          };
        });
      }
    });

    Surveys.getSurveyById($stateParams.surveyId, function(survey) {
      $scope.survey = survey.data;
      $scope.address = $location.absUrl().replace(/(https?:\/\/.*?\/)(.*)/, '$1' + 'survey/' + $scope.survey.metadata.surveyCode);
    });


  }
]);