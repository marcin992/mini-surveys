/**
 * Created by Marcin on 2014-08-10.
 */

var config = {
  mongo: {
    development: {
      host: "127.0.0.1",
      port: 27017,
      user: "",
      password: "",
      databaseName: "surveyDb"
    },
    production: {
      host: 'ds029960.mongolab.com',
      port: 29960,
      user: 'admin',
      password: 'njtcmttcr',
      databaseName: 'pico-survey'
    },
    test: {
      host: "127.0.0.1",
      port: 27018,
      user: "",
      password: "",
      databaseName: "test"
    },

    connectionString: function (env) {
      var root = config.mongo[env];

      var s = 'mongodb://' + root.user + ':' + root.password
        + '@' + root.host + ':' + root.port + '/' + root.databaseName;

      return  s;
    }
  }
};

module.exports = config;