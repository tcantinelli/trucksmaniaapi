const Session = require("../models/session");

module.exports = {
  readAll(req, res) {
    Session.find()
      .populate("place")
      .then(sessions => {
        res.send(sessions);
      });
  },

  read(req, res) {
    const { id } = req.params;

    Session.findById(id)
      .populate("place")
      .then(session => {
        res.send(session);
      });
  },

  create(req, res) {
    const body = req.body;
    const session = new Session({
      start: body.start,
      end: body.end,
      place: body.place
    });
    session.save().then(() => {
      res.send({ result: session });
    });
  },

  delete(req, res) {
    const { id } = req.params;

    Session.findByIdAndRemove(id).then(session => {
      res.send(session);
    });
  }
};
