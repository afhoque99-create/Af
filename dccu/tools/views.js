const { chromium } = require('playwright');
(async () => {
  const [,, url, outdir] = process.argv;
  const b = await chromium.launch();
  const errs = [];
  async function shot(vp, name, fn) {
    const pg = await b.newPage({ viewport: vp, deviceScaleFactor: 1 });
    pg.on('pageerror', e => errs.push(name + ': ' + e.message));
    await pg.goto(url); await pg.waitForTimeout(1500);
    await fn(pg);
    const ov = await pg.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    console.log(name, 'overflow', ov);
    await pg.screenshot({ path: `${outdir}/${name}.png` }); await pg.close();
  }
  const D = { width: 1366, height: 900 };
  await shot(D, 'v-chron', async (pg) => { await pg.click('[data-view=chronology]'); await pg.waitForTimeout(800); await pg.evaluate(() => window.scrollBy(0, 250)); await pg.waitForTimeout(900); });
  await shot(D, 'v-medium', async (pg) => { await pg.click('[data-view=medium]'); await pg.waitForTimeout(800); await pg.evaluate(() => window.scrollBy(0, 250)); await pg.waitForTimeout(900); });
  await shot(D, 'v-dossier', async (pg) => { await pg.click('.card[data-id=blackest-night]'); await pg.waitForTimeout(1500); });
  await shot(D, 'v-library', async (pg) => { await pg.evaluate(() => document.getElementById('library').scrollIntoView()); await pg.waitForTimeout(600); });
  await shot(D, 'v-playing', async (pg) => { await pg.click('#bigplay'); await pg.waitForTimeout(2500); await pg.evaluate(() => { document.getElementById('scrub').value = 60; document.getElementById('scrub').dispatchEvent(new Event('input')); }); await pg.waitForTimeout(1200); await pg.evaluate(() => window.scrollTo(0, 380)); await pg.waitForTimeout(300); });
  const M = { width: 390, height: 844 };
  await shot(M, 'm-top', async () => {});
  await shot(M, 'm-release', async (pg) => { await pg.evaluate(() => document.getElementById('timelines').scrollIntoView()); await pg.waitForTimeout(900); });
  await shot(M, 'm-dossier', async (pg) => { await pg.evaluate(() => document.querySelector('.card[data-id=jl-nwo]').click()); await pg.waitForTimeout(1500); });
  await shot(M, 'm-library', async (pg) => { await pg.evaluate(() => document.getElementById('libgrid').scrollIntoView()); await pg.waitForTimeout(600); });
  console.log(errs.join('\n') || 'no page errors');
  await b.close();
})();
