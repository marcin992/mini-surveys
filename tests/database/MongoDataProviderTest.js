/**
 * Created by Marcin on 2014-08-23.
 */

var expect = require('expect.js');
var MongoDataProvider = require('../../database/MongoSurveyProvider');
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var _ = require('lodash-node');

var dummySurveyId = '111111111111111111111111';

var dummyUserId = ObjectId('222222222222222222222222');

var MOCK_CONTENT = [
  {
    "_id": ObjectId(dummySurveyId),
    "userId": dummyUserId,
    "title": "aaa",
    "questions": [
      {
        "type": "oneChoice",
        "body": "aaa",
        "possibleAnswers": [
          "aaa", "bbb", "ccc"
        ]
      }
    ]
  },
  {
    "userId": dummyUserId,
    "title": "bbb",
    "questions": [
      {
        "type": "oneChoice",
        "body": "bbb",
        "possibleAnswers": [
          "aaa", "bbb", "ccc"
        ]
      }
    ]
  },
  {
    "userId": dummyUserId,
    "title": "ccc",
    "questions": [
      {
        "type": "oneChoice",
        "body": "ccc",
        "possibleAnswers": [
          "aaa", "bbb", "ccc"
        ]
      }
    ]
  }
];


var removeDbKeys = function (survey) {
  delete(survey['_id']);
  delete(survey['__v']);
  _.forEach(survey.questions, function (question) {
    delete(question['_id']);
  });
};


describe('MongoDataProvider tests', function () {
  beforeEach(function (done) {
    mongodb.connect('mongodb://localhost:27018/test', function (err, db) {
      if (!err) {
        db.collection('surveys').insert(MOCK_CONTENT, function (err, doc) {
          db.close();
          done();
        });
      }
    });
  });

  afterEach(function (done) {
    mongodb.connect('mongodb://localhost:27018/test', function (err, db) {
      if (!err) {
        db.collection('surveys').remove({}, function (err) {
          if (!err) {
            done();
          }
        })
      }
    });
  });

  var dataProvider = new MongoDataProvider('test');

  it('Should return survey with given id', function (done) {
    dataProvider.getSurveyById(MOCK_CONTENT[0]._id, function (err, survey) {
      expect(err).not.to.be.ok();
      expect(survey).to.be.ok();
      expect(survey.toObject()).to.eql(MOCK_CONTENT[0]);
      done();
    });
  });

  it('should get survey by specific filter', function (done) {
    var filter = {
      userId: dummyUserId,
      title: {
        "$in": [
          "aaa", "ccc"
        ]
      }
    };

    dataProvider.getSurveys(filter, function (err, surveys) {
      expect(err).not.to.be.ok();
      expect(surveys).to.be.ok();
      expect(surveys).to.have.length(2);

      surveys[0] = surveys[0].toObject();
      surveys[1] = surveys[1].toObject();
      expect(surveys).to.eql([MOCK_CONTENT[0], MOCK_CONTENT[2]]);

      done();
    });
  });

  it('should return only given keys', function(done) {
    var filter = {
      userId: dummyUserId,
      title: {
        "$in": [
          "aaa", "ccc"
        ]
      }
    };

    dataProvider.getSurveys(filter, 'title', function (err, surveys) {
      expect(err).not.to.be.ok();
      expect(surveys).to.be.ok();
      expect(surveys).to.have.length(2);

      surveys[0] = surveys[0].toObject();
      surveys[1] = surveys[1].toObject();

      // Mongoose always return id, so length equals 2
      expect(_.keys(surveys[0])).to.have.length(2);
      expect(_.keys(surveys[1])).to.have.length(2);

      expect(surveys[0].title).to.equal(MOCK_CONTENT[0].title);
      expect(surveys[1].title).to.equal(MOCK_CONTENT[2].title);

      done();
    });
  })
});