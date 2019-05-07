const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
	originalname: String,
	mimetype: String,
	filename: String,
	size: Number
});

const Image = mongoose.model('image', ImageSchema, 'IMAGE');

module.exports = Image;
