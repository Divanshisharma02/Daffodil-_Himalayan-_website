const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { sendEmail } = require('../utils/emailService');

async function runTest() {
  console.log('Testing Automated Travel Query Email Dispatcher...');
  console.log('Using SMTP User:', process.env.SMTP_USER);
  console.log('Using SMTP Host:', process.env.SMTP_HOST);
  console.log('Using SMTP Port:', process.env.SMTP_PORT);

  const sampleCustomer = {
    name: 'Vikram Singh',
    email: 'vikram.singh.traveler@example.com',
    phone: '+91 98160 54321',
    subject: 'Spiti Valley & Cold Desert Adventure',
    message: 'We are a group of 4 looking for a 7-day Spiti Valley expedition with private 4x4 vehicle and homestays.'
  };

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Travel Query Confirmation - DAFFODIL HIMALAYAN</title>
    </head>
    <body style="margin: 0; padding: 20px; background-color: #f7f5ef; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1c120c;">
      <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border: 2px solid #d4af37; border-radius: 10px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0b3d2e 0%, #198754 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-family: 'Georgia', serif; font-size: 26px;">DAFFODIL HIMALAYAN</h1>
          <p style="color: #ffd700; margin: 6px 0 0 0; font-size: 13px; font-weight: bold;">Govt Reg: 11-2279/2024-DTO-SML</p>
        </div>
        <div style="padding: 32px 28px;">
          <p>Dear <strong>${sampleCustomer.name}</strong>,</p>
          <p>Greetings from <strong>DAFFODIL HIMALAYAN</strong>!</p>
          <p>Thank you for sharing your travel requirements with us. We’re pleased to confirm that your query has been <strong>successfully submitted</strong> and is now with our travel team.</p>
          <p>Our team will carefully review your requirements and reach out to you <strong>within some time</strong> with the appropriate information, suggestions, and next steps for your journey.</p>
          <p>We look forward to helping you create a memorable travel experience, whether it’s a Himalayan getaway, family vacation, pilgrimage, adventure, or a customized holiday.</p>
          
          <div style="background-color: #fdfbf7; border-left: 5px solid #d4af37; padding: 18px 20px; margin: 24px 0;">
            <h3 style="margin: 0 0 10px 0; color: #0b3d2e;">Query Submitted:</h3>
            <p><strong>Customer:</strong> ${sampleCustomer.name}<br>
            <strong>Phone:</strong> ${sampleCustomer.phone}<br>
            <strong>Subject:</strong> ${sampleCustomer.subject}<br>
            <strong>Details:</strong> ${sampleCustomer.message}</p>
          </div>
          
          <p>If you need to share any additional information while we review your request, please feel free to reply to this email.</p>
          <p>Thank you for choosing <strong>DAFFODIL HIMALAYAN</strong>.</p>
          <p style="color: #198754; font-weight: bold;"><em>Explore the Wonderland with Pride.</em></p>
          
          <div style="border-top: 1px solid #eee; padding-top: 18px; font-size: 13px; color: #555;">
            <p>Warm regards,<br>
            <strong>Team Daffodil Himalayan</strong><br>
            DAFFODIL HIMALAYAN<br>
            Govt Reg: 11-2279/2024-DTO-SML<br>
            Tour & Travel Agency<br>
            Shimla, Himachal Pradesh</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const result = await sendEmail({
    to: sampleCustomer.email,
    subject: 'Travel Query Confirmation - DAFFODIL HIMALAYAN',
    html: emailHtml
  });

  console.log('Dispatcher Result:', result);
}

runTest();
