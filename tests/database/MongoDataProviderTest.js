/**
* Created by Marcin on 2014-08-23.
*/

var expect = require('expect.js');
var Q = require('q');
var MongoDataProvider = require('../../database/MongoSurveyProvider');
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var _ = require('lodash-node');

var dummySurveyId = '111111111111111111111111';

var dummyUserId = ObjectId('222222222222222222222222');

var MOCK_CONTENT = [{
  "metadata": {
    "userId": dummyUserId,
    "title": "aaa",
    "description": "aaa",
    "status": "draft",
    "answerCount": 0,
    "link": ""
  },
  "_id": ObjectId(dummySurveyId),
  "questions": [{
    "type": "oneChoice",
    "body": "aaa",
    "possibleAnswers": [
      "aaa", "bbb", "ccc"
    ]
  }]
}, {
  "metadata": {
    "userId": dummyUserId,
    "title": "bbb",
    "description": "bbb",
    "status": "inProgress",
    "answerCount": 134,
    "link": "sratatata"
  },
  "questions": [{
    "type": "oneChoice",
    "body": "bbb",
    "possibleAnswers": [
      "aaa", "bbb", "ccc"
    ]
  }]
}, {
  "metadata": {
    "userId": dummyUserId,
    "title": "ccc",
    "description": "ccc",
    "status": "finished",
    "answerCount": 1009,
    "link": "dupadupa"
  },
  "questions": [{
    "type": "oneChoice",
    "body": "ccc",
    "possibleAnswers": [
      "aaa", "bbb", "ccc"
    ]
  }]
}];

var removeDbKeys = function(survey) {
  delete(survey['_id']);
  delete(survey['__v']);
  _.forEach(survey.questions, function(question) {
    delete(question['_id']);
  });
};


describe('MongoDataProvider tests', function() {
  beforeEach(function(done) {
    mongodb.connect('mongodb://localhost:27018/test', function(err, db) {
      if (!err) {
        db.collection('surveys').insert(MOCK_CONTENT, function(err, doc) {
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
            done();
          }
        });
      }
    });
  });

  var dataProvider = new MongoDataProvider('test');

  it('Should return survey with given id', function(done) {
    dataProvider.getSurveyById(dummySurveyId, function(err, survey) {
      expect(err).not.to.be.ok();
      expect(survey).to.be.ok();
      expect(survey.toObject()).to.eql(MOCK_CONTENT[0]);
      done();
    });
  });

  it('should get survey by specific filter', function(done) {
    var filter = {
      "metadata.userId": dummyUserId,
      "metadata.title": {
        "$in": [
          "aaa", "ccc"
        ]
      }
    };

    dataProvider.getSurveys(filter, function(err, surveys) {
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
      "metadata.userId": dummyUserId,
      "metadata.title": {
        "$in": [
          "aaa", "ccc"
        ]
      }
    };

    dataProvider.getSurveys(filter, 'metadata.title', function(err, surveys) {
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
  });

  it('should add new survey', function(done) {
    var newSurvey = {
      "metadata": {
        "userId": dummyUserId,
        "title": "ddd",
        "description": "ddd",
        "status": "draft",
        "answerCount": 0,
        "link": ""
      },
      "questions": [{
        "type": "oneChoice",
        "body": "ccc",
        "possibleAnswers": [
          "aaa", "bbb", "ccc"
        ]
      }]
    };

    dataProvider.addSurvey(newSurvey, function(err, survey) {
      expect(err).not.to.be.ok();
      expect(survey).to.be.ok();

      // Check if it is really added to db
      var id = survey._id;
      dataProvider.getSurveyById(id, function(err, survey) {
        expect(err).not.to.be.ok();
        expect(survey).to.be.ok();

        // Before comparing we must delete keys added by mongoose
        survey = survey.toObject();
        removeDbKeys(survey);
        expect(survey).to.eql(newSurvey);
        done();
      });
    });
  });

  it('should delete survey', function(done) {
    dataProvider.deleteSurvey(dummySurveyId, function(err, survey) {
      expect(err).not.to.be.ok();
      expect(survey).to.be.ok();

      dataProvider.getSurveyById(survey._id, function(err, survey) {
        expect(err).not.to.be.ok();
        expect(survey).not.to.be.ok();
        done();
      });
    });
  });

  it('should update survey', function(done) {
    var updatingSurvey = {
      "metadata": {
        "userId": dummyUserId,
        "title": "bbb",
        "description": "ccc",
        "status": "inProgress",
        "answerCount": 4,
        "link": ""
      },
      "questions": [{
        "type": "oneChoice",
        "body": "aaa",
        "possibleAnswers": [
          "aaa", "bbb", "ccc"
        ]
      }]
    };

    dataProvider.updateSurvey(dummySurveyId, updatingSurvey)
      .then(function(survey) {
        survey = survey.toObject();
        removeDbKeys(survey);
        expect(survey).to.eql(updatingSurvey);
        done();
      });
  });

  it('shouldn\'update survey due to validation error', function(done) {
    var updatingSurvey = {
      "metadata": {
        "userId": dummyUserId,
        "title": "bbb",
        "description": "ccc",
        "status": "dupadupa",
        "answerCount": 4,
        "link": ""
      },
      "questions": [{
        "type": "sratatata",
        "body": "aaa",
        "possibleAnswers": [
          "aaa", "bbb", "ccc"
        ]
      }]
    };

    dataProvider.updateSurvey(dummySurveyId, updatingSurvey)
      .then(function(doc) {
        expect(doc._doc).not.to.be.ok();
        done();
      }, function(err) {
        expect(err).to.be.ok();
        expect(err.name).to.equal('ValidationError');
        expect(err.message).to.equal('Validation failed');
        done();
      });
  });
});