import type { PayloadHandler } from 'payload'

type PrestaShopCategory = {
  id: number
  id_parent: number
  level_depth: number
  active: string
  name: { id: number; value: string }[]
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

// Build tree structure from flat list using id_parent
const buildTree = (
  categories: PrestaShopCategory[],
  parentId: number = 2, // "Strona główna" is the main parent (id=2)
  langId: number = 1
): CategoryTreeNode[] => {
  return categories
    .filter((cat) => cat.id_parent === parentId && cat.active === '1')
    .map((cat) => ({
      id: cat.id,
      name: cat.name.find((n) => n.id === langId)?.value || cat.name[0]?.value || `#${cat.id}`,
      children: buildTree(categories, cat.id, langId),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'pl'))
}

// Flatten categories for simple select
const flattenTree = (
  categories: PrestaShopCategory[],
  langId: number = 1
): FlatCategory[] => {
  return categories
    .filter((cat) => cat.active === '1' && cat.id > 2) // Skip root and "Strona główna"
    .map((cat) => ({
      id: cat.id,
      name: cat.name.find((n) => n.id === langId)?.value || cat.name[0]?.value || `#${cat.id}`,
      level: cat.level_depth || 1,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'pl'))
}

export const getPrestashopCategories: PayloadHandler = async (req) => {
  const apiUrl = process.env.PRESTASHOP_API_URL
  const apiKey = process.env.PRESTASHOP_API_KEY

  if (!apiUrl || !apiKey) {
    return Response.json(
      { error: 'PrestaShop API not configured' },
      { status: 500 }
    )
  }

  try {
    // Use native PrestaShop WebService API to get ALL categories
    const url = `${apiUrl}/api/categories?output_format=JSON&display=%5Bid,name,id_parent,level_depth,active%5D`
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
      },
    })

    const data = await response.json()

    if (!data.categories) {
      throw new Error(`PrestaShop API error: status ${response.status}, no categories in response`)
    }

    const categories: PrestaShopCategory[] = data.categories

    // Transform to tree structure
    const tree = buildTree(categories)

    // Flatten for simple select
    const flatList = flattenTree(categories)

    return Response.json({ tree, flatList })
  } catch (error) {
    console.error('PrestaShop categories fetch error:', error)
    return Response.json(
      { error: 'Failed to fetch categories from PrestaShop' },
      { status: 500 }
    )
  }
}
