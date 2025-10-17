const { sendContactEmail } = require("./nodemailerController"); // your existing Nodemailer file

// POST /api/contact
const handleContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const success = await sendContactEmail({ name, email, subject, message });

    if (success) {
      return res.status(200).json({ success: true, message: "Message sent successfully!" });
    } else {
      return res.status(500).json({ success: false, message: "Failed to send message." });
    }
  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { handleContactForm };
