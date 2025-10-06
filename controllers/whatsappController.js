const axios = require("axios");

// ⚡ Replace these with your actual values
const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL;
const WHATSAPP_TOKEN = process.env.WHATSAPP_API_TOKEN;
const ADMIN_PHONE = process.env.ADMIN_NUMBER; // Admin’s number (with country code, no + sign)

console.log("done");

exports.sendWhatsAppMessage = async (bookingData) => {
  try {
    const message = `
📢 New Booking Enquiry
━━━━━━━━━━━━━━━━━━━━
👤 Name: ${bookingData.username}
📞 Phone: ${bookingData.phoneNumber}
📍 Pickup: ${bookingData.pickup}
🏁 Drop: ${bookingData.drop}
🚖 Cab Type: ${bookingData.cabType}
👥 Passengers: ${bookingData.passengerCount}
📅 Date: ${bookingData.date}
⏰ Time: ${bookingData.time}
🛑 Extra Stops: ${
      bookingData.extraStops.length ? bookingData.extraStops.join(", ") : "None"
    }
━━━━━━━━━━━━━━━━━━━━
    `;
    console.log("Sending WhatsApp message:", message);

    await axios.post(
      WHATSAPP_API_URL,
      {
        messaging_product: "whatsapp",
        to: ADMIN_PHONE,
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ WhatsApp message sent successfully!");
  } catch (err) {
    console.error(
      "❌ Error sending WhatsApp message:",
      err.response?.data || err.message
    );
  }
};
