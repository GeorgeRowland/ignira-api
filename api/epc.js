export default async function handler(req, res) {
  const { postcode, addressLine } = req.body || {}

  if (!postcode) return res.status(400).json({ error: 'Postcode is required' })

  const auth = Buffer.from(`${process.env.EPC_EMAIL}:${process.env.EPC_API_KEY}`).toString('base64')

  try {
    const searchRes = await fetch(`https://epc.opendatacommunities.org/api/v1/domestic/search?postcode=${encodeURIComponent(postcode)}&size=5`, {
      headers: {
        'Accept': ' 'application/json',
        'Authorization': `Basic ${auth}`
      }
    })

    const searchData = await searchRes.json()
    const results = searchData.results || []
    if (!results.length) return res.status(200).json({ epc: null })

    let epcRecord = results[0]
    if (addressLine) {
      const match = results.find(r => r.address.toLowerCase().includes(addressLine.toLowerCase()))
      if (match) epcRecord = match
    }

    const lmk = epcRecord.lmk_key
    const certRes = await fetch(`https://epc.opendatacommunities.org/api/v1/domestic/certificate/${lmk}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${auth}`
      }
    })

    const certData = await certRes.json()
    const epc = {
      lmkKey: lmk,
      address: certData.address,
      currentEnergyRating: certData.current_energy_efficiency,
      potentialEnergyRating: certData.potential_energy_efficiency
    }

    res.status(200).json({ epc })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Internal error' })
  }
}
