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

surveySchema.methods.addQuestion = function(newQuestion, done) {
  this.questions.push(newQuestion);
  this.questionCount += 1;
  this.save(done);
};

var Survey = mongoose.model('surveys', surveySchema);

module.exports = Survey;