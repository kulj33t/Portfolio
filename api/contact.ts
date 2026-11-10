import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { config as loadEnv } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  loadEnv({ path: ".env.local" });
}

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_BODY_SIZE = 12 * 1024;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

function getString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string): boolean {
  if (email.length > MAX_EMAIL_LENGTH || email.includes("..")) {
    return false;
  }

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;

  return emailRegex.test(email);
}

function hasControlCharacters(
  value: string,
  allowMessageFormatting = false,
): boolean {
  for (const character of value) {
    const code = character.charCodeAt(0);

    if (code === 127) return true;
    if (code >= 32) continue;

    if (allowMessageFormatting && (code === 9 || code === 10 || code === 13)) {
      continue;
    }

    return true;
  }

  return false;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function getRequestBody(body: unknown): ContactPayload | null {
  let parsedBody = body;

  if (typeof parsedBody === "string") {
    try {
      parsedBody = JSON.parse(parsedBody);
    } catch {
      return null;
    }
  }

  if (
    !parsedBody ||
    typeof parsedBody !== "object" ||
    Array.isArray(parsedBody)
  ) {
    return null;
  }

  return parsedBody as ContactPayload;
}

function getOwnerEmailHtml(
  name: string,
  email: string,
  message: string,
): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `
    <!DOCTYPE html>
    <html>
      <body style="margin:0;padding:32px 16px;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#202124;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                style="max-width:600px;background:#ffffff;border:1px solid #e8e8e8;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:28px 32px;background:#171717;color:#ffffff;">
                    <p style="margin:0 0 8px;font-size:13px;color:#bdbdbd;">PORTFOLIO CONTACT</p>
                    <h1 style="margin:0;font-size:23px;font-weight:600;">New message received</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px;">
                    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#555;">
                      Someone has reached out through your portfolio website.
                    </p>

                    <p style="margin:0 0 6px;font-size:12px;color:#888;">NAME</p>
                    <p style="margin:0 0 20px;font-size:16px;font-weight:600;">${safeName}</p>

                    <p style="margin:0 0 6px;font-size:12px;color:#888;">EMAIL ADDRESS</p>
                    <p style="margin:0 0 24px;font-size:16px;">
                      <a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:none;">${safeEmail}</a>
                    </p>

                    <p style="margin:0 0 10px;font-size:12px;color:#888;">MESSAGE</p>
                    <div style="padding:18px;background:#f7f7f8;border-radius:8px;font-size:15px;line-height:1.7;color:#333;">
                      ${safeMessage}
                    </div>

                    <p style="margin:28px 0 0;font-size:13px;line-height:1.6;color:#777;">
                      You can reply directly to this email to respond to the visitor.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 32px;border-top:1px solid #eeeeee;font-size:12px;color:#999;">
                    Sent from kuljeet.online
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function getVisitorEmailHtml(name: string): string {
  const safeName = escapeHtml(name);

  return `
    <!DOCTYPE html>
    <html>
      <body style="margin:0;padding:32px 16px;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#202124;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                style="max-width:600px;background:#ffffff;border:1px solid #e8e8e8;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:32px;background:#171717;color:#ffffff;">
                    <p style="margin:0 0 10px;font-size:13px;color:#bdbdbd;">KULJEET SINGH</p>
                    <h1 style="margin:0;font-size:25px;font-weight:600;">Thanks for reaching out!</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px;">
                    <p style="margin:0 0 20px;font-size:16px;">Hi ${safeName},</p>

                    <p style="margin:0 0 16px;font-size:15px;line-height:1.8;color:#555;">
                      Thank you for getting in touch through my portfolio. I've successfully received your message, and I appreciate you taking the time to connect.
                    </p>

                    <p style="margin:0 0 28px;font-size:15px;line-height:1.8;color:#555;">
                      I'll review your message and get back to you as soon as possible. Looking forward to connecting with you!
                    </p>

                    <p style="margin:0 0 5px;font-size:15px;color:#555;">Best regards,</p>
                    <p style="margin:0;font-size:18px;font-weight:600;color:#171717;">Kuljeet Singh</p>
                    <p style="margin:5px 0 20px;font-size:13px;color:#777;">Full Stack Developer</p>

                    <a href="https://kuljeet.online"
                      style="display:inline-block;padding:11px 18px;background:#171717;color:#ffffff;text-decoration:none;border-radius:6px;font-size:13px;">
                      Visit my portfolio
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 32px;border-top:1px solid #eeeeee;font-size:12px;line-height:1.6;color:#999;">
                    This is an automatic confirmation that your message was received.
                    <br />© ${new Date().getFullYear()} Kuljeet Singh
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  const contentType = req.headers["content-type"];

  if (
    typeof contentType !== "string" ||
    !contentType.toLowerCase().includes("application/json")
  ) {
    return res.status(415).json({
      success: false,
      message: "Please submit valid JSON.",
    });
  }

  const contentLength = Number(req.headers["content-length"]);

  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_SIZE) {
    return res.status(413).json({
      success: false,
      message: "Your submission is too large.",
    });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const ownerEmail = process.env.CONTACT_TO_EMAIL?.trim();
    const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim();

    if (!apiKey || !ownerEmail || !fromEmail || !isValidEmail(ownerEmail)) {
      console.error("Contact API configuration is incomplete or invalid.");

      return res.status(500).json({
        success: false,
        message: "Contact service is temporarily unavailable.",
      });
    }

    const payload = getRequestBody(req.body);

    if (!payload) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body.",
      });
    }

    if (getString(payload.website)) {
      return res.status(200).json({
        success: true,
        message: "Your message has been received.",
      });
    }

    const name = getString(payload.name);
    const email = getString(payload.email);
    const message = getString(payload.message);

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    if (
      name.length > MAX_NAME_LENGTH ||
      email.length > MAX_EMAIL_LENGTH ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      return res.status(400).json({
        success: false,
        message: "One or more fields exceed the allowed length.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    if (
      hasControlCharacters(name) ||
      hasControlCharacters(email) ||
      hasControlCharacters(message, true)
    ) {
      return res.status(400).json({
        success: false,
        message: "Your message contains invalid characters.",
      });
    }

    const resend = new Resend(apiKey);

    const ownerResult = await resend.emails.send({
      from: fromEmail,
      to: [ownerEmail],
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      html: getOwnerEmailHtml(name, email, message),
      text: [
        "New message received through your portfolio.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
        "",
        "Reply directly to this email to respond.",
      ].join("\n"),
    });

    if (ownerResult.error) {
      console.error("Owner notification failed:", ownerResult.error);

      return res.status(502).json({
        success: false,
        message: "We couldn't deliver your message. Please try again later.",
      });
    }

    const thankYouResult = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: "Thank you for reaching out!",
      html: getVisitorEmailHtml(name),
      text: [
        `Hi ${name},`,
        "",
        "Thank you for reaching out through my portfolio!",
        "I've successfully received your message and appreciate you taking the time to connect.",
        "",
        "I'll review your message and get back to you as soon as possible.",
        "",
        "Best regards,",
        "Kuljeet Singh",
        "Full Stack Developer",
        "https://kuljeet.online",
      ].join("\n"),
    });

    if (thankYouResult.error) {
      console.error("Visitor confirmation failed:", thankYouResult.error);
    }

    return res.status(200).json({
      success: true,
      message: "Your message has been received successfully.",
      confirmationSent: !thankYouResult.error,
    });
  } catch (error) {
    console.error("Unexpected contact API error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
}
