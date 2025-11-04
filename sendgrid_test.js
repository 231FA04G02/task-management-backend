// backend/sendgrid_test.js
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

async function testSend() {
  if (!process.env.SENDGRID_API_KEY) {
    return console.error("SENDGRID_API_KEY not set in .env");
  }
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: process.env.TEST_TO || "your_test_recipient@example.com",
    from: process.env.SENDGRID_FROM || "your_verified_sender@example.com",
    subject: "Test: SendGrid delivery check",
    text: "This is a simple test email from SendGrid to verify delivery. If you don't get it, check SendGrid Activity & Suppressions.",
    html: "<p>This is a simple test email from SendGrid to verify delivery.</p>"
  };

  try {
    const res = await sgMail.send(msg);
    console.log("SendGrid send() returned:", res);
    console.log("Check SendGrid Activity for message details.");
  } catch (err) {
    // detailed error logging
    console.error("SendGrid error:");
    if (err.response && err.response.body) {
      console.error(JSON.stringify(err.response.body, null, 2));
    } else {
      console.error(err.toString());
    }
  }
}

testSend();
