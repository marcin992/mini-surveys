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
            $scope.getAnswers();
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

      deleteAnswers: function(questionNumber) {
        Answers.deleteAnswers($scope.survey._id, questionNumber)
          .then(function() {
            $scope.getAnswers();
          });
      },

      activateSurvey: function() {
        Surveys.activateSurvey($scope.survey._id)
          .then(function(survey) {
            $scope.survey = survey;
            $scope.address = $location.absUrl().replace(/(https?:\/\/.*?\/)(.*)/, '$1' + 'survey/' + $scope.survey.metadata.surveyCode);
          })
      },

      getAnswers: function() {
        Answers.getAnswers($scope.survey._id)
          .then(function(result) {
            $scope.answers = $scope._prepareChartData(result.data.data);
          });
      },

      _prepareChartData: function(answers) {
        return _.map(answers, function(answer, questionNumber) {
          //Show on chart labels with no answers
          _.each($scope.survey.questions[questionNumber].possibleAnswers,
          function(possibleAnswer) {
            if(!_.contains(answer.labels, possibleAnswer)) {
              answer.labels.push(possibleAnswer);
              answer.values.push(0);
            }
          });
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
      if($scope.survey.metadata.status !== 'draft'){
        $scope.address = $location.absUrl().replace(/(https?:\/\/.*?\/)(.*)/, '$1' + 'survey/' + $scope.survey.metadata.surveyCode);
      }
    });


  }
]);