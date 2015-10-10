module.exports = function(app) {

  app.Models = {};
  app.Models.UserModel = require('./UserModel.js')(app);
  app.Models.ProjectModel = require('./ProjectModel.js')(app);

}
