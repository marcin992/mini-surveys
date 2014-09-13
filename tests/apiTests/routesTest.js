var expect = require('expect.js');
var Application = require('../../Application');
var Message = require('../../utils/Messages');
var request = require('superagent');
var _ = require('lodash-node');
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var agent = request.agent();

describe('Routes tests', function() {
  var TEST_PORT = 7000;
  var application;
  var credentials = {
    'email': 'test-user',
    'password': 'test'
  };

  var userId = '541445d6969229b02a5f33cd';
  var dummySurveyId = '111111111111111111111111';
  var MOCK_SURVEYS = [{
    "metadata": {
      "userId": ObjectID(userId),
      "title": "Mongo bongo",
      "description": "aaa",
      "status": "draft",
      "answerCount": 0,
      "link": ""
    },
    "questions": []
  }, {
    "metadata": {
      "userId": ObjectID(userId),
      "title": "No title",
      "description": "bbb",
      "status": "draft",
      "answerCount": 0,
      "link": ""
    },
    "_id": ObjectID(dummySurveyId),
    "questions": []
  }];

  var removeDbKeys = function(survey) {
    delete(survey['_id']);
    delete(survey['__v']);
    _.forEach(survey.questions, function(question) {
      delete(question['_id']);
    });
  };

  var stringifyIds = function(survey) {
    survey._id = survey._id.toHexString();
    survey.metadata.userId = userId;
  };

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
    mongodb.connect('mongodb://localhost:27018/test', function(err, db) {
      if (!err) {
        db.collection('surveys').insert(MOCK_SURVEYS, function(err, doc) {
          db.close();
          done();
        });
      }
    });
  });

  afterEach(function(done) {
    mongodb.connect('mongodb://localhost:27018/test', function(err, db) {
      if (!err) {
        db.collection('surveys').remove({}, function(err) {
          if (!err) {
            db.close();
            done();
          }
        });
      }
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
        expect(err).not.to.be.ok();
        var expected = [];
        for (var i = 0; i < MOCK_SURVEYS.length; i++) {
          expected[i] = _.clone(MOCK_SURVEYS[i]);
          stringifyIds(expected[i]);
        }
        var result = res.body.data;
        expect(result).to.eql(expected);
        done();
      });

  });

  it('should get survey by given id', function(done) {
    agent.get('https://localhost:7000/api/surveys/' + MOCK_SURVEYS[1]._id)
      .end(function(err, res) {
        expect(err).not.to.be.ok();
        expect(res.body.message).not.to.be.ok();
        var result = res.body.data;
        var expected = _.clone(MOCK_SURVEYS[1]);
        stringifyIds(expected);
        expect(result).to.eql(expected);
        done();
      })
  });

  it('should add new survey and then return it', function(done) {
    var title = "Awesome survey";
    var description = "awesome";
    agent.post('https://localhost:7000/api/surveys/')
      .send({
        "title": title,
        "description": description
      })
      .end(function(err, res) {
        expect(err).not.to.be.ok();
        expect(res.body.message).not.to.be.ok();
        var result = res.body.data;
        var expectedMetadata = {
          "title": title,
          "description": description,
          "userId": userId,
          "status": "draft",
          "answerCount": 0,
          "link": ""
        };
        expect(result).to.be.ok();
        expect(result.metadata).to.eql(expectedMetadata);
        expect(result.questions).to.be.an('array');
        expect(result.questions).to.be.empty();

        // Check if it is really in db

        agent.get('https://localhost:7000/api/surveys/' + result._id)
          .end(function(err, res) {
            expect(err).not.to.be.ok();
            expect(res.body.message).not.to.be.ok();
            var expected = result;
            expect(res.body.data).to.eql(expected);
            done();
          })
      });
  });



});