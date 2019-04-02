const Article = require("../models/article");

module.exports = {
  readAll(req, res) {
    Article.find().then(articles => {
      res.send(articles);
    });
  },

  read(req, res) {
    const { id } = req.params;

    Article.findById(id).then(article => {
      res.send(article);
    });
  },

  create(req, res) {
    const body = req.body;
    const article = new Article({
      value: body.value,
      price: body.price,
      image: body.image
    });
    article.save().then(() => {
      res.send({ result: article });
    });
  },

  delete(req, res) {
    const { id } = req.params;

    Article.findByIdAndRemove(id).then(article => {
      res.send(article);
    });
  }
};
