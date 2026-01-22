import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // Get all menu items
  const menuItems = await payload.find({
    collection: 'menu-items',
    limit: 1000,
    depth: 0,
  })

  // Update each menu item's categories where visibleItemsCount is 10
  for (const item of menuItems.docs) {
    if (!item.categories || !Array.isArray(item.categories)) continue

    let hasChanges = false
    const updatedCategories = item.categories.map((cat: any) => {
      if (cat.visibleItemsCount === 10) {
        hasChanges = true
        return { ...cat, visibleItemsCount: 0 }
      }
      return cat
    })

    if (hasChanges) {
      await payload.update({
        collection: 'menu-items',
        id: item.id,
        data: {
          categories: updatedCategories,
        },
      })
      console.log(`Updated menu item "${item.label}" - changed visibleItemsCount from 10 to 0`)
    }
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Revert: change 0 back to 10
  const menuItems = await payload.find({
    collection: 'menu-items',
    limit: 1000,
    depth: 0,
  })

  for (const item of menuItems.docs) {
    if (!item.categories || !Array.isArray(item.categories)) continue

    let hasChanges = false
    const updatedCategories = item.categories.map((cat: any) => {
      if (cat.visibleItemsCount === 0) {
        hasChanges = true
        return { ...cat, visibleItemsCount: 10 }
      }
      return cat
    })

    if (hasChanges) {
      await payload.update({
        collection: 'menu-items',
        id: item.id,
        data: {
          categories: updatedCategories,
        },
      })
      console.log(`Reverted menu item "${item.label}" - changed visibleItemsCount from 0 to 10`)
    }
  }
}
