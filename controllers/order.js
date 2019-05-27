const Order = require('../models/order');

module.exports = {
	getOrdersForFT(req, res) {
		const { idFT } = req.params;

		Order.find({foodtruck: idFT})
			.populate('elements')
			.then(orders => {
				console.log(orders[0]);
				res.send(orders);
			});
	}
};
