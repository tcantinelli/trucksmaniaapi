const Image = require('../models/image');
const path = require('path');
const fs = require('fs');

module.exports = {
	get(req, res) {
		const { id } = req.params;

		Image.findById(id).then(image => {
			res.setHeader('Content-Type', image.type);
			fs.createReadStream(path.join(__dirname, `../public/${image.filename}`)).pipe(res);
		});
	},

	add(newImage) {
		return new Promise((resolve, reject) => {
			if(newImage) {
				//Sauvegarde de l'image
				const image = new Image({
					name: newImage.originalname,
					type: newImage.mimetype,
					filename: newImage.filename,
					size: newImage.size
				});
				image.save().then((res) => {
					resolve(res._id);		
				})
					.catch((error) => reject(error));
			} else {
				resolve(null);
			}
		});
	},

	delete(imageID) {
		Image.findByIdAndRemove(imageID).then(image => {
			fs.unlink(`./public/${image.filename}`, (err) => {
				if (err) {
					console.error(err);
				}
			});
		});
	}
};
