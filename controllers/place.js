const Place = require('../models/place');

module.exports = {
	create(body) {
		const {title, address, week, timeStart, timeEnd, latitude, longitude, zoom} = body;
		
		return new Promise((resolve, reject) => {
			const place = new Place({
				title, address, week, timeStart, timeEnd, latitude, longitude, zoom
			});
			place.save().then((newPlace) => {
				resolve(newPlace._id);
			})
				.catch((error) => reject(error));
		});
	},

	delete(idPlace) {
		Place.findByIdAndRemove(idPlace);
	},

	update(body) {
		return new Promise((resolve, reject) => {
			Place.findOneAndUpdate(
				{'_id': body.idPlace},
				{$set: {
					'title': body.title,
					'address': body.address,
					'week': body.week,
					'timeStart': body.timeStart,
					'timeEnd': body.timeEnd,
					'latitude': body.latitude,
					'longitude': body.longitude,
					'zoom': body.zoom,
				}},
				{returnNewDocument : true}, 
				function(err){
					if(err){
						reject(err);
					}
					resolve('done');
				});
		});
	},
};
