require('dotenv').config({ path: './.env' });
const nodemailer = require('nodemailer');

async function testEmail() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log("Transporter created with:", process.env.SMTP_USER);

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, 
      subject: "Test Email from Expense Tracker",
      text: "This is a test email.",
    });

    console.log("Success! Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

testEmail();
