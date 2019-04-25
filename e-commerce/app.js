'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();

var cors = require('cors');
app.use(cors());

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);
  //console.log("PORT = "+process.env.PORT)
  var port = process.env.PORT || 4000;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
