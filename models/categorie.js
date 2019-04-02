const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    value: String,
    image: String
})

const Category = mongoose.model('category', CategorySchema, 'CATEGORY');

module.exports = Category;