var nodemailer = require('nodemailer');
var Q = require('q');

var EmailSender = function() {
  this._init();
};

EmailSender.prototype = {
  transporter: null,
  sender: null,

  _init: function() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'mini.surveys.noreply@gmail.com',
        pass: 'Njtcmatcr'
      }
    });

    this.sender = 'Mini Surveys <mini.surveys.noreply@gmail.com>';
  },

  sendEmail: function(receiverAddress, subject, textContent, htmlContent) {
    var mailOptions = {
      from: this.sender,
      to: receiverAddress,
      subject: subject,
      text: textContent
    };
    if(htmlContent) {
      mailOptions.html = htmlContent;
    }

    var transporter = this.transporter;
    return Q.denodeify(transporter.sendMail.bind(transporter))(mailOptions);
  }
};

module.exports = EmailSender;