const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	value: String,
	price: Number,
	image: String
});

const Article = mongoose.model('article', ArticleSchema, 'ARTICLE');

module.exports = Article;