const Order = require('../models/order');

module.exports = {
	readAll(req, res) {
		Order.find()
			.populate('client')
			.populate('foodtruck')
			.populate({
				path: 'elements',
				populate: {
					path: 'article',
					model: 'article'
				}
			})
			.then(orders => {
				res.send(orders);
			});
	},

	read(req, res) {
		const { id } = req.params;

		Order.findById(id)
			.populate('client')
			.populate('foodtruck')
			.populate({
				path: 'elements',
				populate: {
					path: 'article',
					model: 'article'
				}
			})
			.then(order => {
				res.send(order);
			});
	},

	create(req, res) {
		const body = req.body;
		const order = new Order({
			dateOrder: new Date(),
			client: body.client,
			foodtruck: body.foodtruck,
			elements: body.elements,
		});
		order.save().then(() => {
			res.send({ result: order });
		});
	},

	delete(req, res) {
		const { id } = req.params;

		Order.findByIdAndRemove(id).then(order => {
			res.send(order);
		});
	}
};
