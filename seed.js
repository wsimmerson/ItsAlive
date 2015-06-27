var db = require('./models');

db.User.build({
  email: 'admin@example.com',
  password: 'admin'
}).save()
  .then(function() {
    return db.User.find({where:{'email':'admin@example.com'}})
                  .then(function(u) {
                    return u.verifyPassword('admin', function (err, res) {
                      console.log('email: ' + u.email);
                      console.log('Password Valid: ' + res);
                      return;
                    });
                  });
  });
