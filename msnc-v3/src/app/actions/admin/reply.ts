'use server'

import { requireAdmin } from '@/lib/auth'
import { sendEmail } from '@/lib/email'

export async function sendReplyEmail(formData: FormData) {
  const { user: adminUser } = await requireAdmin()

  const to = formData.get('to') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string
  const originalMessage = formData.get('originalMessage') as string | undefined
  const senderName = formData.get('senderName') as string | undefined

  if (!to || !subject || !message) {
    throw new Error('Missing required fields: to, subject, or message')
  }

  const fromName = (adminUser as any)?.fullName || (adminUser as any)?.email || 'MSNC Admin'
  const fromEmail = process.env.SMTP_FROM || 'no-reply@mulengescholars.org'

  // Build the email body with the reply and original message context
  const textBody = `
Dear ${senderName || 'Sir/Madam'},

${message}

---
Best regards,
${fromName}
Mulenge Scholars Network Canada

--- Original Message ---
${originalMessage || ''}
`.trim()

  const htmlBody = `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <p>Dear ${senderName || 'Sir/Madam'},</p>
  <div style="margin: 16px 0; white-space: pre-wrap;">${escapeHtml(message)}</div>
  <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
  <p style="color: #666; font-size: 14px;">
    Best regards,<br />
    <strong>${escapeHtml(fromName)}</strong><br />
    Mulenge Scholars Network Canada
  </p>
  ${originalMessage ? `
  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
  <p style="color: #999; font-size: 12px; font-weight: bold;">Original Message</p>
  <div style="color: #666; font-size: 13px; white-space: pre-wrap;">${escapeHtml(originalMessage)}</div>
  ` : ''}
</div>
`.trim()

  try {
    await sendEmail({
      to,
      subject,
      text: textBody,
      html: htmlBody,
      from: `"${fromName}" <${fromEmail}>`,
    })

    return { success: true, message: 'Reply sent successfully' }
  } catch (error: any) {
    console.error('Failed to send reply email:', error)
    throw new Error(error?.message || 'Failed to send reply email')
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;')
}

