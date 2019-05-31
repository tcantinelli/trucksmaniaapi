const AuthentificationController = require('../controllers/authentification');
const UserController = require('../controllers/user');
const CategoryController = require('../controllers/category');
const SessionController = require('../controllers/session');
const FoodTruckController = require('../controllers/foodtruck');
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

	//Category
	server.get('/categories', CategoryController.readAll);

	//PLACES
	server.post('/place', FoodTruckController.addPlace); //Add
	server.post('/upplace', FoodTruckController.updatePlace); //Update
	server.post('/delplace', FoodTruckController.deletePlace); //Delete

	//Session
	server.post('/session', SessionController.create);
	server.get('/sessions', SessionController.readAll);

	//ARTICLES
	server.post('/article', upload.single('article'), FoodTruckController.addArticle); //Add
	server.post('/uparticle', upload.single('article'), FoodTruckController.updateArticle); //Update
	server.post('/delarticle', FoodTruckController.deleteArticle); //Delete

	//Upload logo
	server.post('/upprofil', upload.single('logo'), FoodTruckController.updateProfil);

	//Upload Images
	server.post('/upimages', upload.array('image',3), FoodTruckController.updateImages);

	//delete Image
	server.post('/delimage', FoodTruckController.deleteImage);

	//Get Image
	server.get('/image/:id', ImageController.get);

	//Get Image
	server.get('/image/:id', ImageController.get);

	//Orders
	server.get('/ordersft/:idFT', OrderController.getOrdersForFT);

	//TESTS
	// server.get('/test', AuthentificationController.testMe);
};
