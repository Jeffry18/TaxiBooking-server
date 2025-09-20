const Tariff = require("../models/tariff");

// Add new tariff
exports.addTariff = async (req, res) => {
  try {
    const newTariff = new Tariff(req.body); 
    await newTariff.save(); 
    res.status(201).json(newTariff);    
  } catch (err) {
    res.status(500).json({ error: err.message });   
  }
};

// Get all tariffs
exports.getTariffs = async (req, res) => {
  try {
    const tariffs = await Tariff.find();
    res.json(tariffs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Delete tariff
exports.deleteTariff = async (req, res) => {
  try {
    const deleted = await Tariff.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Tariff not found" });
    res.json({ message: "Tariff deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
