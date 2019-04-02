const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    firstname: String,
    email: String,
    password: String,
    inscription: Date,
    account: String,
    validation: Boolean, //Validation inscription par email
    //Favoris pour clients, FT pour FT à l'index 0 du tableau
    foodtrucks: [{
        type: Schema.Types.ObjectId,
        ref: 'foodtruck'
    }]
})

const User = mongoose.model('user', UserSchema, 'USER');

module.exports = User;