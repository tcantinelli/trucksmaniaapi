const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodTruckSchema = new Schema({
	name: String,
	category: {
		type: Schema.Types.ObjectId,
		ref: 'category'
	},
	places: [{
		type: Schema.Types.ObjectId,
		ref: 'place'
	}],
	sessions: [{
		type: Schema.Types.ObjectId,
		ref: 'session'
	}],
	articles: [{
		type: Schema.Types.ObjectId,
		ref: 'article'
	}],
	logo: {
		type: Schema.Types.ObjectId,
		ref: 'image',
		default: null
	},
	images: [{
		type: Schema.Types.ObjectId,
		ref: 'image'
	}]
});

const FoodTruck = mongoose.model('foodtruck', FoodTruckSchema, 'FOODTRUCK');

module.exports = FoodTruck;