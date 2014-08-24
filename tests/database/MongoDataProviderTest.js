/**
 * Created by Marcin on 2014-08-23.
 */

var expect = require('expect.js');
var MongoDataProvider = require('../../database/MongoDataProvider');
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

  it('Should insert a new survey into database and return it', function (done) {
    var dummySurvey = {
      "userId": ObjectId('444444444444444444444444'),
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
    };

    dataProvider.addSurvey(dummySurvey, function (err, survey) {
      expect(err).not.to.be.ok();
      expect(survey).to.be.ok();

      survey = survey.toObject();

      //removeDbKeys(survey);

      dataProvider.getSurveyById(survey._id, function (err, doc) {
        expect(err).not.to.be.ok();
        expect(doc).to.be.ok();
        doc = doc.toObject();
        removeDbKeys(doc);
        expect(doc).to.eql(dummySurvey);
        done();
      });
    });
  });

  it('Should update survey with given id', function (done) {
    var changedSurvey = {
      "userId": ObjectId('444444444444444444444444'),
      "title": "changedTitle",
      "questions": [
        {
          "type": "multiChoice",
          "body": "qqq",
          "possibleAnswers": [
            "aaa", "bbb", "ccc"
          ]
        }
      ]
    };

    dataProvider.updateSurvey(dummySurveyId, changedSurvey, function (err, survey) {
      expect(err).not.to.be.ok();
      expect(survey).to.be.ok();

      survey = survey.toObject();

      // Removing database keys
      removeDbKeys(survey);

      expect(survey).to.eql(changedSurvey);

      dataProvider.getSurveyById(dummySurveyId, function (err, survey) {
        expect(err).not.to.be.ok();
        expect(survey).to.be.ok();
        survey = survey.toObject();
        removeDbKeys(survey);
        expect(survey).to.eql(changedSurvey);
        done();
      });
    });
  });

  it('should delete survey with given id', function (done) {
    dataProvider.deleteSurvey(dummySurveyId, function (err, survey) {
      expect(err).not.to.be.ok();
      expect(survey).to.be.ok();

      dataProvider.getSurveyById(dummySurveyId, function (err, survey) {
        expect(err).not.to.be.ok();
        expect(survey).not.to.be.ok();

        done();
      });
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

    dataProvider.getSurvey(filter, function (err, surveys) {
      expect(err).not.to.be.ok();
      expect(surveys).to.be.ok();
      expect(surveys).to.have.length(2);

      surveys[0] = surveys[0].toObject();
      surveys[1] = surveys[1].toObject();
      expect(surveys).to.eql([MOCK_CONTENT[0], MOCK_CONTENT[2]]);

      done();
    })
  })
});