const Foodtruck = require('../models/foodtruck');
const fs = require('fs');
const Image = require('../models/image');

module.exports = {
	readAll(req, res) {
		Foodtruck.find()
			.populate('category')
			.populate('places')
			.populate('logo')
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
	},

	uploadFile(req, res, next) {
		//Sauvegarde de l'image
		const image = new Image({
			originalname: req.file.originalname,
			mimetype: req.file.mimetype,
			filename: req.file.filename,
			path: req.file.path,
			size: req.file.size
		});
		image.save().then(() => {			
			//Recuperation du FT concerné
			Foodtruck.findById(req.body.idFT)
				.populate('logo')
				.then((theFoodTruck) => {
					//Si logo déjà sauvegardé, suppression de l'image et du document en bdd
					if(theFoodTruck.logo) {
						fs.unlink(`./public/${theFoodTruck.logo.filename}`, (err) => {
							if (err) {
								console.error(err);
							}
						});
						Image.deleteOne({_id: theFoodTruck.logo._id}, (err) =>{
							console.log(err);
						});
					}

					//Update du FT avec son id (idFT)
					theFoodTruck.logo = image._id;
					theFoodTruck.save().then((result) => {
						result.populate('logo')
							.populate('places').execPopulate()
							.then(() => {
								res.send(result);
								next();
							});
					});
				});
			
		});
	}
};
