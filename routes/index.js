const AuthentificationController = require('../controllers/authentification');
const UserController = require('../controllers/user');
const CategoryController = require('../controllers/category');
const PlaceController = require('../controllers/place');
const SessionController = require('../controllers/session');
const ArticleController = require('../controllers/article');
const FoodTruckController = require('../controllers/foodtruck');
const OrderElementController = require('../controllers/orderElement');
const OrderController = require('../controllers/order');
const ImageController = require('../controllers/image');
const multer = require('multer');

require('../services/passport');
const passport = require('passport');

const requireToken = passport.authenticate('jwt', {session: false});
const requireValidCredentials = passport.authenticate('local', {session: false});

// SET STORAGE
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public');
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now());
	}
});
   
const upload = multer({ storage: storage });

module.exports = server => {
	//Authentification
	server.post('/signup', AuthentificationController.signup);
	server.post('/signin', requireValidCredentials, AuthentificationController.signin);
	
	//User
	server.get('/user', requireToken, UserController.getUser);
	server.post('/adduser', UserController.create);
	server.get('/users', UserController.readAll);
	
	// server.get('/projects', ProjectController.readAll);
	// server.get('/project/:id', ProjectController.read);
	// server.post('/project', ProjectController.create);
	// server.delete('/project/:id', ProjectController.delete);

	//Category
	server.post('/category', CategoryController.create);
	server.get('/categories', CategoryController.readAll);

	//Place
	server.post('/place', PlaceController.create);
	server.get('/places', PlaceController.readAll);

	//Session
	server.post('/session', SessionController.create);
	server.get('/sessions', SessionController.readAll);

	//Article
	server.post('/article', ArticleController.create);
	server.get('/articles', ArticleController.readAll);

	//FoodTruck
	server.post('/foodtruck', FoodTruckController.create);
	server.get('/foodtrucks', FoodTruckController.readAll);

	//Upload logo
	server.post('/uplogo', upload.single('file'), FoodTruckController.uploadFile);
	server.post('/upprofil', upload.single('file'), FoodTruckController.updateProfil);

	//Get Image
	server.get('/image/:id', ImageController.get);

	//OrderElement
	server.post('/orderelement', OrderElementController.create);
	server.get('/orderelements', OrderElementController.readAll);

	//Order
	server.post('/order', OrderController.create);
	server.get('/orders', OrderController.readAll);
};
