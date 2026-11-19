const { chromium } = require('playwright');
(async () => {
  const [,, file, out, w, h] = process.argv;
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: +w || 1280, height: +h || 800 }, deviceScaleFactor: 1 });
  pg.on('console', m => console.log('console:', m.text())); pg.on('pageerror', e => console.log('ERR', e.message));
  await pg.goto('file://' + require('path').resolve(file));
  await pg.waitForFunction(() => document.title.startsWith('done'), null, { timeout: 120000 });
  console.log(await pg.title());
  await pg.screenshot({ path: out, fullPage: true }); await b.close();
})();
