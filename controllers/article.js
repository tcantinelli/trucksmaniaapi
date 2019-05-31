const mongoose = require('mongoose');
const Article = require('../models/article');
const ImageController = require('./image');

module.exports = {
	create(body, image) {
		return new Promise((resolve, reject) => {
		//Creation image
			ImageController.add(image).then((newImageId) => {
			//Creation article
				const article = new Article({
					value: body.value,
					price: body.price,
					description: body.description,
					image: newImageId
				});
				article.save().then((newArticle) => {
					resolve(newArticle._id);
				})
					.catch((error) => reject(error));
			});
		});
	},

	delete(articleID) {
		Article.findByIdAndRemove(articleID).then(article => {
			//Suppression image
			ImageController.delete(article.image);
		});
	},
	
	update(body, image) {
		return new Promise((resolve, reject) => {
			if(body.oldImageID && image) {
				ImageController.delete(body.oldImageID);
			}
			//Creation image
			ImageController.add(image).then((newImageId) => {
			//Update article
				Article.findById(body.idArticle).then(updatedArticle => {
					//Image
					if(newImageId) {
						updatedArticle.image = newImageId;
					}
					updatedArticle.value = body.value,
					updatedArticle.price = body.price,
					updatedArticle.description = body.description,

					updatedArticle.save().then(() => {
						resolve('done');		
					})
						.catch((error) => reject(error));
				});
			});
		});
	},

	/* Clone d'un article pour démo. Spécifitité pour un article, contient une description du plat personnalisée avec le nom du 
	FT de l'utilisateur
	=> nouvel ID */
	cloneArticle(articleID, FTname) {
		//ID de l'article à modifier pour la description
		const articleToModif = '5cf059f84461ae1924fbd9b1';

		return new Promise((resolve, reject) => {
			
			Article.findById(articleID).then(newArticle => {
				//Modif description si article ciblé
				newArticle._id == articleToModif ? newArticle.description = `Le véritable hamburger du ${FTname}`: null;
				newArticle._id = mongoose.Types.ObjectId();
				newArticle.isNew = true;
				newArticle.save()
					.then((result) => {
						resolve(result._id);
					})
					.catch((error) => reject(error));
			})
				.catch((error) => console.log(error));
		});
	}
};
