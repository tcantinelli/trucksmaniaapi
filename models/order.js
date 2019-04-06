const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
	dateOrder: Date,
	client: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	foodtruck: {
		type: Schema.Types.ObjectId,
		ref: 'foodtruck'
	},
	elements: [{
		type: Schema.Types.ObjectId,
		ref: 'orderElement'
	}],
	grade: { type: Number, default: null },
	comment: { type: String, default: null }
});

//Total commande en methode suppl

const Order = mongoose.model('order', OrderSchema, 'ORDER');

module.exports = Order;