var express = require('express');
var jwt     = require('jsonwebtoken');

var router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  var db = req.app.get('db');

  db.User.find({where: {'email': req.body.email}})
    .then(function(user) {
      if (!user) {
        res.json({
          success: false,
          message: "Invalid Username / Password"
        });
      }
      else {
        user.verifyPassword(req.body.password, function( err, response ) {
            if (err || !response) {
              res.json({
                success: false,
                message: "Invalid Username / Password"
              });
            }
            else {
              var data = {
                id: user.id,
                name: user.firstName + " " + user.lastName,
                email: user.email,
                role: user.role
              };

              var token = jwt.sign(data, req.app.get('secret'));

              res.json({
                user:data,
                token:token,
                success: true
              });
            }
          }
        );
      }
    });
});

module.exports = router;
