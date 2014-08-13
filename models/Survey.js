/**
 * Created by Marcin on 2014-08-10.
 */

var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
  number: Number,
  type: {
    type: String,
    enum: ['oneChoice', 'multiChoice', 'boolean', 'text']
  },
  body: String,
  possibleAnswers: [String]
});

var surveySchema = mongoose.Schema({
  title: String,
  questionCount: Number,
  questions: [questionSchema]
});

var Survey = mongoose.Model('surveys', surveySchema);

module.exports = Survey;