var fs = require('fs');

module.exports = {
  key: fs.readFileSync('./config/key.pem'),
  cert: fs.readFileSync('./config/cert.crt'),
  passphrase: 'Awmsw2odoz'
};