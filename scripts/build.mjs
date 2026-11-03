// Builds two self-contained outputs from src/:
//   dist/index.html    – a complete HTML document (open locally or host anywhere)
//   dist/artifact.html – the same page as a body fragment for Claude Artifacts
// React is bundled in; Tailwind is compiled ahead of time; only Google Fonts load remotely.
import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist');
mkdirSync(out, { recursive: true });

const js = await build({
  entryPoints: [join(root, 'src/main.jsx')],
  bundle: true,
  minify: true,
  format: 'iife',
  target: ['es2019'],
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
  write: false,
  legalComments: 'none',
}).then((r) => r.outputFiles[0].text.replace(/<\/script/gi, '<\\/script'));

const css = execFileSync(
  join(root, 'node_modules/.bin/tailwindcss'),
  ['-c', join(root, 'tailwind.config.js'), '-i', join(root, 'src/styles.css'), '--minify'],
  { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
);

const TITLE = 'Bangladesh Development Trajectory';
const DESC = 'Interactive assessment of Bangladesh against a 20-point framework of development prerequisites: fixes, foreign powers, regional integration and a 2026–2045 outlook.';
const FONTS =
  'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=IBM+Plex+Mono:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,400..700&family=Tiro+Bangla&display=swap';

const headBits = `<title>${TITLE}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="${DESC}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>${css}</style>`;

const bodyBits = `<div id="root"></div>
<noscript><p style="padding:24px;font-family:sans-serif">This dashboard needs JavaScript to run.</p></noscript>
<script>${js}</script>`;

writeFileSync(join(out, 'artifact.html'), `${headBits}\n${bodyBits}\n`);
writeFileSync(
  join(out, 'index.html'),
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${headBits}
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}[hidden]{display:none!important}</style>
</head>
<body>
${bodyBits}
</body>
</html>
`,
);

const kb = (s) => `${(Buffer.byteLength(s) / 1024).toFixed(1)} KB`;
console.log(`built dist/index.html and dist/artifact.html (js ${kb(js)}, css ${kb(css)})`);
