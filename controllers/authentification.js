const User = require('../models/user');
const Foodtruck = require('../models/foodtruck');
const lodash = require('lodash');
const jwt = require('jwt-simple');
const config = require('../config');
const passport = require('passport');
const OrderController = require('../controllers/order');
const ArticlesController = require('../controllers/article');
const PlaceController = require('../controllers/place');

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
			const foodtruck = new Foodtruck({
				name: newFT.name,
				category: newFT.category,
			});

			//Ajout de 2 emplacements clonés pour démo
			addPlaces(foodtruck).then(newFT => {
				////Ajout de 3 articles clonés pour démo
				addArticles(newFT).then(newFTBis => {
					newFTBis.save().then(() => {
						//Creation de 3 commandes pour démo
						OrderController.createOrdersToShow(foodtruck._id);
		
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
		
							res.json({token: getTokenForUser(user)});
						});
					});
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

//Clone de 3 emplacements pour démo
function addPlaces(foodtruck) {
	return new Promise((resolve, reject) => {
	//Liste de 2 emplacements pour la démo
		const listePlaces = ['5ce9eb7a41a95c31a020ecee', '5ce9eca3e7ff2933d97c036b'];

		const adds = listePlaces.map(placeId => {
			return PlaceController.clonePlace(placeId).then(result => {
				foodtruck.places.push(result);
			})
				.catch((error) => reject(error));
		});

		Promise.all(adds).then(() => {
			resolve(foodtruck);
		});
	});
}

//Clone de 3 emplacements pour démo
function addArticles(foodtruck) {
	return new Promise((resolve, reject) => {

		//Liste des 3 articles à cloner
		const listArticlesRef = ['5cec58dbbe803d02837eb8fd', '5cec58fdbe803d02837eb8ff', '5cf059f84461ae1924fbd9b1'];

		const adds = listArticlesRef.map(articleId => {
			return ArticlesController.cloneArticle(articleId, foodtruck.name).then(result => {
				foodtruck.articles.push(result);
			})
				.catch((error) => reject(error));
		});

		Promise.all(adds).then(() => {
			resolve(foodtruck);
		});
	});
}

