var mongoose = require('mongoose');

var User = require('./models/User');
var Message = require('../utils/Messages');

var MongoUserProvider = function (environment) {
  console.log(environment);
  this._init(environment);
  this._initCollection();
};

MongoUserProvider.prototype = {
  _connection: null,
  _model: null,
  _config: require('../config/database'),

  _init: function (environment) {
    var options = {
      server: {
        socketOptions: {
          keepAlive: 1
        }
      }
    };

    this._connection = mongoose.createConnection(this._config.mongo.connectionString(environment), options);
  },

  _initCollection: function() {
    this._model = this._connection.model('users', User);
  },

  getUserById: function (userId, query, doneCallback) {
    this._model.findById(userId, query, doneCallback);
  },

  getUserByEmail: function(email, doneCallback) {
    this._model.findOne({
      'local.email': email
    }, doneCallback)
  },

  addUser: function(email, password, doneCallback) {
    var user = new this._model();
    user.local.email = email;
    user.local.password = user.generateHash(password);

    user.save(doneCallback);
  },

  validatePassword: function(password) {
    return this._model.validPassword(password);
  }
};

module.exports = MongoUserProvider;