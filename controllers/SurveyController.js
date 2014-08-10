/**
 * Created by Marcin on 2014-08-10.
 */

var express = require('express');
var router = express.Router();

var Survey = require('../models/Survey');
var Message = require('../utils/Messages');

module.exports = {
    registerRoutes: function(app) {
        router.route('/')
            .post(addSurvey);

        router.route('/:surveyId')
            .get(getSurveyById)
            .put(updateSurvey)
            .delete(deleteSurvey);

        app.use('/api/surveys', router);
    }
};

function addSurvey(req, res) {

}

function getSurveyById(req, res) {
    Survey.findById(req.params.surveyId, function(err, survey) {
        console.log(survey);
        if(err)
            res.send({
                error: err
            });
        else {
            if(survey !== null) {
                res.send(survey);
            } else {
                res.send({
                    message: Message.NO_SURVEY.eng
                });
            }
        }
    });
}

function updateSurvey(req, res) {

}

function deleteSurvey(req, res) {

}