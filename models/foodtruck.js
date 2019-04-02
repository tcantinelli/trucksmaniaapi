const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodTruckSchema = new Schema({
    name: String,
    categorie: {
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
    logo: String,
    images: [String]
})

const FoodTruck = mongoose.model('foodtruck', FoodTruckSchema, 'FOODTRUCK');

module.exports = FoodTruck;