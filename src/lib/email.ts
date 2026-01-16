import nodemailer from "nodemailer";

type EmailPayload = {
  to?: string;
  subject: string;
  text: string;
  html?: string;
};

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
  from: process.env.SMTP_FROM,
  to: process.env.SMTP_TO,
};

const hasSMTP =
  !!smtpConfig.host &&
  !!smtpConfig.port &&
  !!smtpConfig.user &&
  !!smtpConfig.pass &&
  !!smtpConfig.from;

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: EmailPayload): Promise<{ sent: boolean; stub: boolean }> {
  if (!hasSMTP) {
    console.info("Email stub (SMTP env not set)", { to, subject, text });
    return { sent: false, stub: true };
  }

  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.port === 465,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
  });

  await transporter.sendMail({
    from: smtpConfig.from,
    to: to ?? smtpConfig.to ?? smtpConfig.from,
    subject,
    text,
    html,
  });

  return { sent: true, stub: false };
}

