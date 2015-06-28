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
  },
  isAdmin: function(req, res, next) {
    console.log(req.decoded);
    if(req.decoded) {
      var db = req.app.get('db');
      db.User.findById(req.decoded.id)
      .then(function(user) {
        if (!user) {
          res.json({
            success: false,
            message: "Access Denied"
          });
        }
        else {
          if (user.isAdmin) {
            next();
          }
          else {
            res.json({
              success: false,
              message: "Access Denied"
            });
          }
        }

      });
    }
    else {
      res.json({
        success: false,
        message: "Access Denied"
      });
    }
  }
};
