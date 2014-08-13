/**
 * Created by Marcin on 2014-08-10.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');

module.exports = {
  registerRoutes: function (app) {
    router.route('/')
      .get(index);

    router.route('/login')
      .post(passport.authenticate('local'),
      function (req, res) {
        res.redirect('/profile/' + req.user.username);
      });

    app.use('/', router);
  }
};

function index(req, res) {
  res.render('index', {
    title: 'Pico-Survey'
  });
}