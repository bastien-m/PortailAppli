var mongoose = require('mongoose');

module.exports = function(app) {

	//Schema definition
	var UsersSchema = new mongoose.Schema({
		login 		: {type: String},
		password 	: {type: String}
	});

	UserModel = mongoose.model('User', UsersSchema);

	//methods
	//retrieve a user by his login and password, this method is only used by passport
	//in order to authenticate user (cant find a way to work with passport + promise,
	//so i used callback instead of promise)
	UserModel.loginAuth = function(login, password, callback) {
		UserModel.find({login: login, password: password}, function(err, users) {
			if (err) {
				app.winston.log(err);
				callback(err);
			}
			else {
				if (users.length == 0) {
					callback('Aucun utilisateur trouvé', null);
				}
				else if (users.length > 1) {
					callback('Erreur serveur', null);
				}
				else {
					callback(null, users[0]);
				}
			}
		})
	}

	return UserModel;

}
