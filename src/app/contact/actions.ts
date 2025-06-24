"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function sendContactEmail(data: z.infer<typeof contactSchema>) {
  const validatedFields = contactSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { name, email, subject, message } = validatedFields.data;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587", 10),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Modern admin notification email
  const adminMailOptions = {
    from: `"VitaCrafter Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `New Contact: ${subject}`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Message</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; background-color: #f9fafb; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #5A809E 0%, #3A6073 100%); padding: 40px 20px; text-align: center; color: white; }
        .logo { font-size: 24px; font-weight: 700; letter-spacing: 0.5px; }
        .content { background: white; padding: 40px; }
        .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
        .message-box { background: #f8fafc; border-left: 4px solid #5A809E; padding: 16px; margin-top: 24px; }
        .divider { height: 1px; background: #e5e7eb; margin: 24px 0; }
        .info-item { display: flex; margin-bottom: 12px; }
        .info-label { font-weight: 600; color: #4b5563; width: 80px; }
        .info-value { color: #1f2937; }
        .btn { display: inline-block; padding: 12px 24px; background: #5A809E; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; margin-top: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">VitaCrafter</div>
          <h1 style="margin-top: 20px; font-weight: 600;">New Contact Message</h1>
        </div>
        
        <div class="content">
          <p style="font-size: 16px; color: #4b5563;">You've received a new message from the contact form:</p>
          
          <div style="margin-top: 32px;">
            <div class="info-item">
              <div class="info-label">From:</div>
              <div class="info-value">${name}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Email:</div>
              <div class="info-value">${email}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Subject:</div>
              <div class="info-value">${subject}</div>
            </div>
          </div>
          
          <div class="divider"></div>
          
          <h3 style="font-size: 18px; color: #1f2937; margin-bottom: 12px;">Message</h3>
          <div class="message-box">
            <p style="margin: 0; color: #374151; line-height: 1.6; white-space: pre-line;">${message}</p>
          </div>
          
          <div class="divider"></div>
          
          <a href="mailto:${email}" class="btn">Reply to ${name}</a>
        </div>
        
        <div class="footer">
          <p>This message was sent from your VitaCrafter contact form. &copy; ${new Date().getFullYear()} VitaCrafter</p>
        </div>
      </div>
    </body>
    </html>
    `,
  };

  // Modern user auto-reply email
  const autoReplyOptions = {
    from: `"VitaCrafter" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `We've received your message: ${subject}`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting us</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; background-color: #f9fafb; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #5A809E 0%, #3A6073 100%); padding: 40px 20px; text-align: center; color: white; border-radius: 8px 8px 0 0; }
        .logo { font-size: 24px; font-weight: 700; letter-spacing: 0.5px; }
        .content { background: white; padding: 40px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
        .message-box { background: #f8fafc; border-left: 4px solid #5A809E; padding: 16px; margin-top: 24px; border-radius: 4px; }
        .divider { height: 1px; background: #e5e7eb; margin: 24px 0; }
        .thank-you { font-size: 20px; color: #1f2937; font-weight: 600; margin-bottom: 16px; }
        .cta { background: #5A809E; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; display: inline-block; margin-top: 24px; font-weight: 500; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">VitaCrafter</div>
        </div>
        
        <div class="content">
          <div class="thank-you">Hello ${name},</div>
          <p style="color: #4b5563; line-height: 1.6;">Thank you for reaching out to VitaCrafter! We've received your message and our team will get back to you as soon as possible.</p>
          
          <div class="divider"></div>
          
          <p style="font-weight: 500; color: #1f2937;">Here's a copy of your message for your records:</p>
          
          <div class="message-box">
            <p style="margin: 0 0 8px 0; font-weight: 500; color: #1f2937;">Subject: ${subject}</p>
            <p style="margin: 0; color: #4b5563; line-height: 1.6; white-space: pre-line;">${message}</p>
          </div>
          
          <p style="color: #4b5563; line-height: 1.6; margin-top: 24px;">We typically respond within 24-48 hours. If you have any urgent inquiries, please don't hesitate to contact us directly.</p>
          
          <a href="mailto:${
            process.env.EMAIL_USER
          }" class="cta">Contact Us Again</a>
        </div>
        
        <div class="footer">
          <p>This is an automated message. Please do not reply directly to this email.</p>
          <p style="margin-top: 8px;">&copy; ${new Date().getFullYear()} VitaCrafter. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `,
    text: `Hello ${name},\n\nThank you for contacting VitaCrafter. We've received your message and will get back to you as soon as possible.\n\nHere's a copy of your message:\n\nSubject: ${subject}\nMessage:\n${message}\n\nBest regards,\nThe VitaCrafter Team`,
  };

  try {
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(autoReplyOptions),
    ]);
    return { success: "Message sent successfully!" };
  } catch (error) {
    console.error("Email sending error:", error);
    return { error: "Failed to send message. Please try again later." };
  }
}
