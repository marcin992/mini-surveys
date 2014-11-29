var answers = angular.module('answers');

answers.controller('RespondController', [
  '$scope',
  'Surveys',
  'Answers',
  '$timeout',
  '$localStorage',
  function ($scope, Surveys, Answers, $timeout, $localStorage) {
    _.extend($scope, {
      survey: {},
      surveyCode: '',
      answers: [],
      answeredAll: true,
      $storage: $localStorage.$default({
        responded: false
      }),

      getSurvey: function () {
        $timeout(function () {
          Surveys.getSurveyByCode($scope.surveyCode)
            .then(function (result) {
              $scope.survey = result;
              $scope.answers = _.map($scope.survey.questions, function (question, index) {
                var object = {
                  surveyId: $scope.survey._id,
                  questionNumber: index
                };

                if(question.type === 'multiChoice') {
                  object.respond = [];
                } else {
                  object.respond = '';
                }
                return object;
              });
            });
        }, 0);

      },

      saveAnswers: function () {
        if($scope.checkIfAllAnswered()) {
          Answers.saveAnswers($scope.answers)
            .then(function (result) {
              $scope.$storage[$scope.surveyCode] = {
                responded: true
              }
            });
        }

      },

      checkIfAllAnswered: function() {
        $scope.answeredAll = true;
        for(var i = 0; i < $scope.answers.length; i++) {
          var answer = $scope.answers[i];
          if(_.isArray(answer.respond)) {
            if(answer.respond.length === 0) {
              $scope.answeredAll = false;
              break;
            }
          } else {
            if(answer.respond === '') {
              $scope.answeredAll = false;
              break;
            }
          }
        }

        return $scope.answeredAll;
      },

      toggleSelection: function(questionNumber, answer) {
        var index = $scope.answers[questionNumber].respond.indexOf(answer);

        if(index > -1) {
          $scope.answers[questionNumber].respond.splice(index, 1);
        } else {
          $scope.answers[questionNumber].respond.push(answer);
        }
      },

      dd: function (q) {
        console.log(q);
      }
    });

    $scope.getSurvey();
  }
]);
