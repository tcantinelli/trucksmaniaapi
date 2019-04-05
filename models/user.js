const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
	pseudo: String,
	email: String,
	password: String,
	inscription: Date,
	account: String, //"foodtruck" ou "client"
	validation: { type: Boolean, default: false }, //Validation inscription par email
	//Favoris pour clients, FT pour FT à l'index 0 du tableau
	foodtrucks: [{
		type: Schema.Types.ObjectId,
		ref: 'foodtruck'
	}]
});

//Hash du password
UserSchema.pre('save', function(next) {
	const user = this;
	bcrypt.genSalt(10, (err,salt) => {
		if(err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if(err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

//Comparaison password
UserSchema.methods.isPasswordEqualTo = function(externalPassword, done) {
	bcrypt.compare(externalPassword, this.password, function(err, isMatch) {
		if(err) {
			return done(err);
		}
		done(null, isMatch);
	});
};

const User = mongoose.model('user', UserSchema, 'USER');

module.exports = User;