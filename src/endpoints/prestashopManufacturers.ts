import type { PayloadHandler } from 'payload'

type PrestaShopManufacturer = {
  id: number
  name: string
  active: string
}

type FlatBrand = {
  id: number
  name: string
}

export const getPrestashopManufacturers: PayloadHandler = async () => {
  const apiUrl = process.env.PRESTASHOP_API_URL
  const apiKey = process.env.PRESTASHOP_API_KEY

  if (!apiUrl || !apiKey) {
    return Response.json(
      { error: 'PrestaShop API not configured' },
      { status: 500 }
    )
  }

  try {
    // Use native PrestaShop WebService API to get ALL manufacturers (brands)
    const url = `${apiUrl}/api/manufacturers?output_format=JSON&display=%5Bid,name,active%5D`
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
      },
    })

    const data = await response.json()

    if (!data.manufacturers) {
      throw new Error(`PrestaShop API error: status ${response.status}, no manufacturers in response`)
    }

    const manufacturers: PrestaShopManufacturer[] = data.manufacturers

    const flatList: FlatBrand[] = manufacturers
      .filter((m) => m.active === '1')
      .map((m) => ({ id: m.id, name: m.name }))
      .sort((a, b) => a.name.localeCompare(b.name, 'pl'))

    return Response.json({ flatList })
  } catch (error) {
    console.error('PrestaShop manufacturers fetch error:', error)
    return Response.json(
      { error: 'Failed to fetch manufacturers from PrestaShop' },
      { status: 500 }
    )
  }
}
