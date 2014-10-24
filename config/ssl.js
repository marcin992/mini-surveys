var fs = require('fs');

module.exports = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.crt'),
  passphrase: 'Awmsw2odoz'
};