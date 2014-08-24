/**
 * Created by Marcin on 2014-08-20.
 */

var express = require('express');

var AuthenticationController = function (app, passport) {
  this.app = app;
  this.passport = passport;

  this._init();
};

AuthenticationController.prototype = {
  app: null,
  passport: null,
  router: null,

  _init: function () {
    this.router = express.Router();
  },

  registerRoutes: function () {
    this.router.route('/login')
      .get(function(req, res) {
        res.render('login.jade', {
          message: req.flash('loginMessage'),
          title: "Login"
        });
      })
      .post(this.passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
      }));

    this.router.route('/signup')
      .get(function(req, res) {
        res.render('signup.jade', {
          message: req.flash('signupMessage'),
          title: "Sign up"
        });
      })
      .post(this.passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
      }));

    this.router.route('/profile')
      .get(this._isLoggedIn, function (req, res) {
        res.render('profile.jade', {
          user: req.user
        });
      });

    this.router.route('/logout')
      .get(function(req, res) {
        req.logout();
        res.redirect('/');
      });

    this.app.use('/', this.router);
  },

  _isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated())
      return next();

    res.redirect('/');
  }
};

module.exports = AuthenticationController;