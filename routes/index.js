const AuthentificationController = require('../controllers/authentification');
const CategoryController = require('../controllers/category');
const PlaceController = require('../controllers/place');
const SessionController = require('../controllers/session');

require('../services/passport');
const passport = require('passport');

//const requireToken = passport.authenticate('jwt', {session: false});
const requireValidCredentials = passport.authenticate('local', {session: false});

module.exports = server => {
	//Authentification
	server.post('/signup', AuthentificationController.signup);
	server.post('/signin', requireValidCredentials, AuthentificationController.signin);
	
	// server.get('/projects', ProjectController.readAll);
	// server.get('/project/:id', ProjectController.read);
	// server.post('/project', ProjectController.create);
	// server.delete('/project/:id', ProjectController.delete);

	//Category
	server.post('/cat', CategoryController.create);
	server.get('/cats', CategoryController.readAll);

	//Category
	server.post('/place', PlaceController.create);
	server.get('/places', PlaceController.readAll);

	//Session
	server.post('/session', SessionController.create);
	server.get('/sessions', SessionController.readAll);
};
