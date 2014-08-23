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
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  questions: [questionSchema]
});

surveySchema.methods.addQuestion = function(newQuestion, done) {
  this.questions.push(newQuestion);
  this.questionCount += 1;
  this.save(done);
};

var Survey = mongoose.model('surveys', surveySchema);

module.exports = Survey;