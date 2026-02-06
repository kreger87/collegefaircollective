import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, organization, interest } = req.body;

  // At minimum we need an email
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Build email content based on what fields are provided
  let subject = 'New Contact Form Submission';
  let htmlContent = '<h2>New Contact Form Submission</h2>';

  if (name) {
    subject = `New Contact: ${name}`;
    htmlContent += `<p><strong>Name:</strong> ${name}</p>`;
  }

  htmlContent += `<p><strong>Email:</strong> ${email}</p>`;

  if (organization) {
    htmlContent += `<p><strong>Organization:</strong> ${organization}</p>`;
  }

  if (interest) {
    htmlContent += `<p><strong>Interest:</strong> ${interest}</p>`;
  }

  if (message) {
    htmlContent += `<p><strong>Message:</strong></p><p>${message}</p>`;
  }

  try {
    await resend.emails.send({
      from: 'forms@collegefaircollective.org',
      to: 'info@collegefaircollaborative.org',
      replyTo: email,
      subject: subject,
      html: htmlContent,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
