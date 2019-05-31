const mongoose = require('mongoose');
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
		Place.findOneAndDelete({'_id':idPlace}).then(() => {
			console.log('Place deleted');
		});
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

	clonePlace(idPlace) {
		return new Promise((resolve, reject) => {
			//Clone emplacement
			Place.findById(idPlace).then(newPlace => {
				newPlace._id = mongoose.Types.ObjectId();
				newPlace.isNew = true;
				newPlace.save()
					.then((result) => {
						resolve(result._id);
					})
					.catch((error) => reject(error));
			})
				.catch((error) => console.log(error));
		});
	}
};
