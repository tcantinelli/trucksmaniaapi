const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
	title: String,
	adresse: String,
	latitude: String,
	longitude: String
});

const Place = mongoose.model('place', PlaceSchema, 'PLACE');

module.exports = Place;