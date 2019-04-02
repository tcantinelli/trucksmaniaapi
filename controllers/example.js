const Project = require('../models/project');

module.exports = {
  readAll(req, res) {
    Project.find()
    .populate('images')
      .populate({
        path: 'type',
        populate: {
          path: 'image',
          model: 'image' //A partir du 2eme niveau, il faut specifier le model
        }
      })
      .populate({
        path: 'tools',
        populate: {
          path: 'image',
          model: 'image' //A partir du 2eme niveau, il faut specifier le model
        }
      }).then(Projects => {
      res.send(Projects);
    });
  },

  read(req, res) {
    const { id } = req.params;

    Project.findById(id)
      .populate('images')
      .populate({
        path: 'type',
        populate: {
          path: 'image',
          model: 'image' //A partir du 2eme niveau, il faut specifier le model
        }
      })
      .populate({
        path: 'tools',
        populate: {
          path: 'image',
          model: 'image' //A partir du 2eme niveau, il faut specifier le model
        }
      })
      .then(project => {
        res.send(project);
      });
  },

  create(req, res) {
    const body = req.body;
    const project = new Project({
      title: body.title,
      description: body.description,
      dateStart: body.dateStart,
      dateEnd: body.dateEnd,
      git: body.git,
      type: body.type,
      images: body.images,
      tools: body.tools
    });
    project.save().then(() => {
      res.send({ result: project });
    });
  },

  delete(req, res) {
    const { id } = req.params;

    Project.findByIdAndRemove(id).then(project => {
      res.send(project);
    });
  }
};
