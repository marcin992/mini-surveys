/**
 * Created by Marcin on 2014-08-30.
 */

var express = require('express');
var router = express.Router();
var MessageSender = require('../utils/MessageSender');
var Message = require('../utils/Messages');

module.exports = function(app, surveyProvider, answerProvider, answerMiner, passport) {
  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
      return next();
    res.redirect('/login');
  }

  function hasAccess(req, res, next) {
    if(req.isAuthenticated())
      return next();
    MessageSender.sendMessage(res, Message.NO_ACCESS.en);
  }

  var surveys = require('./surveyRoutes')(surveyProvider);
  var auth = require('./authRoutes')(passport);
  var respond = require('./respondentRoutes')(answerProvider, answerMiner);

  router.route('/api/surveys')
    .get(hasAccess, surveys.getSurveys)
    .post(hasAccess, surveys.addSurvey);

  router.route('/api/surveys/:surveyId')
    .get(hasAccess, surveys.getSurveyById)
    .put(hasAccess, surveys.updateSurvey)
    .delete(hasAccess, surveys.deleteSurvey);

  router.route('/api/answers/:surveyId')
    .get(respond.getAnswers)
    .post(respond.saveAnswer);

  router.route('/api/code/:surveyCode')
    .get(surveys.getSurveyByCode);

  router.route('/')
    .get(function(req, res) {
      res.render('index', {
        title: 'Surveys'
      });
    });


  router.route('/login')
    .get(auth.loginView)
    .post(passport.authenticate('local-login', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true
    }));

  router.route('/signup')
    .get(auth.signupView)
    .post(passport.authenticate('local-signup', {
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFlash: true
    }));

  router.route('/profile')
    .get(isLoggedIn, function(req, res) {
      res.render('profile.jade', {
        user: req.user,
        title: 'Surveys'
      });
    });

  router.route('/survey/:surveyCode')
    .get(respond.surveyView);

  router.route('/partials/:filename')
    .get(isLoggedIn, function(req, res) {
      res.render('partials/' + req.params.filename, {
        user: req.user
      });
    });

  router.route('/partials/directives/:filename')
    .get(isLoggedIn, function(req, res) {
      res.render('partials/directives/' + req.params.filename, {
        user: req.user
      });
    });

  router.route('/logout')
    .get(auth.logout);

  app.use('/', router);

  /// catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
};