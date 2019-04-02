const Place = require("../models/place");

module.exports = {
  readAll(req, res) {
    Place.find().then(places => {
      res.send(places);
    });
  },

  read(req, res) {
    const { id } = req.params;

    Place.findById(id).then(place => {
      res.send(place);
    });
  },

  create(req, res) {
    const body = req.body;
    const place = new Place({
      title: body.title,
      adresse: body.adresse,
      latitude: body.latitude,
      longitude: body.longitude
    });
    place.save().then(() => {
      res.send({ result: place });
    });
  },

  delete(req, res) {
    const { id } = req.params;

    Place.findByIdAndRemove(id).then(place => {
      res.send(place);
    });
  }
};
