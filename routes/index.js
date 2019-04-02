ProjectController = require('../controllers/project-controller');

module.exports = server => {
  //Projects
  server.get('/projects', ProjectController.readAll);
  server.get('/project/:id', ProjectController.read);
  server.post('/project', ProjectController.create);
  server.delete('/project/:id', ProjectController.delete);
};
