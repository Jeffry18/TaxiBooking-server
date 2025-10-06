const axios = require("axios");

// ⚡ Replace these with your actual values
const WHATSAPP_API_URL =
  "https://graph.facebook.com/v22.0/740175009189460/messages";
const WHATSAPP_TOKEN =
  "EAAQIPZBIMbX4BPkqaMCvDnOl3gfp3xikDIlraeaPj0Yfd1BML9aEG3QZB8wrnZC1zOBDLcECQSrd9HHZCZAJi1gBp02vmjAre1PjWsOg6ZB1hxBUDv4F1j3ozqoAbx8Qw8QhxTZAaqKgs0tNYMZB54X19n0QZCfy1mqk1myzFVNfwXJCdAuCC2qTbhuX3LOKi6Xh3WwZDZD"; // From Meta Business
const ADMIN_PHONE = "919037456237"; // Admin’s number (with country code, no + sign)

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
