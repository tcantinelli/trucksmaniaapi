const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
	title: String,
	address: String,
	week: [{
		value: String,
		active: Boolean
	}],
	timeStart: String,
	timeEnd: String,
	latitude: Number,
	longitude: Number,
	zoom: Number
});

const Place = mongoose.model('place', PlaceSchema, 'PLACE');

module.exports = Place;