const nodemailer = require('nodemailer');

/**
 * Sends an email notification using configured SMTP credentials.
 * If Gmail is used, an App Password is required (Google Account -> Security -> App Passwords).
 */
const sendEmail = async ({ to, subject, html, text, bcc }) => {
  const companyEmail = process.env.COMPANY_EMAIL || 'daffodilhimalayan@gmail.com';
  const smtpUser = process.env.SMTP_USER || companyEmail;
  const smtpPass = process.env.SMTP_PASS;

  const isDummyPass = !smtpPass || smtpPass === 'your_app_password' || smtpPass === 'password';

  console.log(`[Email Dispatcher] Initiating email to: ${to} | Subject: "${subject}"`);

  if (isDummyPass) {
    console.warn(`\n===============================================================`);
    console.warn(`[EMAIL NOTICE] Real email delivery paused because SMTP_PASS is still placeholder ('${smtpPass || 'EMPTY'}').`);
    console.warn(`To send actual emails to users' inboxes from ${smtpUser}:`);
    console.warn(`1. Open your Google Account (daffodilhimalayan@gmail.com) -> Security`);
    console.warn(`2. Ensure 2-Step Verification is turned ON`);
    console.warn(`3. Go to 'App passwords' -> Generate a 16-character password`);
    console.warn(`4. Paste it into .env as: SMTP_PASS=your_16_char_password`);
    console.warn(`===============================================================\n`);
    
    // Return simulated success so user flow is uninterrupted
    return {
      success: false,
      simulated: true,
      message: 'Email prepared successfully. Configure Gmail App Password in .env for inbox delivery.'
    };
  }

  try {
    const isGmail = (process.env.SMTP_HOST && process.env.SMTP_HOST.includes('gmail')) || smtpUser.endsWith('@gmail.com');

    const transportConfig = isGmail
      ? {
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: smtpPass
          },
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 15000
        }
      : {
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT, 10) || 587,
          secure: process.env.SMTP_PORT === '465',
          auth: {
            user: smtpUser,
            pass: smtpPass
          },
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 15000
        };

    const transporter = nodemailer.createTransport(transportConfig);

    const mailOptions = {
      from: `"DAFFODIL HIMALAYAN" <${companyEmail}>`,
      to,
      subject,
      text: text || undefined,
      html
    };

    if (bcc) {
      mailOptions.bcc = bcc;
    }

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Service] Confirmation email delivered to ${to} (Message ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[Email Service Error] Failed to send email to ${to}:`, error.message);
    if (error.message.includes('535') || error.message.includes('BadCredentials')) {
      console.error(`[Email Diagnostic] Gmail rejected authentication. Please ensure a 16-character Google App Password (without spaces) is set in .env under SMTP_PASS.`);
    }
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail };
