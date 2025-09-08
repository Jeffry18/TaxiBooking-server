const express = require("express");
const axios = require("axios");
const router = express.Router();

// Fetch Kerala places from Overpass API
router.get("/kerala-places", async (req, res) => {
  try {
    // Overpass query: get all "place" nodes inside Kerala
    const overpassQuery = `
      [out:json];
      area[name="Kerala"]->.a;
      node(area.a)[place];
      out;
    `;

    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      overpassQuery,
      { headers: { "Content-Type": "text/plain" } }
    );

    // Extract only name, lat, lon
    const places = response.data.elements
      .filter((el) => el.tags && el.tags.name) // only places with names
      .map((el) => ({
        name: el.tags.name,
        lat: el.lat,
        lon: el.lon,
        type: el.tags.place || "unknown"
      }));

    res.json(places);
  } catch (error) {
    console.error("Error fetching places:", error.message);
    res.status(500).json({ message: "Failed to fetch Kerala places" });
  }
});

module.exports = router;
