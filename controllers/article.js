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

	delete(req, res) {
		const { id } = req.params;

		Article.findByIdAndRemove(id).then(article => {
			res.send(article);
		});
	}
};
