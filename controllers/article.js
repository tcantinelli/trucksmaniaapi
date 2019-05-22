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
};
