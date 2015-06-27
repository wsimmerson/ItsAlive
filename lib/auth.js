var jwt = require("jsonwebtoken");

module.exports = {
  authRequired: function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, req.app.get('secret'), function(err, decoded) {
        if (err) {
          return res.json({
            success: false,
            message: 'Failed to authenticate token'
          });
        }
        else {
            req.decoded = decoded;
            next();
        }
      });
    }
    else {
      res.status(403).json({
        success: false,
        message: 'No token provided'
      });
    }
  }
};
