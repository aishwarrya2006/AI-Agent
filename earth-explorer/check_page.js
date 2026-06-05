import { chromium } from 'playwright';

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.error(`[BROWSER EXCEPTION]: ${err.stack || err.message}`);
  });

  try {
    console.log('Navigating to http://localhost:5173/ ...');
    await page.goto('http://localhost:5173/', { timeout: 10000, waitUntil: 'load' });
    console.log('Page loaded. Waiting 3 seconds for errors...');
    await page.waitForTimeout(3000);
  } catch (err) {
    console.error('Error loading page:', err);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
})();
