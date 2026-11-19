// Renders the unveiling film to MP4: Playwright draws each frame, ffmpeg encodes with the synthesized score.
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
(async () => {
  const FPS = 30;
  const out = process.argv[2] || 'dist/dccu-unveiling.mp4';
  const audio = process.argv[3] || 'build/score.wav';
  const limit = process.argv[4] ? +process.argv[4] : null;
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1280, height: 720 } });
  pg.on('pageerror', (e) => console.log('ERR', e.message));
  await pg.goto('file://' + path.resolve(__dirname, 'render.html'));
  await pg.waitForFunction(() => document.title === 'done', null, { timeout: 120000 });
  const total = await pg.evaluate(() => window.TOTAL);
  const frames = Math.floor((limit || total) * FPS);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-i', audio, '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'medium', '-crf', '21', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let i = 0; i < frames; i++) {
    const b64 = await pg.evaluate((t) => window.frame(t), i / FPS);
    const okay = ff.stdin.write(Buffer.from(b64, 'base64'));
    if (!okay) await new Promise((r) => ff.stdin.once('drain', r));
    if (i % 300 === 0) console.log(`frame ${i}/${frames}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  await b.close();
  console.log('done', out, ((Date.now() - t0) / 1000).toFixed(0) + 's');
})();
