const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
	quantity: Number
});

const Item = mongoose.model('item', OrderItemSchema, 'ITEM');

module.exports = Item;