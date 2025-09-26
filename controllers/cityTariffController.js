const CityTariff = require("../models/cityTariff");

// Create new city tariff
exports.createCityTariff = async (req, res) => {
  try {
    const newTariff = new CityTariff(req.body);
    await newTariff.save();
    res.status(201).json(newTariff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tariffs (optionally by city)
exports.getCityTariffs = async (req, res) => {
  try {
    const { city } = req.query;
    const filter = city ? { city } : {};
    const tariffs = await CityTariff.find(filter);
    res.json(tariffs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update tariff
exports.updateCityTariff = async (req, res) => {
  try {
    const updatedTariff = await CityTariff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTariff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete tariff
exports.deleteCityTariff = async (req, res) => {
  try {
    await CityTariff.findByIdAndDelete(req.params.id);
    res.json({ message: "Tariff deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
