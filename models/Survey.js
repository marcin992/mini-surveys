/**
 * Created by Marcin on 2014-08-10.
 */

var mongoose = require('mongoose');

var surveySchema = mongoose.Schema({
    title: String,
    questions: [{
        number: Number,
        type: {
            type: String,
            enum: ['oneChoice', 'multiChoice', 'boolean', 'text']
        },
        body: String,
        possibleAnswers: [String]
    }]
});

var Survey = mongoose.model('surveys', surveySchema);

module.exports = Survey;