const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateOgImage() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // OG image dimensions: 1200x630
  await page.setViewport({ width: 1200, height: 630 });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      width: 1200px;
      height: 630px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 60px;
      color: white;
    }
    .logo-area {
      margin-bottom: 40px;
    }
    .logo-text {
      font-size: 72px;
      font-weight: 900;
      letter-spacing: -2px;
      text-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    .logo-accent {
      color: #10b981;
    }
    .tagline {
      font-size: 32px;
      font-weight: 600;
      opacity: 0.95;
      margin-bottom: 40px;
      text-align: center;
      max-width: 900px;
      line-height: 1.4;
    }
    .stats-row {
      display: flex;
      gap: 60px;
      margin-top: 20px;
    }
    .stat {
      text-align: center;
      background: rgba(255,255,255,0.1);
      padding: 20px 40px;
      border-radius: 16px;
      border: 2px solid rgba(255,255,255,0.2);
    }
    .stat-number {
      font-size: 48px;
      font-weight: 900;
      color: #10b981;
    }
    .stat-label {
      font-size: 18px;
      opacity: 0.9;
      margin-top: 8px;
    }
    .url {
      position: absolute;
      bottom: 30px;
      font-size: 24px;
      font-weight: 700;
      opacity: 0.8;
    }
  </style>
</head>
<body>
  <div class="logo-area">
    <div class="logo-text">GovCon <span class="logo-accent">Giants</span></div>
  </div>
  <div class="tagline">Win Federal Government Contracts for Your Small Business</div>
  <div class="stats-row">
    <div class="stat">
      <div class="stat-number">$750B+</div>
      <div class="stat-label">Federal Contracts/Year</div>
    </div>
    <div class="stat">
      <div class="stat-number">5,000+</div>
      <div class="stat-label">Contractors Trained</div>
    </div>
    <div class="stat">
      <div class="stat-number">140+</div>
      <div class="stat-label">Free Guides</div>
    </div>
  </div>
  <div class="url">govcongiants.com</div>
</body>
</html>
  `;

  await page.setContent(html);

  const outputDir = path.join(__dirname, '..', 'public', 'images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'og-default.png');
  await page.screenshot({ path: outputPath, type: 'png' });

  console.log(`OG image generated: ${outputPath}`);

  await browser.close();
}

generateOgImage().catch(console.error);
