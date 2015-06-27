var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.app.get('db');

  db.Service.findAll()
    .then(function(services){
      if (!services) {
        res.json({
          success: false,
          message: "failed to retrieve services"
        });
      }
      else {
        services.success = true;
        res.json(services);
      }
    })
    .catch(function(err) {
      console.log(err);
      res.json({
        success: false,
        message: "failed to retrieve services"
      });
    });
});

// create service
router.post('/', function (req, res, next) {
  var db = req.app.get('db');

  db.Service.build(req.body.data)
    .save()
    .then(function(service) {
      if (!service) {
        res.json({success: false});
      }
      else {
        res.json({success: true});
      }
    })
    .catch(function(err) {
      console.log(err);
      res.json({success: false});
    });
});

module.exports = router;
