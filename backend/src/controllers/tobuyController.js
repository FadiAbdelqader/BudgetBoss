const Tobuy = require('../models/tobuy');

exports.getAllTobuys = async (req, res) => {
    try {
      const tobuys = await Tobuy.find();
      res.json(tobuys);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.getTobuyById = async (req, res) => {
    try {
      const tobuy = await ExTobuypense.findById(req.params.id);
      if (tobuy == null) {
        return res.status(404).json({ message: 'Expense not found' });
      }
      res.json(tobuy);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  exports.createTobuy = async (req, res) => {
    const tobuy = new Tobuy({
      name: req.body.name,
      //date: req.body.date
      date: new Date()
    });
  
    try {
      const newTobuy = await tobuy.save();
      res.status(201).json(newTobuy);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };