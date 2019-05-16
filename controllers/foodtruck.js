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

	updateProfil(req, res, next) {
	//Recuperation des données du Post
		const logo = req.file;
		const name = req.body.name;
		const categoryID = req.body.category;

		console.log(req.body);

		//Recuperation du FT concerné
		Foodtruck.findById(req.body.idFT)
			.populate('logo')
			.then((theFoodTruck) => {
			//Update logo
				uploadLogo(theFoodTruck.logo, logo)
					.then(result => {
						if(result) {
							theFoodTruck.logo = result;
						}
					
						//Update name
						if (name !== '') {
							theFoodTruck.name !== name ? theFoodTruck.name = name : null ;
						}

						//Update category
						if (categoryID !== 'null') {
							theFoodTruck.category !== categoryID ? theFoodTruck.category = categoryID : null;
						}

						//Sauvegarde
						theFoodTruck.save().then((result) => {
							result.populate('logo')
								.populate('places')
								.populate('images').execPopulate()
								.then(() => {
									res.send(result);
									next();
								})
								.catch((err) => {
									return next(err);
								});
						});
					});
			});
	},

	updateImages(req, res, next) {
		//Recuperation des données du Post
		const listFiles = req.files;
	
		//Recuperation du FT concerné
		Foodtruck.findById(req.body.idFT)
			.then((theFoodTruck) => {
				if(listFiles.length > 0) {
				//Update images
					uploadImages(listFiles)
						.then(result => {
							if(result) {
								result.map(idImage => theFoodTruck.images.push(idImage));
							}
	
							//Sauvegarde
							theFoodTruck.save().then((result) => {
								result.populate('logo')
									.populate('places')
									.populate('images').execPopulate()
									.then(() => {
										res.send(result);
										next();
									})
									.catch((err) => {
										return next(err);
									});
							});
						});
				}else{
					theFoodTruck.populate('logo')
						.populate('places')
						.populate('images').execPopulate()
						.then(() => {
							res.send(theFoodTruck);
							next();
						})
						.catch((err) => {
							return next(err);
						});
				}
			});
		
	},

	deleteImage(req, res, next) {
		//Recuperation des données du Post
		const idFT = req.body.idFT;
		const idImage = req.body.idImage;
		const fileNameImage = req.body.fileNameImage;

		Foodtruck.findOneAndUpdate(
			{ '_id': idFT },
			{ $pull: { 'images': idImage }},
			// !!!! note the { 'new': true } option
			{ 'new': true },
			function(error, result) {
				result.populate('logo')
					.populate('places')
					.populate('images').execPopulate()
					.then(() => {
						deleteImage(fileNameImage, idImage);
						res.send(result);
						next();
					})
					.catch((err) => {
						return next(err);
					});

			});
	}
};

function uploadLogo(oldLogo, newLogo) {
	return new Promise((resolve, reject) => {
		if(newLogo) {
		//Sauvegarde de l'image
			const image = new Image({
				name: newLogo.originalname,
				type: newLogo.mimetype,
				filename: newLogo.filename,
				size: newLogo.size
			});
			image.save().then(() => {			
			//Si logo déjà en BDD, suppression de l'image et du document relatif
				if(oldLogo) {
					deleteImage(oldLogo.filename, oldLogo._id);
				}
		
				//Retourne id image
				resolve(image._id);
			})
				.catch((error) => reject(error));
		} else {
			resolve(null);
		}
	});
}

function uploadImages(newImages) {
	return new Promise((resolve, reject) => {
		if(newImages) {
		//Array d'images
			const listImagesId = [];

			//Creation images
			const addImg = newImages.map(newImage => {

				//Sauvegarde de l'image
				const image = new Image({
					name: newImage.originalname,
					type: newImage.mimetype,
					filename: newImage.filename,
					size: newImage.size
				});
				return image.save().then((res) => {
					listImagesId.push(res._id);		
				})
					.catch((error) => reject(error));
			});
			
			Promise.all(addImg).then(() => {
				//Retourne liste id image
				resolve(listImagesId);
			});
		} else {
			resolve(null);
		}
	});
}

function deleteImage(imgFilename, imgId) {
	fs.unlink(`./public/${imgFilename}`, (err) => {
		if (err) {
			console.error(err);
		}
	});
	Image.deleteOne({_id: imgId}, (err) =>{
		console.log(err);
	});
}