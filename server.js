var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  winston = require('winston'),
  mongoose = require('mongoose'),
  config = require('./config.json')[app.get('env')];

app.config = config;
app.winston = winston;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//connection to mongodb
mongoose.connect(config.dburl);

//configure log
app.winston.add(winston.transports.File, { filename: 'server.log' });
app.winston.remove(winston.transports.Console);

//passport initialization
require('./Authentication.js')(app);

require('./Models')(app);
require('./Controllers')(app);
require('./Routes.js')(app);

if (app.get('env') === 'development') {
  app.winston.info('Started in dev mode');
  console.log('started in development mode');
  app.use(errorHandler());
}

app.listen(app.config.port, function() {
  app.winston.info('Express server listening on port %d', app.config.port);
  console.log('Express server listening on port 3000');
});
