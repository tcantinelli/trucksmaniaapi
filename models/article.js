const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	value: String,
	price: Number,
	description: String,
	image: {
		type: Schema.Types.ObjectId,
		ref: 'image',
		default: null
	}
});

const Article = mongoose.model('article', ArticleSchema, 'ARTICLE');

module.exports = Article;