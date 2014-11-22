/**
 * Created by Marcin on 2014-08-10.
 */

var mongoose = require('mongoose');

var answerSchema = mongoose.Schema({
  surveyId: mongoose.Schema.Types.ObjectId,
  questionNumber: Number,
  response: String
  //answers: Object
});

var Answer = mongoose.model('answers', answerSchema);

module.exports = Answer;