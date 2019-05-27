const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderElementSchema = new Schema({
	article: {
		type: Schema.Types.ObjectId,
		ref: 'article'
	},
	quantity: Number
});

const OrderElement = mongoose.model('orderElement', OrderElementSchema, 'ELEMENT');

module.exports = OrderElement;