import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium',
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1360, height: 2000 });

  page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  try {
    await page.goto('http://localhost:5173', { waitUntil: 'load', timeout: 15000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: '/tmp/dashboard.png', fullPage: true });
    console.log('✅ Screenshot salvo em /tmp/dashboard.png');
  } catch (e) {
    console.error('❌ Erro:', e.message);
  } finally {
    await browser.close();
  }
})();
