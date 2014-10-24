var fs = require('fs');

module.exports = {
  key: fs.readFileSync('C:/Users/Marcin/development/ssl/key.pem'),
  cert: fs.readFileSync('C:/Users/Marcin/development/ssl/cert.crt'),
  passphrase: 'Awmsw2odoz'
};