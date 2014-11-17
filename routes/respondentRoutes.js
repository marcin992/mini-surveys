module.exports = {
  surveyView: function(req, res) {
    var surveyCode = req.params.surveyCode;

    res.render('respondentPage', {
      surveyCode: surveyCode
    });
  }
};
