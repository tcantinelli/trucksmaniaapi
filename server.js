const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const server = express();
const cors = require('cors');

mongoose.Promise = global.Promise;
server.use(bodyParser.json());
server.use(cors());
routes(server);

server.listen(3060, () => {

	mongoose.connect('mongodb://localhost/trucksmaniaapi',{ useNewUrlParser: true });
    
	mongoose.connection.once('open',() => {
		console.log('Connexion OK');
	})
		.on('error', (error) => {
			console.warn('Erreur connexion', error);
		});
});