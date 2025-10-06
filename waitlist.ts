import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { formData, output } = req.body || {}

  // Log or store in external service (e.g. Google Sheets)
  const notifyEmail = process.env.NOTIFY_EMAIL
  const message = `
New Waitlist Signup:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Region: ${formData.region}

Output:
- kWh: ${output?.annualKWhSaved}
- £ Saved: ${output?.annualPoundSaved}
- Install Cost: £${output?.installCostNet}
`

  console.log("Waitlist signup:", message)

  res.status(200).json({ ok: true, waitlisted: true })
}
