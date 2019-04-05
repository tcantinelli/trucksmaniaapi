const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    pseudo: String,
    email: String,
    password: String,
    inscription: Date,
    account: String, //"foodtruck" ou "client"
    validation: { type: Boolean, default: false }, //Validation inscription par email
    //Favoris pour clients, FT pour FT à l'index 0 du tableau
    foodtrucks: [{
        type: Schema.Types.ObjectId,
        ref: 'foodtruck'
    }]
})

const User = mongoose.model('user', UserSchema, 'USER');

module.exports = User;