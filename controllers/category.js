const Category = require("../models/category");

module.exports = {
    readAll(req, res) {
      Category.find().then(categories => {
        res.send(categories);
      });
    },
  
    read(req, res) {
      const { id } = req.params;
  
      Category.findById(id).then(category => {
        res.send(category);
      });
    },
  
    create(req, res) {
      const body = req.body;
      const category = new Category({
        value: body.value,
        image: body.image
      });
      category.save().then(() => {
        res.send({ result: category });
      });
    },
  
    delete(req, res) {
      const { id } = req.params;
  
      Category.findByIdAndRemove(id).then(category => {
        res.send(category);
      });
    }
  };