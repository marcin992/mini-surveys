/**
 * Created by Marcin on 2014-08-13.
 */

var Message = require('./Messages');

module.exports = {
  sendError: function(res, error, message) {
    var response = {
      error: error
    };

    if(message)
      response.message = message;

    res.send(response);
  },

  sendDatabaseError: function(res, error) {
    res.send({
      message: Message.DB_ERROR.en,
      error: error
    });
  },

  sendJsonObject: function(res, document, message) {
    var response = {
      data: document
    };

    if(message)
      response.message = message;

    res.send(response);
  },

  sendMessage: function(res, message) {
    res.send({
      message: message
    });
  }
};