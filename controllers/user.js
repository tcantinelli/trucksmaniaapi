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

  delete(req, res) {
    const { id } = req.params;

    User.findByIdAndRemove(id).then(user => {
      res.send(user);
    });
  }
};
