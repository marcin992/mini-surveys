/**
 * Created by Marcin on 2014-08-10.
 */

var express = require('express');

var ViewController = function (app) {
  this.app = app;

  this._init();
};

ViewController.prototype = {
  app: null,
  router: null,

  _init: function () {
    this.router = express.Router();
  },

  registerRoutes: function () {
    this.router.route('/')
      .get(this._index);

    this.app.use('/', this.router);
  },

  _index: function (req, res) {
    res.render('index', {
      title: 'Pico-Survey'
    });
  }
};

module.exports = ViewController;