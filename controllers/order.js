const Order = require('../models/order');
const moment = require('moment');

module.exports = {
	getOrdersForFT(req, res) {
		const { idFT } = req.params;

		Order.find({foodtruck: idFT})
			.populate('client')
			.populate({
				path: 'elements.article',
				type: 'article'
			})
			.then(orders => {
				res.send(orders);
			});
	},
	
	createOrdersToShow(idFT) {
		const datas = [
			{
				elements: [
					{
						article: '5cf059f84461ae1924fbd9b1',
						quantity: 3
					}, 
					{
						article : '5cec58dbbe803d02837eb8fd',
						quantity: 2
					}, 
					{
						article : '5cec58fdbe803d02837eb8ff',
						quantity : 3
					}
				],
				grade: null,
				comment: null,
				dateOrder: moment().add(7, 'days').toISOString(true),
				client: '5cec5ea7b2f7ef7decf76462',
				foodtruck: idFT
			},
			{
				elements: [
					{
						article: '5cf059f84461ae1924fbd9b1',
						quantity: 1
					}, 
					{
						article : '5cec58dbbe803d02837eb8fd',
						quantity: 1
					}
				],
				grade: 4,
				comment: 'Trop bon!',
				dateOrder: moment().subtract(7, 'days').toISOString(true),
				client: '5cec5ea7b2f7ef7decf76462',
				foodtruck: idFT
			},
			{
				elements: [
					{
						article: '5cf059f84461ae1924fbd9b1',
						quantity: 5
					}, 
					{
						article : '5cec58dbbe803d02837eb8fd',
						quantity: 5
					}, 
					{
						article : '5cec58fdbe803d02837eb8ff',
						quantity : 5
					}
				],
				grade: null,
				comment: null,
				dateOrder: moment().add(7, 'days').toISOString(true),
				client: '5cec5ea7b2f7ef7decf76464',
				foodtruck: idFT
			}
		];

		datas.map(order => {
			const newOrder = new Order({
				grade: order.grade,
				comment: order.comment,
				dateOrder: order.dateOrder,
				client: order.client,
				foodtruck: order.foodtruck
			});

			order.elements.map(element => {
				newOrder.elements.push(element);
			});

			newOrder.save();
		});
	}
};
