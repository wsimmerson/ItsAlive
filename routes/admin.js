var express = require('express');
var auth = require('../lib/auth');

var router = express.Router();

router.use(auth.authRequired);
router.use(auth.isAdmin);

// get list of users
router.get('/user', function (req, res, next) {
  var db = req.app.get('db');
  db.User.findAll()
    .then(function(users) {
      if (!users) {
        res.json({success:false});
      }
      else {
        res.json({success: true, users:users});
      }
    });
});

// create user
router.post('/user', function (req, res, next) {
  var db = req.app.get('db');
  db.User.build(req.body.user)
  .save()
  .then(function(user) {
    if (!user) {
      res.json({success:false});
    }
    else {
      res.json({success:true});
    }
  })
  .catch(function (err) {
    res.json({success:false});
  });
});

// get specific user
router.get('/user/:id', function (req, res, next) {
  var db = req.app.get('db');
  db.User.findById(req.params.id)
  .then(function(user) {
    if (!user) {
      res.json({success: false});
    }
    else {
      res.json({success: true, user:{email:user.email, isAdmin:user.isAdmin}});
    }
  });
});

// update specific user
router.put('/user/:id', function (req, res, next) {
  var db = req. app.get('db');
  db.User.findById(req.params.id)
  .then(function(user) {
    if (!user) {
      res.json({success: false});
    }
    else {
      user.updateAttributes(req.body.user)
      .then(function(user) {
        res.json({success:true});
      });
    }
  });
});

// delete user
router.delete('/user/:id', function (req, res, next) {
  var db = req.app.get('db');
  db.User.findById(req.params.id)
  .then(function(user) {
    if (user) {
      user.destroy()
      .then(res.json({success:true}));
    }
    else {
      res.json({success:false});
    }
  })
  .catch(function(err){res.json({success:false});});
});

module.exports = router;
