const User = require('../models/user');
const Foodtruck = require('../models/foodtruck');
const lodash = require('lodash');
const jwt = require('jwt-simple');
const config = require('../config');
const passport = require('passport');

function getTokenForUser(user) {
	const timeStamp = new Date().getTime();

	return jwt.encode({
		sub: user._id.toString(),
		iat: timeStamp
	}, config.secret);
}
exports.signup = function(req,res,next) {
	const email = req.body.email;
	const password = req.body.password;
	const newFT = req.body.foodtruck;

	User.findOne({email: email}, (err,existingUser) => {
		if(err) {
			return next(err);
		}

		if(existingUser) {
			return res.status(422).send({error: 'Email déjà utilisé'});
		}

		if(lodash.isEmpty(email) || lodash.isEmpty(password)) {
			return res.status(422).send({error: 'Email et/ou Password vide'});
		}else{

			//Creation du FT
			//const foodtruck = FoodTruckController.create(newFT);

			const foodtruck = new Foodtruck({
				name: newFT.name,
				category: newFT.category
			});
			foodtruck.save().then(() => {
				//Creation User
				const user = new User({
					email: email,
					password: password,
					account: 'foodtruck',
					foodtrucks: [foodtruck._id]
				});
				user.save((err) => {
					if(err) {
						return next(err);
					}
					console.log(foodtruck);
					res.json({token: getTokenForUser(user)});
				});
			});
		}
	});
};

exports.signin = function(req,res,next) {
	// eslint-disable-next-line no-unused-vars
	passport.authenticate('local', function(err, user, info){
		if(err) {
			return next(err);
		}
		if(!user){
			return res.status(500).send({message: 'Les identifiants sont invalides'});
		}else{
			res.json({token: getTokenForUser(req.user)});
		}
	})(req,res,next);
};
