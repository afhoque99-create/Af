const { chromium } = require('playwright');
(async () => {
  const [,, url, out, w, h, full, clickSel] = process.argv;
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
  const errs = [];
  pg.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.text()); });
  pg.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
  await pg.goto(url); await pg.waitForTimeout(2500);
  if (clickSel) { for (const s of clickSel.split('|')) { await pg.click(s); await pg.waitForTimeout(1200); } }
  await pg.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } window.scrollTo(0, 0); });
  await pg.waitForTimeout(800);
  const ov = await pg.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log('horizontal overflow px:', ov, 'height', await pg.evaluate(() => document.body.scrollHeight));
  await pg.screenshot({ path: out, fullPage: full === '1' });
  console.log(errs.join('\n') || 'no console errors'); await b.close();
})();
