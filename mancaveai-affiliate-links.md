# Task: Complete All 24 Missing Amazon Affiliate Links

## Operating rules — read before doing anything

- Run fully autonomously. Do not stop to ask for confirmation, clarification, or permission at any point.
- Do not pause between steps.
- Do not say "shall I proceed?", "would you like me to...", or "let me know if...".
- If you hit an ambiguous situation, make a reasonable decision, log it, and keep going.
- The only time you stop is when all 24 links are added and you have written the report.

---

## Context

Amazon Associates ID: `mancaveidea0d-20`
Affiliate link format: `https://www.amazon.com/dp/[ASIN]?tag=mancaveidea0d-20`
All product mappings live in: `src/lib/productMappings.ts`

4 products are already linked. 24 still need real Amazon ASINs.
Find real, currently-listed products on Amazon for each item below.
Use web search to find the best-reviewed, well-priced product matching each description.

---

## Products to complete (in priority order)

### HIGH VALUE — do these first

1. **SkyTrak Launch Monitor** (`golf-launch-monitor`)
   - Search: "SkyTrak launch monitor golf simulator"
   - Target price: ~$2,499
   - Line: productMappings.ts ~126

2. **4K Home Theater Projector** (`projector`)
   - Search: "4K home theater projector under 600"
   - Target price: ~$599
   - Line: productMappings.ts ~92

3. **Golf Simulator Enclosure Kit** (`golf-enclosure`)
   - Search: "golf simulator enclosure kit"
   - Target price: ~$899
   - Line: productMappings.ts ~218

4. **Golf Simulator Impact Screen** (`golf-impact-screen`)
   - Search: "golf simulator impact screen 10ft"
   - Target price: ~$599
   - Line: productMappings.ts ~134

### MEDIUM VALUE

5. **5.1 Channel Soundbar System** (`soundbar-theater`)
   - Search: "5.1 channel soundbar surround sound system"
   - Target price: ~$349
   - Line: productMappings.ts ~100

6. **Industrial Bar Stools Set of 2** (`bar-stools`)
   - Search: "industrial bar stools set of 2"
   - Target price: ~$189
   - Line: productMappings.ts ~50

7. **Heavy Duty Garage Storage System** (`garage-storage`)
   - Search: "heavy duty garage storage shelving system"
   - Target price: ~$349
   - Line: productMappings.ts ~174

8. **Basement Dehumidifier 70 Pint** (`dehumidifier`)
   - Search: "basement dehumidifier 70 pint"
   - Target price: ~$259
   - Line: productMappings.ts ~156

9. **Entry Level Golf Launch Monitor** (`golf-simulator-budget`)
   - Search: "Garmin Approach R10 golf launch monitor"
   - Target price: ~$499
   - Line: productMappings.ts ~226

10. **Golf Practice Mat with Tee** (`golf-mat`)
    - Search: "golf practice mat with tee holder premium"
    - Target price: ~$249
    - Line: productMappings.ts ~142

11. **L-Shaped Gaming Desk** (`gaming-desk`)
    - Search: "L shaped gaming desk with monitor stand"
    - Target price: ~$249
    - Line: productMappings.ts ~31

### STANDARD VALUE

12. **RGB LED Strip Lights 50ft** (`led-strips`)
    - Search: "RGB LED strip lights 50ft smart"
    - Target price: ~$35
    - Line: productMappings.ts ~24

13. **Gaming Soundbar with Subwoofer** (`soundbar`)
    - Search: "gaming soundbar with subwoofer"
    - Target price: ~$199
    - Line: productMappings.ts ~40

14. **LED Neon Beer Sign** (`neon-beer-sign`)
    - Search: "LED neon beer sign bar"
    - Target price: ~$79
    - Line: productMappings.ts ~59

15. **Electronic Dartboard Cabinet** (`dartboard`)
    - Search: "electronic dartboard cabinet set"
    - Target price: ~$149
    - Line: productMappings.ts ~74

16. **Blackout Curtains Theater Grade** (`blackout-curtains`)
    - Search: "blackout curtains home theater 2 panel"
    - Target price: ~$89
    - Line: productMappings.ts ~109

17. **Golf Practice Net 10ft** (`golf-net`)
    - Search: "golf practice net 10ft backyard"
    - Target price: ~$179
    - Line: productMappings.ts ~150

18. **Indoor Putting Green 10ft** (`putting-green`)
    - Search: "indoor putting green mat 10ft"
    - Target price: ~$129
    - Line: productMappings.ts ~158

19. **Garage Floor Epoxy Kit** (`epoxy-floor`)
    - Search: "garage floor epoxy coating kit"
    - Target price: ~$179
    - Line: productMappings.ts ~182

20. **Interlocking Foam Floor Tiles** (`flooring`)
    - Search: "interlocking foam floor tiles basement"
    - Target price: ~$99
    - Line: productMappings.ts ~164

21. **Warm White String Lights 50ft** (`string-lights`)
    - Search: "warm white string lights 50ft outdoor"
    - Target price: ~$24
    - Line: productMappings.ts ~192

22. **Vintage Sports Poster Set** (`posters`)
    - Search: "vintage sports poster set wall art"
    - Target price: ~$29
    - Line: productMappings.ts ~200

---

## How to find each ASIN

Use web search to find the product. The ASIN is the 10-character code in the Amazon URL:
`amazon.com/dp/B08XYZ1234` → ASIN is `B08XYZ1234`

Pick products that:
- Are currently in stock on Amazon
- Have 4+ star ratings with 100+ reviews
- Match the target price range within 20%
- Are sold by Amazon or reputable sellers (not random third-party only)

---

## How to update productMappings.ts

For each product, find the entry in `src/lib/productMappings.ts` and update the `affiliateUrl` field:

```typescript
// BEFORE:
affiliateUrl: '',  // or undefined or placeholder

// AFTER:
affiliateUrl: 'https://www.amazon.com/dp/B08XYZ1234?tag=mancaveidea0d-20',
```

---

## Commit when done

```bash
git add src/lib/productMappings.ts
git commit -m "feat: add 24 remaining Amazon affiliate links"
```

---

## Report when complete

Write a table with every product you updated:

| Product | ASIN | Price Found | Stars | Reviews | Link |
|---------|------|-------------|-------|---------|------|
| SkyTrak Launch Monitor | B0XXXXX | $2,499 | 4.5 | 847 | ✓ |
...

Note any products where you couldn't find a good match and why.
