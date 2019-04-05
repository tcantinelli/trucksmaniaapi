const Foodtruck = require('../models/foodtruck');

module.exports = {
	readAll(req, res) {
		Foodtruck.find()
			.populate('categorie')
			.populate('places')
			.populate({
				path: 'sessions',
				populate: {
					path: 'place',
					model: 'place'
				}
			})
			.populate('articles')
			.then(foodtrucks => {
				res.send(foodtrucks);
			});
	},

	read(req, res) {
		const { id } = req.params;

		Foodtruck.findById(id)
			.populate('categorie')
			.populate('places')
			.populate({
				path: 'sessions',
				populate: {
					path: 'place',
					model: 'place'
				}
			})
			.populate('articles')
			.then(foodtruck => {
				res.send(foodtruck);
			});
	},

	create(req, res) {
		const body = req.body;
		const foodtruck = new Foodtruck({
			name: body.name,
			category: body.category,
			places: body.places,
			sessions: body.sessions,
			articles: body.articles,
			logo: body.logo,
			images: body.images
		});
		foodtruck.save().then(() => {
			res.send({ result: foodtruck });
		});
	},

	delete(req, res) {
		const { id } = req.params;

		Foodtruck.findByIdAndRemove(id).then(foodtruck => {
			res.send(foodtruck);
		});
	}
};
