const CabType = require("../models/cabType");



// Get all cab types
const getCabTypes = async (req, res) => {
  try {
    const cabTypes = await CabType.find();
    res.json(cabTypes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cab types", error: err.message });
  }
};

// Create cab type
const createCabType = async (req, res) => {
  try {
    const cabData = { ...req.body };


    if (req.files && req.files.length > 0) {
          cabData.images = req.files.map(file => file.filename); // store array of filenames
          console.log("Uploaded cab images:", cabData.images);
        } else {
          cabData.images = [];
          console.log("No cab images uploaded");
        }
    
        const cab = new CabType(cabData);
        await cab.save();
        console.log("cabtype saved successfully:", cab);
    
        res.status(201).json(cab);
      } catch (err) {
        console.error("Error creating cab:", err);
        res.status(400).json({ message: "Error creating cab", error: err.message });
      }
};

// Update cab type
// const updateCabType = async (req, res) => {
//   try {
//     const updated = await CabType.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ message: "Cab type not found" });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ message: "Error updating cab type", error: err.message });
//   }
// };

// Delete cab type
const deleteCabType = async (req, res) => {
  try {
    const deleted = await CabType.findByIdAndDelete(req.params.id);
    if (!deleted){
       return res.status(404).json({ message: "Cab type not found" });}
    return res.json({ message: "Cab type deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting cab type", error: err.message });
  }
};

module.exports = { getCabTypes, createCabType, deleteCabType };
