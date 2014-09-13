var Application = require('./Application');

var application = new Application(443);

application.start(function() {
  console.log('Magic happens on port 443');
});