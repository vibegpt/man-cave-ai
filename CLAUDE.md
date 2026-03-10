# Man Cave AI — Project Context

## What This Is
AI-powered interior design tool for man caves. Users upload a photo of their space and receive:
1. A redesigned/styled version of the room using AI image generation
2. Affiliate product recommendations matching the chosen style

## Business Model
- Free tool driving affiliate revenue (Amazon product links)
- Traffic from SEO, social, content marketing

## Tech Stack
- Next.js (App Router), TypeScript, Tailwind CSS
- Supabase for storage and analytics
- AI image generation for room redesigns
- Amazon Associates for affiliate links

## Key Components
- PhotoUpload — handles user image upload
- StyleSelector — man cave style options (sports bar, gaming, cinema, workshop, etc.)
- InspirationLinks — style inspiration gallery
- ProductRecommendations — affiliate product grid
- Logo — branding component
- analytics lib — tracks user funnel events

## Affiliate Strategy
- Amazon product links already integrated (see AMAZON_PRODUCT_LINKS.md)
- Track: photo upload -> style select -> generation -> download -> product click
- Conversion funnel is the main KPI

## Current Status
- Core flow working: upload photo -> select style -> generate -> recommend products
- Analytics tracking in place

## Active Priorities
- Improve conversion rate from generation to product click
- Add more style options if data shows demand
- SEO for "man cave ideas", "man cave design" keywords

## Rules for This Project
- Keep the UX dead simple — man cave audience is not early adopter tech crowd
- Affiliate link integrity is critical — never break product links
- Image generation quality is the core value prop — optimise prompts

Last updated: 2026-02-19
