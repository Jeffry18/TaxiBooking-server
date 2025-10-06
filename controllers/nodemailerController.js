const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const sendBookingEmail = async (bookingData) => {
  try {
    const emailContent = `

<h2>📢 New Booking Enquiry</h2>
<p><strong>━━━━━━━━━━━━━━━━━━━━</strong></p>
<ul>
    <li><strong>👤 Name:</strong> ${bookingData.username}</li>
    <li><strong>📞 Phone:</strong> ${bookingData.phoneNumber}</li>
    <li><strong>📍 Pickup:</strong> ${bookingData.pickup}</li>
    <li><strong>🏁 Drop:</strong> ${bookingData.drop}</li>
    <li><strong>🚖 Cab Type:</strong> ${bookingData.cabType?.name}</li>
    <li><strong>👥 Passengers:</strong> ${bookingData.passengerCount}</li>
    <li><strong>📅 Date:</strong> ${bookingData.date}</li>
    <li><strong>⏰ Time:</strong> ${bookingData.time}</li>
    <li><strong>🛑 Extra Stops:</strong> ${
            bookingData.extraStops.length ? bookingData.extraStops.join(", ") : "None"
          }</li>
</ul>
<p><strong>━━━━━━━━━━━━━━━━━━━━</strong></p>
        `;
    

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_MAIL,
      subject: "New Taxi Booking Request",
      html: emailContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return false;
  }
};

module.exports = { sendBookingEmail };
