const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
	name: String,
	type: String,
	filename: String,
	size: Number
});

const Image = mongoose.model('image', ImageSchema, 'IMAGE');

module.exports = Image;
