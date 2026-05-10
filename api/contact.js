const receiverEmail = process.env.CONTACT_TO_EMAIL || 'damianmilesdavid@gmail.com'
const senderEmail = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>'

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const { email, message, name } = request.body || {}

  if (!name || !email || !message) {
    return response.status(400).json({ error: 'Name, email, and message are required.' })
  }

  if (!process.env.RESEND_API_KEY) {
    return response.status(500).json({ error: 'Missing RESEND_API_KEY.' })
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
    body: JSON.stringify({
      from: senderEmail,
      html: `
        <h2>New portfolio inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${String(message).replace(/\n/g, '<br />')}</p>
      `,
      reply_to: email,
      subject: `Portfolio inquiry from ${name}`,
      to: receiverEmail,
    }),
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!resendResponse.ok) {
    const errorDetails = await resendResponse.json().catch(() => null)

    return response.status(502).json({
      error: errorDetails?.message || 'Unable to send email.',
    })
  }

  return response.status(200).json({ ok: true })
}
