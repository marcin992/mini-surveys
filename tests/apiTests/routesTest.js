var expect = require('expect.js');
var Application = require('../../Application');
var Message = require('../../utils/Messages');
var request = require('superagent');
var _ = require('lodash-node');
var agent = request.agent();
var MongoSurveyProvider = require('../../database/MongoSurveyProvider');

describe('Routes tests', function() {
  var TEST_PORT = 7000;
  var application;
  var credentials = {
    'email': 'test-user',
    'password': 'test'
  };

  var userId = '541445d6969229b02a5f33cd';
  var MOCK_SURVEYS = [{
    'metadata': {
      'userId': userId,
      'title': 'Mongo bongo',
      'description': 'aaa',
      'status': 'draft',
      'answerCount': 0,
      'link': ''
    },
    'questions': []
  }];

  var removeDbKeys = function(survey) {
  delete(survey['_id']);
  delete(survey['__v']);
  _.forEach(survey.questions, function(question) {
    delete(question['_id']);
  });
};

  var surveyProvider = new MongoSurveyProvider('test');

  before(function(done) {
    process.env['NODE_ENV'] = 'test';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    application = new Application(TEST_PORT);
    application.start(function() {
      console.log('Test server starts on port ' + TEST_PORT);
      agent.post('https://localhost:7000/login')
        .send(credentials)
        .end(function(err, res) {
          done();
        });
    });
  });

  beforeEach(function(done) {
    _.each(MOCK_SURVEYS, function(survey) {
      surveyProvider.addSurvey(survey, function(err, doc) {
        done();
      });
    })
  });

  afterEach(function(done) {
    surveyProvider.removeAllSurveys(function(err, doc) {
      done();
    });
  });

  after(function(done) {
    application.stop(function() {
      console.log('Server stopped.');
      done();
    });
  });

  it('should get user\'s surveys', function(done) {
    agent.get('https://localhost:7000/api/surveys')
      .end(function(err, res) {
        expect(res.message).not.to.be.ok();
        var result = res.body.data;
        _.each(result, function(survey) {
          removeDbKeys(survey);
        });
        expect(result).to.eql(MOCK_SURVEYS);
        done();
      });

  });


});