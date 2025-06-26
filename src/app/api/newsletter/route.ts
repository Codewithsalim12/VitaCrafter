import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587", 10),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send thank you email to subscriber
    await transporter.sendMail({
      from: `VitaCrafter <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for subscribing to VitaCrafter!",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#f9fafb;border-radius:8px;">
          <h2 style="color:#4f46e5;">Welcome to VitaCrafter!</h2>
          <p>Thank you for subscribing to our newsletter. 🎉</p>
          <p>You'll now receive the latest tips, templates, and AI features directly to your inbox.</p>
          <p style="margin-top:32px;font-size:14px;color:#6b7280;">If you did not subscribe, you can ignore this email.</p>
          <hr style="margin:24px 0;" />
          <div style="font-size:12px;color:#9ca3af;">&copy; ${new Date().getFullYear()} VitaCrafter</div>
        </div>
      `,
    });

    // Send notification email to admin
    await transporter.sendMail({
      from: `VitaCrafter <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New newsletter subscription",
      html: `<div style='font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#f9fafb;border-radius:8px;'>
        <h2 style='color:#4f46e5;'>New Newsletter Subscription</h2>
        <p>A new user has subscribed to the newsletter:</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr style='margin:24px 0;' />
        <div style='font-size:12px;color:#9ca3af;'>&copy; ${new Date().getFullYear()} VitaCrafter</div>
      </div>`
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}
