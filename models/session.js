const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
	start: Date,
	end: Date,
	place: {
		type: Schema.Types.ObjectId,
		ref: 'place'
	}
});

const Session = mongoose.model('session', SessionSchema, 'SESSION');

module.exports = Session;