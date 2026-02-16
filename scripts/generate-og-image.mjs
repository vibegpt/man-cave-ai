import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, '..', 'public', 'og-image.jpg');

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0a"/>
      <stop offset="100%" style="stop-color:#1a0a0a"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" style="stop-color:#dc2626;stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:0"/>
    </radialGradient>
    <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#dc2626"/>
      <stop offset="100%" style="stop-color:#ef4444"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>

  <!-- Subtle grid pattern -->
  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-opacity="0.03" stroke-width="1"/>
  </pattern>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>

  <!-- Top accent line -->
  <rect x="0" y="0" width="${width}" height="4" fill="url(#redGrad)"/>

  <!-- House emoji / icon area -->
  <text x="600" y="200" font-family="Arial, sans-serif" font-size="80" fill="white" text-anchor="middle" dominant-baseline="middle">🏠</text>

  <!-- Main title -->
  <text x="600" y="290" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">ManCave</text>
  <text x="600" y="290" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="bold" fill="#ef4444" text-anchor="middle" dominant-baseline="middle" dx="155">AI</text>

  <!-- Subtitle -->
  <text x="600" y="360" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">AI-Powered Man Cave Design Generator</text>

  <!-- Divider -->
  <rect x="450" y="400" width="300" height="2" rx="1" fill="#ef4444" opacity="0.6"/>

  <!-- Features row -->
  <text x="320" y="460" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#d1d5db" text-anchor="middle" dominant-baseline="middle">Upload a Photo</text>
  <text x="600" y="460" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#d1d5db" text-anchor="middle" dominant-baseline="middle">Pick a Style</text>
  <text x="880" y="460" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#d1d5db" text-anchor="middle" dominant-baseline="middle">Get Your Design</text>

  <!-- Dots between features -->
  <circle cx="460" cy="460" r="3" fill="#ef4444" opacity="0.8"/>
  <circle cx="740" cy="460" r="3" fill="#ef4444" opacity="0.8"/>

  <!-- Bottom tagline -->
  <text x="600" y="530" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#6b7280" text-anchor="middle" dominant-baseline="middle">Free • No Signup • 30 Second Results</text>

  <!-- Bottom accent line -->
  <rect x="0" y="${height - 4}" width="${width}" height="4" fill="url(#redGrad)"/>

  <!-- URL -->
  <text x="600" y="590" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#4b5563" text-anchor="middle" dominant-baseline="middle">mancaveai.com</text>
</svg>
`;

await sharp(Buffer.from(svg))
  .jpeg({ quality: 90 })
  .toFile(outputPath);

console.log(`OG image generated: ${outputPath}`);
