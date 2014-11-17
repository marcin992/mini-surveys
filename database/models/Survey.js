/**
 * Created by Marcin on 2014-08-10.
 */

var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['oneChoice', 'multiChoice', 'boolean', 'text']
  },
  body: String,
  possibleAnswers: [String]
});

var surveySchema = mongoose.Schema({
  metadata: {
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
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

//var Survey = mongoose.model('surveys', surveySchema);

module.exports = surveySchema;