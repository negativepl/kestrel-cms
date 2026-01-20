import type { PayloadHandler } from 'payload'

type BinShopCategory = {
  id: number
  slug: string
  type: string
  label: string
  url: string
  children: BinShopCategory[]
  depth: number
}

type CategoryTreeNode = {
  id: number
  name: string
  children: CategoryTreeNode[]
}

type FlatCategory = {
  id: number
  name: string
  level: number
}

const transformToTree = (items: BinShopCategory[]): CategoryTreeNode[] => {
  return items
    .filter((item) => item.type === 'category')
    .map((item) => ({
      id: item.id,
      name: item.label,
      children: item.children ? transformToTree(item.children) : [],
    }))
}

const flattenCategories = (items: BinShopCategory[], result: FlatCategory[] = []): FlatCategory[] => {
  for (const item of items) {
    if (item.type === 'category') {
      result.push({
        id: item.id,
        name: item.label,
        level: item.depth || 1,
      })
      if (item.children && item.children.length > 0) {
        flattenCategories(item.children, result)
      }
    }
  }
  return result
}

export const getPrestashopCategories: PayloadHandler = async (req) => {
  const apiUrl = process.env.PRESTASHOP_API_URL

  if (!apiUrl) {
    return Response.json(
      { error: 'PrestaShop API not configured' },
      { status: 500 }
    )
  }

  try {
    // Use BinShop REST API - much faster than native PrestaShop WebService
    const url = `${apiUrl}/rest/bootstrap`
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`BinShop API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.success || !data.psdata?.menuItems) {
      throw new Error('Invalid response from BinShop API')
    }

    const menuItems: BinShopCategory[] = data.psdata.menuItems

    // Transform to tree structure
    const tree = transformToTree(menuItems)

    // Flatten for simple select
    const flatList = flattenCategories(menuItems)
      .sort((a, b) => a.name.localeCompare(b.name))

    return Response.json({ tree, flatList })
  } catch (error) {
    console.error('BinShop categories fetch error:', error)
    return Response.json(
      { error: 'Failed to fetch categories from BinShop' },
      { status: 500 }
    )
  }
}
