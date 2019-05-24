const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
	title: String,
	adress: String,
	week: {
		value: String,
		active: Boolean
	},
	latitude: Number,
	longitude: Number,
	zoom: Number
});

const Place = mongoose.model('place', PlaceSchema, 'PLACE');

module.exports = Place;