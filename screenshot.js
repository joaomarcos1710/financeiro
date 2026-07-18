import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium',
    headless: true
  });

  for (const scheme of ['light', 'dark']) {
    const page = await browser.newPage({ colorScheme: scheme });
    await page.setViewportSize({ width: 1360, height: 1400 });
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 15000 });
    await page.screenshot({ path: `/tmp/dashboard-${scheme}.png` });
    console.log(`✅ ${scheme} salvo`);
    await page.close();
  }

  await browser.close();
})();
