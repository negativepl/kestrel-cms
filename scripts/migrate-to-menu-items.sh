#!/bin/bash

# Migration script: Create MenuItems from old Navigation data
# Run this BEFORE accepting database schema changes

API_URL="${CMS_URL:-https://cms.presta.trkhspl.com}"

echo "Creating Menu Items via API..."
echo "API URL: $API_URL"
echo ""

# Apple
echo "Creating: Apple"
curl -s -X POST "$API_URL/api/menu-items" \
  -H "Content-Type: application/json" \
  -d '{
    "label": "Apple",
    "prestashopCategoryId": 3,
    "isVisible": true,
    "categories": [
      {"categoryId": 282, "showTitle": true, "visibleItemsCount": 17},
      {"categoryId": 283, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 483, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 210, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 74, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 648, "showTitle": true, "visibleItemsCount": 10}
    ]
  }' | jq .

# Samsung
echo "Creating: Samsung"
curl -s -X POST "$API_URL/api/menu-items" \
  -H "Content-Type: application/json" \
  -d '{
    "label": "Samsung",
    "prestashopCategoryId": 9,
    "isVisible": true,
    "categories": [
      {"categoryId": 279, "showTitle": true, "visibleItemsCount": 16},
      {"categoryId": 280, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 655, "showTitle": true, "visibleItemsCount": 11},
      {"categoryId": 324, "showTitle": true, "visibleItemsCount": 13},
      {"categoryId": 516, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 1107, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 281, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 431, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 278, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 338, "showTitle": true, "visibleItemsCount": 14},
      {"categoryId": 420, "showTitle": true, "visibleItemsCount": 10}
    ]
  }' | jq .

# Xiaomi
echo "Creating: Xiaomi"
curl -s -X POST "$API_URL/api/menu-items" \
  -H "Content-Type: application/json" \
  -d '{
    "label": "Xiaomi",
    "prestashopCategoryId": 98,
    "isVisible": true,
    "categories": [
      {"categoryId": 814, "showTitle": true, "visibleItemsCount": 18},
      {"categoryId": 290, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 291, "showTitle": true, "visibleItemsCount": 13},
      {"categoryId": 1420, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 1426, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 608, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 292, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 330, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 313, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 1893, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 361, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 565, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 566, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 1230, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 1256, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 1677, "showTitle": true, "visibleItemsCount": 10}
    ]
  }' | jq .

# OnePlus
echo "Creating: OnePlus"
curl -s -X POST "$API_URL/api/menu-items" \
  -H "Content-Type: application/json" \
  -d '{
    "label": "OnePlus",
    "prestashopCategoryId": 94,
    "isVisible": true,
    "categories": [
      {"categoryId": 1213, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 843, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 542, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 612, "showTitle": true, "visibleItemsCount": 10}
    ]
  }' | jq .

# Realme
echo "Creating: Realme"
curl -s -X POST "$API_URL/api/menu-items" \
  -H "Content-Type: application/json" \
  -d '{
    "label": "Realme",
    "prestashopCategoryId": 576,
    "isVisible": true,
    "categories": [
      {"categoryId": 1217, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 1136, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 1149, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 1148, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 1146, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 1147, "showTitle": true, "visibleItemsCount": 10}
    ]
  }' | jq .

# Moto
echo "Creating: Moto"
curl -s -X POST "$API_URL/api/menu-items" \
  -H "Content-Type: application/json" \
  -d '{
    "label": "Moto",
    "prestashopCategoryId": 8,
    "isVisible": true,
    "categories": [
      {"categoryId": 296, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 770, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 1694, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 1713, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 779, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 1695, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 430, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 778, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 452, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 477, "showTitle": true, "visibleItemsCount": 10},
      {"categoryId": 623, "showTitle": true, "visibleItemsCount": 10}
    ]
  }' | jq .

echo ""
echo "Done! Now you can accept the database schema changes."
