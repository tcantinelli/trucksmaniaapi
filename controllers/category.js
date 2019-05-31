const Category = require('../models/category');

module.exports = {
	readAll(req, res) {
		Category.find().then(categories => {
			res.send(categories);
		});
	}
};