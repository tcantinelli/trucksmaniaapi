AuthentificationController = require('../controllers/authentification');

module.exports = server => {
  //Authentification
  server.get('/signup', AuthentificationController.signup);
  //Projects
  // server.get('/projects', ProjectController.readAll);
  // server.get('/project/:id', ProjectController.read);
  // server.post('/project', ProjectController.create);
  // server.delete('/project/:id', ProjectController.delete);
};
