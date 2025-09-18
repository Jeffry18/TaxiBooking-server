const State = require("../models/state");


// Add a new State
exports.addState = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if state already exists
    const existing = await State.findOne({ name });
    if (existing) {
      return res.status(400).json({ error: "State already exists" });
    }

    const state = new State({ name, cities: [] });
    await state.save();

    res.json({ message: "State added successfully", state });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new City into a specific State
exports.addCityToState = async (req, res) => {
  try {
    const { stateId } = req.params;
    const { name } = req.body;

    const state = await State.findById(stateId);
    if (!state) return res.status(404).json({ error: "State not found" });

    state.cities.push({ name, places: [] });
    await state.save();

    res.json({ message: "City added successfully", state });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new Place into a specific City of a State
exports.addPlaceToCity = async (req, res) => {
  try {
    const { stateId, cityId } = req.params;
    const { name, description, rate } = req.body;
    const image = req.file ? req.file.filename : null;

    const state = await State.findById(stateId);
    if (!state) return res.status(404).json({ error: "State not found" });

    const city = state.cities.id(cityId);
    if (!city) return res.status(404).json({ error: "City not found" });

    city.places.push({ name, description, rate, image });
    await state.save();

    res.json({ message: "Place added successfully", city });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get cities of a State
exports.getCitiesByState = async (req, res) => {
  try {
    const { stateId } = req.params;
    const state = await State.findById(stateId);
    if (!state) return res.status(404).json({ error: "State not found" });

    res.json(state.cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get places of a City in a State
exports.getPlacesByCity = async (req, res) => {
  try {
    const { stateId, cityId } = req.params;
    const state = await State.findById(stateId);
    if (!state) return res.status(404).json({ error: "State not found" });

    const city = state.cities.id(cityId);
    if (!city) return res.status(404).json({ error: "City not found" });

    res.json(city.places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
