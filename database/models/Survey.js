/**
 * Created by Marcin on 2014-08-10.
 */

var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['oneChoice', 'multiChoice', 'boolean', 'text'],
    required: true
  },
  body: {
    type: String,
    required: true
  },
  isRequired: {
    type: Boolean,
    required: false
  },
  possibleAnswers: [String]
});

var surveySchema = mongoose.Schema({
  metadata: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: String,
    status: {
      type: String,
      enum: ['draft', 'inProgress', 'finished']
    },
    answerCount: Number,
    surveyCode: {
      type: String,
      unique: true
    }
  },
  questions: [questionSchema]
});

module.exports = surveySchema;