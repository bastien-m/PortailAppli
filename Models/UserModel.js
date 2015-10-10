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
	//in order to authenticate user
	UserModel.login = function(login, password) {
		return new Promise(function(resolve, reject) {
			UserModel.find({login: login, password: password}, function(err, users) {
				if (err) {
					console.log(err);
					reject('Une erreur est survenue lors de la requête');
				}
				else {
					if (users.length > 1) {
						reject('Plusieurs utilisateurs trouvés, vérifier en base de données la liste des utilisateurs et supprimer les duoblons');
					}
					else if (users.length == 1){
						resolve(users[0]);
					}
					else {
						//no user found, we resolve but with an empty array
						resolve([]);
					}
				}
			});
		});
	}

	return UserModel;

}
