const Image = require('../models/image');
const path = require('path');
const fs = require('fs');

module.exports = {
	get(req, res) {
		const { id } = req.params;

		Image.findById(id).then(image => {
			res.setHeader('Content-Type', image.mimetype);
			fs.createReadStream(path.join(__dirname, `../public/${image.filename}`)).pipe(res);
		});
	},
};
