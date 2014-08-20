/**
 * Created by Marcin on 2014-08-10.
 */

var express = require('express');
var router = express.Router();

module.exports = {
  registerRoutes: function (app) {
    router.route('/')
      .get(index);

    app.use('/', router);
  }
};

function index(req, res) {
  res.render('index', {
    title: 'Pico-Survey'
  });
}