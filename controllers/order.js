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
	
	/* Creation de 3 commandes, 2 à venir + 1 ancienne avec note et commentaire, à partir des articles
	créés pour l'utilisateur 
	=> null */
	createOrdersToShow(idFT, listeIdArticles) {
		const datas = [
			{
				elements: [
					{
						article: listeIdArticles[0],
						quantity: 3
					}, 
					{
						article : listeIdArticles[1],
						quantity: 2
					}, 
					{
						article : listeIdArticles[2],
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
						article: listeIdArticles[0],
						quantity: 1
					}, 
					{
						article : listeIdArticles[1],
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
						article: listeIdArticles[0],
						quantity: 5
					}, 
					{
						article : listeIdArticles[1],
						quantity: 5
					}, 
					{
						article : listeIdArticles[2],
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
