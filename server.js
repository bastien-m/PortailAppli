var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  config = require('./config.json')[app.get('env')];

app.config = config;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//connection to mongodb
mongoose.connect(config.dburl);

//passport initialization
require('./Authentication.js')(app);

require('./Models')(app);
require('./Controllers')(app);
require('./Routes.js')(app);

if (app.get('env') === 'development') {
  console.log('started in development mode');
  app.use(errorHandler());
}

app.listen(app.config.port, function() {
  console.log('Express server listening on port 3000');
});
