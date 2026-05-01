import nodemailer from 'nodemailer'

const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const SMTP_FROM = process.env.SMTP_FROM || 'no-reply@mulengescholars.org'
const SMTP_SECURE = process.env.SMTP_SECURE === 'true'

export function getTransporter() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      'SMTP configuration missing. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables.'
    )
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })
}

export interface SendEmailOptions {
  to: string
  subject: string
  text: string
  html?: string
  from?: string
}

export async function sendEmail(options: SendEmailOptions) {
  const transporter = getTransporter()

  const result = await transporter.sendMail({
    from: options.from || SMTP_FROM,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  })

  return result
}

