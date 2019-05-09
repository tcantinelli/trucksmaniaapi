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

	updateProfil(req, res, next) {
		console.log(req.file);
		//Recuperation des données du Post
		const logo = req.file;
		const name = req.body.name;
		const categoryID = req.body.category;

		//Recuperation du FT concerné
		Foodtruck.findById(req.body.idFT)
			.populate('logo')
			.populate('category')
			.then((theFoodTruck) => {
				
				//Update logo
				if (logo) {
					console.log('logo');
					theFoodTruck.logo = this.uploadFile(theFoodTruck.logo, logo);
				}

				//Update name
				if (name !== 'null') {
					theFoodTruck.name !== name ? theFoodTruck.name = name : null ;
				}

				//Update category
				if (categoryID !== 'null') {
					theFoodTruck.category._id !== categoryID ? theFoodTruck.category = categoryID : null;
				}

				//Sauvegarde
				theFoodTruck.save().then((result) => {
					result.populate('logo')
						.populate('places').execPopulate()
						.then(() => {
							res.send(result);
							next();
						});
				});
			});
	},

	uploadFile(oldLogo, newLogo) {
		//Sauvegarde de l'image
		const image = new Image({
			originalname: newLogo.originalname,
			mimetype: newLogo.mimetype,
			filename: newLogo.filename,
			path: newLogo.path,
			size: newLogo.size
		});
		image.save().then(() => {			
			//Si logo déjà en BDD, suppression de l'image et du document relatif
			if(oldLogo) {
				fs.unlink(`./public/${oldLogo.filename}`, (err) => {
					if (err) {
						console.error(err);
					}
				});
				Image.deleteOne({_id: oldLogo._id}, (err) =>{
					console.log(err);
				});
			}

			//Retourne id image
			return image._id;
		});
	}
};
