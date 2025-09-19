const State = require("../models/state");

// Add a new state
const addState = async (req, res) => {
  try {
    const { name, description } = req.body;
    let image = null;

    if (req.file) {
      image = req.file.filename; // multer saves filename
    }

    const newState = new State({
      name,
      description,
      image,
    });

    await newState.save();
    res.status(201).json(newState);
  } catch (error) {
    console.error("Error adding state:", error);
    res.status(500).json({ message: "Error adding state", error: error.message });
  }
};

// Get all states
const getStates = async (req, res) => {
  try {
    const states = await State.find();
    res.status(200).json(states);
  } catch (error) {
    console.error("Error fetching states:", error);
    res.status(500).json({ message: "Error fetching states", error: error.message });
  }
};

// Delete a state by ID
const deleteState = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await State.findByIdAndDelete(id);

    if (!state) {
      return res.status(404).json({ error: "State not found" });
    }

    // If state has an image, delete it from uploads folder
    if (state.image) {
      const imagePath = path.join(__dirname, "..", "uploads", state.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image file:", err.message);
        }
      });
    }

    res.json({ message: "State deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addState,
  getStates,
  deleteState,
};
