AuthentificationController = require('../controllers/authentification');
require("../services/passport");
const passport = require("passport");

const requireToken = passport.authenticate("jwt", {session: false});
const requireValidCredentials = passport.authenticate("local", {session: false});

module.exports = server => {
  //Authentification
  server.post('/signup', AuthentificationController.signup);
  server.post('/signin', requireValidCredentials, AuthentificationController.signin);
  //Projects
  // server.get('/projects', ProjectController.readAll);
  // server.get('/project/:id', ProjectController.read);
  // server.post('/project', ProjectController.create);
  // server.delete('/project/:id', ProjectController.delete);
};
