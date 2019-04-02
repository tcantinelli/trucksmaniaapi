const User = require("../models/user");

module.exports = {
  readAll(req, res) {
    User.find()
      .populate({
        path: "foodtrucks",
        populate: [
          {
            path: "category",
            model: "category"
          },
          {
            path: "places",
            model: "place"
          },
          {
            path: "sessions",
            model: "session"
          },
          {
            path: "articles",
            model: "article"
          }
        ]
      })
      .then(users => {
        res.send(users);
      });
  },

  read(req, res) {
    const { id } = req.params;

    User.findById(id)
    .populate({
        path: "foodtrucks",
        populate: [
          {
            path: "category",
            model: "category"
          },
          {
            path: "places",
            model: "place"
          },
          {
            path: "sessions",
            model: "session"
          },
          {
            path: "articles",
            model: "article"
          }
        ]
      })
      .then(user => {
        res.send(user);
      });
  },

  create(req, res) {
    const body = req.body;
    const user = new User({
      name: body.name,
      category: body.category,
      places: body.places,
      sessions: body.sessions,
      articles: body.articles,
      logo: body.logo,
      images: body.images
    });
    user.save().then(() => {
      res.send({ result: user });
    });
  },

  delete(req, res) {
    const { id } = req.params;

    User.findByIdAndRemove(id).then(user => {
      res.send(user);
    });
  }
};
