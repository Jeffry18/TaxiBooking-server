const Driver = require("../models/driver")

exports.createDriver = async (req, res) => {
  try {
    // Debug: log what we receive
    console.log('createDriver - req.body:', req.body);
    console.log('createDriver - req.file:', req.file);
    
    // Handle file upload - multer adds file info to req.file
    const driverData = { ...req.body };
    if (req.file) {
      driverData.image = req.file.filename; // Store just the filename
      console.log('File uploaded successfully, filename:', req.file.filename);
    } else {
      console.log('No file uploaded');
    }
    
    console.log('Final driver data to save:', driverData);
    
    const driver = new Driver(driverData)
    const savedDriver = await driver.save()
    console.log('Driver saved successfully:', savedDriver);
    res.status(201).json(savedDriver)
  } catch (err) {
    console.error('Error creating driver:', err);
    res.status(400).json({ message: err.message })
  }
}

exports.getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find()
    res.json(drivers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).populate("vehicles")
    if (!driver) return res.status(404).json({ error: "Driver not found" })
    res.json(driver)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate('vehicles')

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" })
    }

    res.json(driver)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    // If driver has an image, delete it from uploads
    if (driver.image) {
      const imagePath = path.join(__dirname, "..", "uploads", driver.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting driver image:", err.message);
        }
      });
    }

    res.json({ message: "Driver deleted successfully" });
  } catch (err) {
    console.error("Delete driver error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
