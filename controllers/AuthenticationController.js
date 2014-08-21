/**
 * Created by Marcin on 2014-08-20.
 */

var express = require('express');
var router = express.Router();

module.exports = {
  registerRoutes: function(app, passport) {
    router.route('/login')
      .get(function(req, res) {
        res.render('login.jade', {
          message: req.flash('loginMessage'),
          title: "Login"
        });
      })
      .post(passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
      }));

    router.route('/signup')
      .get(function(req, res) {
        res.render('signup.jade', {
          message: req.flash('signupMessage'),
          title: "Sign up"
        });
      })
      .post(passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
      }));

    router.route('/profile')
      .get(isLoggedIn, function(req, res) {
        res.render('profile.jade', {
          user: req.user
        });
      });

    router.route('/logout')
      .get(function(req, res) {
        req.logout();
        res.redirect('/');
      });

    app.use('/', router);
  }
};

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated())
    return next();

  res.redirect('/');
}