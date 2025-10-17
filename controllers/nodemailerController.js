const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "santos.travel", // from cPanel info
  port: 465, // 465 for SSL, or 587 for TLS
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER, // from cPanel
    pass: process.env.EMAIL_PASS, // same as in cPanel
  },
});

//console.log("Nodemailer transporter configured:", transporter.options);

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
      from: '"FlyMallu" <' + process.env.EMAIL_USER + ">", // sender address
      to: process.env.ADMIN_MAIL,
      subject: "New Taxi Booking Request",
      html: emailContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Admin Email sent successfully:", info.messageId);

    const customerEmailContent = `
      <h2>✅ Booking Confirmation</h2>
      <p>Dear ${bookingData.username},</p>
      <p>Thank you for choosing <strong>FlyMallu Taxi Service</strong>!</p>
      <p>Your booking request has been received successfully. Our team will contact you shortly to confirm your ride details.</p>

      <h3>📋 Booking Details</h3>
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

      <p>We appreciate your business!</p>
      <p>Best regards,<br><strong>FlyMallu Team</strong></p>
    `;

    // Only send to customer if they have provided an email
    if (bookingData.email) {
      const customerMailOptions = {
        from: `"FlyMallu" <${process.env.EMAIL_USER}>`,
        to: "bookingData.email", // customer's email from form
        subject: "✅ Booking Confirmation - FlyMallu Taxi",
        html: customerEmailContent,
      };

      await transporter.sendMail(customerMailOptions);
      console.log("📩 Confirmation email sent to customer");
    }
    return true;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return false;
  }
};

// =============================
// 📧 CONTACT FORM EMAIL FUNCTION
// =============================
const sendContactEmail = async (contactData) => {
  try {
    const { name, email, subject, message } = contactData;

    if (!name || !email || !message) {
      console.log("❌ Missing contact form fields");
      return false;
    }

    // ✅ Notify Admin
    const adminMailOptions = {
      from: `"FlyMallu Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_MAIL,
      subject: `📩 New Contact Message: ${subject || "No Subject"}`,
      html: `
        <h2>📨 New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject || "No subject"}</p>
        <p><b>Message:</b><br>${message}</p>
        <hr/>
        <p>Sent from <strong>FlyMallu Contact Page</strong></p>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    console.log("📧 Admin notified of new contact message");

    // ✅ Auto-reply to user
    const replyMailOptions = {
      from: `"FlyMallu Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ Thank you for contacting FlyMallu!",
      html: `
        <h3>Hi ${name},</h3>
        <p>Thank you for reaching out to <strong>FlyMallu Taxi Service</strong>.</p>
        <p>We’ve received your message and will get back to you soon.</p>
        <hr/>
        <p><em>This is an automated reply — please do not reply directly.</em></p>
      `,
    };

    await transporter.sendMail(replyMailOptions);
    console.log("📩 Auto-reply sent to contact user");

    return true;
  } catch (error) {
    console.error("❌ Contact email failed:", error);
    return false;
  }
};

module.exports = { sendBookingEmail, sendContactEmail };
