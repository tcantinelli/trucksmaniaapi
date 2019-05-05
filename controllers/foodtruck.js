const Foodtruck = require('../models/foodtruck');

module.exports = {
	readAll(req, res) {
		Foodtruck.find()
			.populate('category')
			// .populate('places')
			// .populate({
			// 	path: 'sessions',
			// 	populate: {
			// 		path: 'place',
			// 		model: 'place'
			// 	}
			// })
			// .populate('articles')
			.then(foodtrucks => {
				res.send(foodtrucks);
			});
	},

	read(req, res) {
		const { id } = req.params;

		Foodtruck.findById(id)
			.populate('category')
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

	create(body) {
		const foodtruck = new Foodtruck({
			name: body.name,
			category: body.category
		});
		foodtruck.save().then(() => {
			return foodtruck;
		});
	},

	delete(req, res) {
		const { id } = req.params;

		Foodtruck.findByIdAndRemove(id).then(foodtruck => {
			res.send(foodtruck);
		});
	}
};
