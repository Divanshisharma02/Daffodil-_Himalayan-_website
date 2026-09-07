const { logInquiryToCsv, getInquiriesFromCsv } = require('../utils/csvLogger');
const { sendEmail } = require('../utils/emailService');

const submitInquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, interest, message, sourcePage } = req.body;

    if (!name || (!email && !phone)) {
      return res.status(400).json({ success: false, message: 'Name and contact info (email or phone) are required.' });
    }

    const inquiryObj = {
      name,
      email: email || 'N/A',
      phone: phone || 'N/A',
      subject: subject || interest || 'Expedition Inquiry',
      message: message || 'Customer expressed interest in travel package/destination.',
      sourcePage: sourcePage || 'Website Form',
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    // Save to Excel CSV file instantly
    logInquiryToCsv(inquiryObj);

    let emailSent = false;
    let emailFeedback = null;

    // Send confirmation email to the user who submitted the query
    if (email && email !== 'N/A' && email.includes('@')) {
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Travel Query Confirmation - DAFFODIL HIMALAYAN</title>
        </head>
        <body style="margin: 0; padding: 20px; background-color: #f7f5ef; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1c120c;">
          <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border: 2px solid #d4af37; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06);">
            
            <!-- Header Banner -->
            <div style="background: linear-gradient(135deg, #0b3d2e 0%, #198754 100%); padding: 30px 20px; text-align: center; border-bottom: 3px solid #d4af37;">
              <h1 style="color: #ffffff; margin: 0; font-family: 'Georgia', serif; font-size: 26px; letter-spacing: 1.5px;">DAFFODIL HIMALAYAN</h1>
              <p style="color: #ffd700; margin: 6px 0 0 0; font-size: 13px; letter-spacing: 1px; font-weight: 600;">Govt Reg: 11-2279/2024-DTO-SML</p>
              <p style="color: #e0f2e9; margin: 3px 0 0 0; font-size: 12px;">Shimla, Himachal Pradesh</p>
            </div>

            <!-- Email Body Content -->
            <div style="padding: 32px 28px;">
              <p style="font-size: 16px; line-height: 1.5; margin: 0 0 16px 0; color: #1c120c;">
                Dear <strong>${name}</strong>,
              </p>
              
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; color: #1c120c;">
                Greetings from <strong>DAFFODIL HIMALAYAN</strong>!
              </p>
              
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; color: #1c120c;">
                Thank you for sharing your travel requirements with us. We’re pleased to confirm that your query has been <strong>successfully submitted</strong> and is now with our travel team.
              </p>
              
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; color: #1c120c;">
                Our team will carefully review your requirements and reach out to you <strong>within some time</strong> with the appropriate information, suggestions, and next steps for your journey.
              </p>
              
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 22px 0; color: #1c120c;">
                We look forward to helping you create a memorable travel experience, whether it’s a Himalayan getaway, family vacation, pilgrimage, adventure, or a customized holiday.
              </p>
              
              <!-- Query Details Box -->
              <div style="background-color: #fdfbf7; border: 1px solid #e8dfc8; border-left: 5px solid #d4af37; border-radius: 6px; padding: 18px 20px; margin: 24px 0;">
                <h3 style="margin: 0 0 12px 0; color: #0b3d2e; font-size: 16px; font-family: 'Georgia', serif; font-weight: bold; border-bottom: 1px solid rgba(212,175,55,0.25); padding-bottom: 6px;">
                  Query Submitted:
                </h3>
                <table style="width: 100%; font-size: 14px; line-height: 1.6; color: #33261d; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 4px 0; width: 140px; font-weight: bold; vertical-align: top;">Customer Name:</td>
                    <td style="padding: 4px 0; vertical-align: top;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: bold; vertical-align: top;">Contact Phone:</td>
                    <td style="padding: 4px 0; vertical-align: top;">${phone || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: bold; vertical-align: top;">Email Address:</td>
                    <td style="padding: 4px 0; vertical-align: top;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: bold; vertical-align: top;">Subject / Tour:</td>
                    <td style="padding: 4px 0; vertical-align: top; color: #198754; font-weight: 600;">${inquiryObj.subject}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: bold; vertical-align: top;">Requirements:</td>
                    <td style="padding: 4px 0; vertical-align: top; white-space: pre-line;">${inquiryObj.message}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: bold; vertical-align: top;">Submitted At:</td>
                    <td style="padding: 4px 0; vertical-align: top; color: #666;">${inquiryObj.submittedAt}</td>
                  </tr>
                </table>
              </div>
              
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; color: #1c120c;">
                If you need to share any additional information while we review your request, please feel free to reply to this email.
              </p>
              
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; color: #1c120c;">
                Thank you for choosing <strong>DAFFODIL HIMALAYAN</strong>.
              </p>
              
              <p style="font-size: 16px; line-height: 1.6; font-weight: bold; color: #198754; margin: 20px 0 28px 0; font-style: italic;">
                Explore the Wonderland with Pride.
              </p>
              
              <!-- Signature Block -->
              <div style="border-top: 1px solid #eee5d3; padding-top: 18px; font-size: 14px; line-height: 1.5; color: #444;">
                <p style="margin: 0; color: #555;">Warm regards,</p>
                <p style="margin: 4px 0 0 0; font-weight: bold; color: #1c120c; font-size: 15px;">Team Daffodil Himalayan</p>
                <p style="margin: 2px 0 0 0; font-weight: bold; color: #198754; font-size: 14px;">DAFFODIL HIMALAYAN</p>
                <p style="margin: 2px 0 0 0; font-size: 12px; color: #666;">Govt Reg: 11-2279/2024-DTO-SML</p>
                <p style="margin: 2px 0 0 0; font-size: 12px; color: #666;">Tour & Travel Agency</p>
                <p style="margin: 2px 0 0 0; font-size: 12px; color: #666;">Shimla, Himachal Pradesh</p>
                <p style="margin: 6px 0 0 0; font-size: 12px; color: #888;">
                  Website: daffodilhimalayan.com | WhatsApp: +91 8219527240
                </p>
              </div>
            </div>

          </div>
        </body>
        </html>
      `;

      const emailText = `Dear ${name},

Greetings from DAFFODIL HIMALAYAN!

Thank you for sharing your travel requirements with us. We’re pleased to confirm that your query has been successfully submitted and is now with our travel team.

Our team will carefully review your requirements and reach out to you within some time with the appropriate information, suggestions, and next steps for your journey.

We look forward to helping you create a memorable travel experience, whether it’s a Himalayan getaway, family vacation, pilgrimage, adventure, or a customized holiday.

Query Submitted:
- Customer Name: ${name}
- Contact Phone: ${phone || 'Not provided'}
- Email Address: ${email}
- Subject / Tour: ${inquiryObj.subject}
- Requirements:
${inquiryObj.message}
- Submitted At: ${inquiryObj.submittedAt}

If you need to share any additional information while we review your request, please feel free to reply to this email.

Thank you for choosing DAFFODIL HIMALAYAN.

Explore the Wonderland with Pride.

Warm regards,
Team Daffodil Himalayan
DAFFODIL HIMALAYAN
Govt Reg: 11-2279/2024-DTO-SML
Tour & Travel Agency
Shimla, Himachal Pradesh
`;

      const dispatchResult = await sendEmail({
        to: email,
        subject: 'Travel Query Confirmation - DAFFODIL HIMALAYAN',
        text: emailText,
        html: emailHtml,
        bcc: process.env.COMPANY_EMAIL || 'daffodilhimalayan@gmail.com'
      });

      emailSent = dispatchResult.success;
      emailFeedback = dispatchResult.message || dispatchResult.error || null;
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! Your travel query has been successfully submitted. A confirmation email has been dispatched to your email address.',
      emailSent,
      emailFeedback,
      inquiry: inquiryObj
    });
  } catch (err) {
    console.error('[Inquiry Controller Error]:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getInquiries = (req, res) => {
  try {
    const inquiries = getInquiriesFromCsv();
    res.json({ success: true, count: inquiries.length, inquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { submitInquiry, getInquiries };
