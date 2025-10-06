import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { event, formData, output } = req.body || {}

  const notifyEmail = process.env.NOTIFY_EMAIL
  if (!notifyEmail) return res.status(500).json({ error: 'Missing NOTIFY_EMAIL env' })

  const subject = `[Ignira] ${event === 'request_call' ? 'Call Request' : 'Survey Completed'}`
  const message = `
Event: ${event}
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Postcode: ${formData.postcode}
Address: ${formData.addressLine}
Region: ${formData.region}

Output:
- Estimated Savings (kWh): ${output?.annualKWhSaved}
- Estimated Savings (£): ${output?.annualPoundSaved}
- Estimated Install Cost: £${output?.installCostNet}
`

  console.log("Notification email:", subject, "\n", message)

  // This example just logs. Replace with Resend, SendGrid, etc.
  res.status(200).json({ ok: true, logged: true })
}
