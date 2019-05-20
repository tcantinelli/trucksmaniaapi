const Article = require('../models/article');
const Foodtruck = require('../models/foodtruck');
const ImageController = require('../controllers/image');

module.exports = {
	create(req, res) {
		const body = req.body;
		const image = req.file;

		//Creation image
		ImageController.addImage(image).then((newImage) => {
		
			//Recuperation du FT concerné
			Foodtruck.findById(body.idFT)
				.then((theFoodTruck) => {

					//Creation article
					const article = new Article({
						value: body.value,
						price: body.price,
						description: body.description,
						image: newImage._id
					});
					article.save().then((newArticle) => {
						theFoodTruck.articles.push(newArticle._id);
						theFoodTruck.save().then((result) => {
							res.send(result);
						});
					});
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
