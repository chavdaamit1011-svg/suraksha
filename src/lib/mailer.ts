import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'reactamit6@gmail.com',
    pass: process.env.EMAIL_PASS || 'qfbrxxdnrdfptnhi',
  },
});

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"SURAKSHA Security" <${process.env.EMAIL_USER || 'reactamit6@gmail.com'}>`,
      to,
      subject,
      text: text || '',
      html: html || text,
    });
    console.log('Email sent successfully: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('Error sending email via Nodemailer:', error);
    return { success: false, error: error.message };
  }
}
