require('dotenv').config()
const express = require("express")
const cors = require("cors")
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const axios = require("axios")


// Routes
const driverRoutes = require("./routes/driverRoutes")
const userRoutes = require('./routes/router')
const vehicleRoutes = require('./routes/vehicleRoutes')
const packageRoutes = require('./routes/packageRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const tripRoutes = require('./routes/tripRoutes')
const placesRoutes = require('./routes/places')
const cabTypeRoutes = require("./routes/cabTypeRoutes");
const cabVehicleRoutes = require("./routes/cabVehicleRoutes");
const stateRoutes = require("./routes/stateRoutes")
const cityRoutes = require("./routes/cityRoutes")
const placeRoute = require("./routes/placeRoutes")
const tariffRoutes = require("./routes/tariffRoutes")
const cityTariffRoutes = require("./routes/cityTariffRoutes")
const contactRoutes = require("./routes/contactRoutes")




// Connect DB
require("./database/dbConnection")

const taxiServer = express()

// Update CORS configuration
taxiServer.use(cors({
  origin: "*", // ❌ This allows anyone, not secure for production
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
taxiServer.use(express.json())


// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

console.log(uploadsDir);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Serve static files from uploads directory
taxiServer.use('/uploads', express.static(uploadsDir))


// Routes
taxiServer.get("/", (req, res) => {
  res.status(200).send("<h1 style='color:red;'>Taxi Server is running 🚖</h1>")
})
taxiServer.post("/", (req, res) => {
  res.status(200).send("POST REQUEST received")
})



taxiServer.use("/", userRoutes)
taxiServer.use("/vehicles", vehicleRoutes)
taxiServer.use("/packages", packageRoutes)
taxiServer.use("/bookings", bookingRoutes)
taxiServer.use("/drivers", driverRoutes)
taxiServer.use("/trips", tripRoutes)
taxiServer.use("/places", placesRoutes)//external api of places list in booking form
taxiServer.use("/cabtypes", cabTypeRoutes);
taxiServer.use("/cabvehicles", cabVehicleRoutes);
taxiServer.use("/states",stateRoutes)
taxiServer.use("/city", cityRoutes)
taxiServer.use("/place", placeRoute)
taxiServer.use("/tariff", tariffRoutes)
taxiServer.use("/citytariff", cityTariffRoutes)
taxiServer.use("/contact", contactRoutes)





// Error handling middleware
taxiServer.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})

// Add this after your other middleware
taxiServer.use((error, req, res, next) => {
    console.error('Server Error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
});

const PORT = process.env.PORT || 5000
taxiServer.listen(PORT, () => {
  console.log(`🚀 Taxi server is running at http://localhost:${PORT}`)
})





