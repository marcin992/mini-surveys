var Application = require('./Application');

var application = new Application(5040);

application.start(function() {
  console.log('Magic happens on port 80');
});