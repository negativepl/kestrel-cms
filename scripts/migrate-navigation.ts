/**
 * Migration script: Convert old Navigation structure to new MenuItems collection
 *
 * Old structure: Navigation.items[].columns[].categories[]
 * New structure: MenuItems collection with categories[] directly
 *
 * Run with: npx tsx scripts/migrate-navigation.ts
 */

const OLD_DATA = {
  "docs": [{
    "id": 1,
    "name": "Main Menu",
    "slug": "main-menu",
    "isActive": true,
    "items": [
      {
        "id": "696f73d468d77e842ef5148b",
        "prestashopCategoryId": 3,
        "isVisible": true,
        "label": "Apple",
        "columns": [
          { "categories": [{ "categoryId": 282, "showTitle": true, "visibleItemsCount": 17 }] },
          { "categories": [
            { "categoryId": 283, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 483, "showTitle": true, "visibleItemsCount": 10 }
          ]},
          { "categories": [
            { "categoryId": 210, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 74, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 648, "showTitle": true, "visibleItemsCount": 10 }
          ]}
        ]
      },
      {
        "id": "696f868f58a6e1d491ecd4e0",
        "prestashopCategoryId": 9,
        "isVisible": true,
        "label": "Samsung",
        "columns": [
          { "categories": [{ "categoryId": 279, "showTitle": true, "visibleItemsCount": 16 }] },
          { "categories": [{ "categoryId": 280, "showTitle": true, "visibleItemsCount": 10 }] },
          { "categories": [
            { "categoryId": 655, "showTitle": true, "visibleItemsCount": 11 },
            { "categoryId": 324, "showTitle": true, "visibleItemsCount": 13 }
          ]},
          { "categories": [
            { "categoryId": 516, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 1107, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 281, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 431, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 278, "showTitle": true, "visibleItemsCount": 10 }
          ]},
          { "categories": [
            { "categoryId": 338, "showTitle": true, "visibleItemsCount": 14 },
            { "categoryId": 420, "showTitle": true, "visibleItemsCount": 10 }
          ]}
        ]
      },
      {
        "id": "697092a5ddb147a78d25ddda",
        "prestashopCategoryId": 98,
        "isVisible": true,
        "label": "Xiaomi",
        "columns": [
          { "categories": [{ "categoryId": 814, "showTitle": true, "visibleItemsCount": 18 }] },
          { "categories": [{ "categoryId": 290, "showTitle": true, "visibleItemsCount": 10 }] },
          { "categories": [
            { "categoryId": 291, "showTitle": true, "visibleItemsCount": 13 },
            { "categoryId": 1420, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 1426, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 608, "showTitle": true, "visibleItemsCount": 10 }
          ]},
          { "categories": [{ "categoryId": 292, "showTitle": true, "visibleItemsCount": 10 }] },
          { "categories": [
            { "categoryId": 330, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 313, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 1893, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 361, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 565, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 566, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 1230, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 1256, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 1677, "showTitle": true, "visibleItemsCount": 10 }
          ]}
        ]
      },
      {
        "id": "6972099856adeb02b4304ac7",
        "prestashopCategoryId": 94,
        "isVisible": true,
        "label": "OnePlus",
        "columns": [
          { "categories": [{ "categoryId": 1213, "showTitle": true, "visibleItemsCount": 10 }] },
          { "categories": [
            { "categoryId": 843, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 542, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 612, "showTitle": true, "visibleItemsCount": 10 }
          ]}
        ]
      },
      {
        "id": "69720a6656adeb02b4304ace",
        "prestashopCategoryId": 576,
        "isVisible": true,
        "label": "Realme",
        "columns": [
          { "categories": [{ "categoryId": 1217, "showTitle": true, "visibleItemsCount": 10 }] },
          { "categories": [
            { "categoryId": 1136, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 1149, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 1148, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 1146, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 1147, "showTitle": true, "visibleItemsCount": 10 }
          ]}
        ]
      },
      {
        "id": "69720b6b56adeb02b4304ad8",
        "prestashopCategoryId": 8,
        "isVisible": true,
        "label": "Moto",
        "columns": [
          { "categories": [{ "categoryId": 296, "showTitle": true, "visibleItemsCount": 10 }] },
          { "categories": [{ "categoryId": 770, "showTitle": true, "visibleItemsCount": 10 }] },
          { "categories": [
            { "categoryId": 1694, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 1713, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 779, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 1695, "showTitle": true, "visibleItemsCount": 10 }
          ]},
          { "categories": [
            { "categoryId": 430, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 778, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 452, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 477, "showTitle": true, "visibleItemsCount": 10 },
            { "categoryId": 623, "showTitle": true, "visibleItemsCount": 10 }
          ]}
        ]
      }
    ]
  }]
};

// Convert old structure to new MenuItems format
function convertToMenuItems(oldData: typeof OLD_DATA) {
  const menuItems: Array<{
    label: string;
    prestashopCategoryId: number;
    isVisible: boolean;
    categories: Array<{
      categoryId: number;
      showTitle: boolean;
      visibleItemsCount: number;
    }>;
  }> = [];

  for (const nav of oldData.docs) {
    for (const item of nav.items) {
      // Flatten columns into single categories array
      const categories: Array<{
        categoryId: number;
        showTitle: boolean;
        visibleItemsCount: number;
      }> = [];

      for (const column of item.columns) {
        for (const cat of column.categories) {
          categories.push({
            categoryId: cat.categoryId,
            showTitle: cat.showTitle,
            visibleItemsCount: cat.visibleItemsCount,
          });
        }
      }

      menuItems.push({
        label: item.label,
        prestashopCategoryId: item.prestashopCategoryId,
        isVisible: item.isVisible,
        categories,
      });
    }
  }

  return menuItems;
}

// Main
const menuItems = convertToMenuItems(OLD_DATA);

console.log('=== MIGRATION DATA ===\n');
console.log('Menu Items to create:\n');

for (const item of menuItems) {
  console.log(`\n📁 ${item.label} (PrestaShop ID: ${item.prestashopCategoryId})`);
  console.log(`   Visible: ${item.isVisible}`);
  console.log(`   Categories (${item.categories.length}):`);
  for (const cat of item.categories) {
    console.log(`     - Category ID: ${cat.categoryId}, Visible Items: ${cat.visibleItemsCount}`);
  }
}

console.log('\n\n=== JSON FOR API ===\n');
console.log(JSON.stringify(menuItems, null, 2));
