const AuthentificationController = require('../controllers/authentification');
const UserController = require('../controllers/user');
const CategoryController = require('../controllers/category');
const PlaceController = require('../controllers/place');
const SessionController = require('../controllers/session');
const ArticleController = require('../controllers/article');
const FoodTruckController = require('../controllers/foodtruck');

require('../services/passport');
const passport = require('passport');

//const requireToken = passport.authenticate('jwt', {session: false});
const requireValidCredentials = passport.authenticate('local', {session: false});

module.exports = server => {
	//Authentification
	server.post('/signup', AuthentificationController.signup);
	server.post('/signin', requireValidCredentials, AuthentificationController.signin);
	
	//User
	server.post('/adduser', UserController.create);
	server.get('/user/:id', UserController.read);
	server.get('/users', UserController.readAll);
	
	// server.get('/projects', ProjectController.readAll);
	// server.get('/project/:id', ProjectController.read);
	// server.post('/project', ProjectController.create);
	// server.delete('/project/:id', ProjectController.delete);

	//Category
	server.post('/category', CategoryController.create);
	server.get('/categories', CategoryController.readAll);

	//Category
	server.post('/place', PlaceController.create);
	server.get('/places', PlaceController.readAll);

	//Session
	server.post('/session', SessionController.create);
	server.get('/sessions', SessionController.readAll);

	//Session
	server.post('/article', ArticleController.create);
	server.get('/articles', ArticleController.readAll);

	//FoodTruck
	server.post('/foodtruck', FoodTruckController.create);
	server.get('/foodtrucks', FoodTruckController.readAll);
};
