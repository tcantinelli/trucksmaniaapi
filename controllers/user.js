const User = require('../models/user');
const passport = require('passport');

module.exports = {
	readAll(req, res) {
		User.find()
			.populate({
				path: 'foodtrucks',
				populate: [
					{
						path: 'category',
						model: 'category'
					},
					{
						path: 'places',
						model: 'place'
					},
					{
						path: 'sessions',
						model: 'session'
					},
					{
						path: 'articles',
						model: 'article'
					}
				]
			})
			.then(users => {
				res.send(users);
			});
	},

	read(req, res) {
		const { id } = req.params;

		User.findById(id)
			.populate({
				path: 'foodtrucks',
				populate: [
					{
						path: 'category',
						model: 'category'
					},
					{
						path: 'places',
						model: 'place'
					},
					{
						path: 'sessions',
						model: 'session'
					},
					{
						path: 'articles',
						model: 'article'
					}
				]
			})
			.then(user => {
				res.send(user);
			});
	},

	create(req, res) {
		const body = req.body;
		const user = new User({
			email: body.email,
			password: body.password,
			account: body.account,
			foodtrucks: body.foodtrucks
		});
		user.save().then(() => {
			res.send({ result: user });
		});
	},

	delete(req, res) {
		const { id } = req.params;

		User.findByIdAndRemove(id).then(user => {
			res.send(user);
		});
	},

	getUser(req,res,next) {
		// eslint-disable-next-line no-unused-vars
		passport.authenticate('jwt', function(err, user, info){
			if(err) {
				return next(err);
			}
	
			//Recup User
			User.findById(req.user.id)
				.populate({
					path: 'foodtrucks',
					populate: [
						{
							path: 'category',
							model: 'category'
						}
					]
				})
				.then(user => {
					console.log(user);
					res.json({
						pseudo: user.pseudo,
						email: user.email,
						account: user.account,
						validation: user.validation,
						foodtrucks: user.foodtrucks
					});
				});
		})(req,res,next);
	}
};
