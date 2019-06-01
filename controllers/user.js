const User = require('../models/user');
const passport = require('passport');

module.exports = {
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
							path: 'logo',
							model: 'image'
						},
						{
							path: 'images',
							model: 'image'
						},
						{
							path: 'places',
							model: 'place'
						},
						{
							path: 'articles',
							model: 'article',
							populate: [
								{
									path: 'image',
									model: 'image'
								}
							]
						}
					]
				})
				.then(user => {
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
