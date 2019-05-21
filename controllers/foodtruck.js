const Foodtruck = require('../models/foodtruck');
const ImageController = require('./image');
const ArticleController = require('./article');

module.exports = {
	//MAJ profil FT
	updateProfil(req, res, next) {
	//Recuperation des données du Post
		const logo = req.file;
		const name = req.body.name;
		const categoryID = req.body.category;

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
								.populate('articles')
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

	//MAJ Images FT
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
									.populate('articles')
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
						.populate('articles')
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

	//Suppression image FT
	deleteImage(req, res, next) {
		//Recuperation des données du Post
		const idFT = req.body.idFT;
		const idImage = req.body.idImage;

		Foodtruck.findOneAndUpdate(
			{ '_id': idFT },
			{ $pull: { 'images': idImage }},
			// !!!! note the { 'new': true } option
			{ 'new': true },
			function(error, result) {
				result.populate('logo')
					.populate('places')
					.populate('articles')
					.populate('images').execPopulate()
					.then(() => {
						ImageController.delete(idImage);
						res.send(result);
						next();
					})
					.catch((err) => {
						return next(err);
					});

			});
	},

	//Ajout Article
	addArticle(req, res) {
		const body = req.body;
		const image = req.file;

		ArticleController.create(body, image).then(newArticleId => {

			//Recuperation du FT concerné
			Foodtruck.findById(body.idFT)
				.then((theFoodTruck) => {
					theFoodTruck.articles.push(newArticleId);
					theFoodTruck.save().then((result) => {
						result.populate('logo')
							.populate('places')
							.populate('articles')
							.populate('images').execPopulate()
							.then(() => {
								res.send(result);
							});
					});
				});
		});
	},

	//Suppression Article
	deleteArticle(req, res, next) {
		//Recuperation des données du Post
		const idFT = req.body.idFT;
		const idArticle = req.body.idArticle;
	
		Foodtruck.findOneAndUpdate(
			{ '_id': idFT },
			{ $pull: { 'articles': idArticle }},
			{ 'new': true },
			function(error, result) {
				result.populate('logo')
					.populate('places')
					.populate('articles')
					.populate('images').execPopulate()
					.then(() => {
						ArticleController.delete(idArticle);
						res.send(result);
						next();
					})
					.catch((err) => {
						return next(err);
					});
	
			});
	},
};

function uploadLogo(oldLogo, newLogo) {
	return new Promise((resolve, reject) => {
		if(newLogo) {
			//Sauvegarde de l'image
			ImageController.add(newLogo).then((image) => {			
			//Si logo déjà en BDD, suppression de l'image et du document relatif
				if(oldLogo) {
					ImageController.delete(oldLogo.filename, oldLogo._id);
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
				return ImageController.add(newImage).then((res) => {
					listImagesId.push(res);		
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
