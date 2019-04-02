const OrderElement = require("../models/orderElement");

module.exports = {
  readAll(req, res) {
    OrderElement.find()
      .populate("article")
      .then(orderElements => {
        res.send(orderElements);
      });
  },

  read(req, res) {
    const { id } = req.params;

    OrderElement.findById(id)
      .populate("article")
      .then(orderElement => {
        res.send(orderElement);
      });
  },

  create(req, res) {
    const body = req.body;
    const orderElement = new OrderElement({
      article: body.article,
      quantity: body.quantity
    });
    orderElement.save().then(() => {
      res.send({ result: orderElement });
    });
  },

  delete(req, res) {
    const { id } = req.params;

    OrderElement.findByIdAndRemove(id).then(orderElement => {
      res.send(orderElement);
    });
  }
};
