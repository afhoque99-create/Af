const { chromium } = require('playwright');
(async () => {
  const [,, url, out, w, h] = process.argv;
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
  pg.on('console', m => console.log('console:', m.text())); pg.on('pageerror', e => console.log('ERR', e.message));
  await pg.goto(url);
  await pg.waitForFunction(() => document.title.startsWith('done'), null, { timeout: 120000 });
  console.log(await pg.title()); await pg.screenshot({ path: out, fullPage: true }); await b.close();
})();
