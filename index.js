require('dotenv').config()
const express = require("express")
const cors = require("cors")
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Routes
const driverRoutes = require("./routes/driverRoutes")
const userRoutes = require('./routes/router')
const vehicleRoutes = require('./routes/vehicleRoutes')
const packageRoutes = require('./routes/packageRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const tripRoutes = require('./routes/tripRoutes')

// Connect DB
require("./database/dbConnection")

const taxiServer = express()

// Update CORS configuration
taxiServer.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}))
taxiServer.use(express.json())


// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

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

// Error handling middleware
taxiServer.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})

const PORT = process.env.PORT || 5000
taxiServer.listen(PORT, () => {
  console.log(`🚀 Taxi server is running at http://localhost:${PORT}`)
})
