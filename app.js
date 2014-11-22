var Application = require('./Application');

var application = new Application(7070);

application.start(function() {
  console.log('Magic happens on port 80');
});