var fs = require('fs');

var options = {
  key: fs.readFileSync('./config/key.pem'),
  cert: fs.readFileSync('./config/cert.pem')
};

module.exports = options;
