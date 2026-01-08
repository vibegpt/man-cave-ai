# Amazon Affiliate Product Links

**Your Amazon Associates ID:** `mancaveidea0d-20` (US Store - Primary)
**Australian ID:** `mancaveideas-22` (For reference)

## How to Find & Add Products

1. Go to Amazon.com and search for the product
2. Log into Amazon Associates (https://affiliate-program.amazon.com/)
3. Use SiteStripe toolbar → "Text" → Copy link
4. OR manually format: `https://www.amazon.com/dp/PRODUCT_ASIN?tag=mancaveidea0d-20`

---

## Products Needed for Your Site

### 🎮 **Gaming Style Products**

| Product ID | Product Name | Search Terms on Amazon | File Location |
|------------|--------------|------------------------|---------------|
| gaming-chair | Gaming Chair - Ergonomic with Lumbar Support | "gaming chair ergonomic lumbar" | productMappings.ts line 17 |
| led-strips | RGB LED Strip Lights - 50ft | "RGB LED strip lights 50ft" | productMappings.ts line 24 |
| gaming-desk | L-Shaped Gaming Desk with Monitor Stand | "L shaped gaming desk monitor stand" | productMappings.ts line 31 |
| soundbar | Gaming Soundbar with Subwoofer | "gaming soundbar subwoofer" | productMappings.ts line 40 |

**Example Link Format:**
```
https://www.amazon.com/dp/B08XYZ123?tag=mancaveidea0d-20
```

---

### 🏈 **Sports Bar Style Products**

| Product ID | Product Name | Search Terms on Amazon | File Location |
|------------|--------------|------------------------|---------------|
| bar-stools | Industrial Bar Stools - Set of 2 | "industrial bar stools set of 2" | productMappings.ts line 50 |
| neon-beer-sign | LED Neon Beer Sign | "LED neon beer sign" | productMappings.ts line 59 |
| mini-fridge | Beverage Refrigerator - 120 Can Capacity | "beverage refrigerator 120 can" | productMappings.ts line 66 |
| dartboard | Electronic Dartboard Cabinet | "electronic dartboard cabinet" | productMappings.ts line 74 |

---

### 🎬 **Theater Style Products**

| Product ID | Product Name | Search Terms on Amazon | File Location |
|------------|--------------|------------------------|---------------|
| theater-seating | Home Theater Recliner Seats - Row of 4 | "home theater recliner seats row 4" | productMappings.ts line 84 |
| projector | 4K Home Theater Projector | "4K home theater projector" | productMappings.ts line 92 |
| soundbar-theater | 5.1 Channel Soundbar System | "5.1 channel soundbar system" | productMappings.ts line 100 |
| blackout-curtains | Blackout Curtains - Theater Grade | "blackout curtains theater grade" | productMappings.ts line 109 |

---

### ⛳ **Golf Simulator Style Products** (HIGH VALUE)

| Product ID | Product Name | Search Terms on Amazon | File Location |
|------------|--------------|------------------------|---------------|
| golf-simulator-system | OptiShot Golf Simulator - Complete Package | "OptiShot golf simulator" | productMappings.ts line 118 |
| golf-launch-monitor | SkyTrak Launch Monitor & Golf Simulator | "SkyTrak launch monitor" | productMappings.ts line 126 |
| golf-impact-screen | Golf Simulator Impact Screen - 10ft x 8ft | "golf simulator impact screen 10ft" | productMappings.ts line 134 |
| golf-mat | Premium Golf Practice Mat with Tee Holder | "golf practice mat tee holder" | productMappings.ts line 142 |
| golf-net | Golf Practice Net - 10ft x 7ft | "golf practice net 10ft" | productMappings.ts line 150 |
| putting-green | Indoor Putting Green Mat - 10ft | "indoor putting green mat 10ft" | productMappings.ts line 158 |

**Budget Golf Simulator Products (Keyword Triggered):**

| Product ID | Product Name | Search Terms on Amazon | File Location |
|------------|--------------|------------------------|---------------|
| golf-simulator-budget | Golf Simulator Launch Monitor (Entry Level) | "Garmin Approach R10" or "Rapsodo MLM2PRO" | productMappings.ts line 226 |
| golf-enclosure | Golf Simulator Enclosure Kit | "golf simulator enclosure kit" | productMappings.ts line 218 |

---

### 🏠 **Keyword-Based Products (Basement)**

| Product ID | Product Name | Search Terms on Amazon | File Location |
|------------|--------------|------------------------|---------------|
| dehumidifier | Basement Dehumidifier - 70 Pint | "basement dehumidifier 70 pint" | productMappings.ts line 156 |
| flooring | Interlocking Foam Floor Tiles | "interlocking foam floor tiles" | productMappings.ts line 164 |

---

### 🚗 **Keyword-Based Products (Garage)**

| Product ID | Product Name | Search Terms on Amazon | File Location |
|------------|--------------|------------------------|---------------|
| garage-storage | Heavy Duty Garage Storage System | "heavy duty garage storage system" | productMappings.ts line 174 |
| epoxy-floor | Garage Floor Epoxy Kit | "garage floor epoxy coating kit" | productMappings.ts line 182 |

---

### 💰 **Keyword-Based Products (Budget)**

| Product ID | Product Name | Search Terms on Amazon | File Location |
|------------|--------------|------------------------|---------------|
| string-lights | Warm White String Lights - 50ft | "warm white string lights 50ft" | productMappings.ts line 192 |
| posters | Vintage Sports Poster Set | "vintage sports poster set" | productMappings.ts line 200 |

---

## Priority Order for Finding Links

**START WITH THESE (Highest Commission/Volume):**

1. ⛳ **Golf Simulator Products** ($2,499 - $4,999) - 3-4% commission = $75-150 per sale
2. 🎬 **Theater Seating** ($1,499) - 8% commission = $120 per sale
3. 🏈 **Mini Fridge** ($399) - 3-4% commission = $12-16 per sale
4. 🎮 **Gaming Chair** ($299) - 3% commission = $9 per sale

**Then add:**
5. All remaining gaming products
6. Sports bar products
7. Budget items (lower commission but higher volume)

---

## Step-by-Step Process

### **For Each Product:**

1. **Search Amazon.com** using the "Search Terms" column above
2. **Find a product** that matches the name and price range
3. **Get the ASIN** (Amazon Standard Identification Number)
   - Found in product URL: `amazon.com/dp/B08XYZ123`
   - Or in "Product Details" section
4. **Create affiliate link:**
   ```
   https://www.amazon.com/dp/[ASIN]?tag=mancaveidea0d-20
   ```
5. **Update productMappings.ts** at the line number shown above

### **Example:**

**Product:** Gaming Chair - Ergonomic with Lumbar Support
**Search:** "gaming chair ergonomic lumbar"
**Found:** GTRACING Gaming Chair (ASIN: B01IOPYSM8)
**Affiliate Link:** `https://www.amazon.com/dp/B01IOPYSM8?tag=mancaveidea0d-20`

**Update in code:**
```typescript
{
  id: 'gaming-chair',
  name: 'Gaming Chair - Ergonomic with Lumbar Support',
  price: '$299',
  image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80',
  affiliateUrl: 'https://www.amazon.com/dp/B01IOPYSM8?tag=mancaveidea0d-20', // ✅ UPDATED
  category: 'Furniture',
}
```

---

## Commission Rates Reference

| Category | Commission Rate |
|----------|----------------|
| Furniture, Home Improvement, Lawn & Garden | 8% |
| Home (Décor, Kitchen, Bedding) | 8% |
| Sports & Outdoors | 4.5% |
| Tools | 4% |
| Electronics, Computers | 3% |
| Video Games, Gaming Accessories | 1% |

**Most man cave products = 3-8% commission**

---

## Quick Links

- **Amazon Associates Dashboard:** https://affiliate-program.amazon.com/
- **Product Linking Tool:** https://affiliate-program.amazon.com/home/tools/linktoanypage
- **Earnings Report:** https://affiliate-program.amazon.com/home/reports

---

## Notes

- **Cookie Duration:** 24 hours (customer must purchase within 24 hours of clicking your link)
- **Qualifying Purchases:** Customer can buy ANY product on Amazon, you earn commission on everything in their cart
- **Minimum Payout:** $10 (Amazon gift card) or $100 (direct deposit)
- **Payment Cycle:** ~60 days after end of month

---

## Total Products to Find: 28

**By Category:**
- Gaming: 4 products
- Sports Bar: 4 products
- Theater: 4 products
- Golf Simulator: 8 products (6 main + 2 budget)
- Basement: 2 products
- Garage: 2 products
- Budget: 2 products

**Estimated Time:** 2-3 hours to find all 28 products and update links

---

## Testing Your Links

After adding links, test them:

1. Click the affiliate link
2. Should redirect to Amazon with `?tag=mancaveidea0d-20` in URL
3. Make a test purchase (optional)
4. Check Amazon Associates dashboard after 24 hours to see if click was tracked

---

**Last Updated:** 2026-01-08
