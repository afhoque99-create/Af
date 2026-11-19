// Builds the companion page two ways:
//   dist/dccu.html            one self-contained file (open locally; score.mp3 sits beside it)
//   dist/artifact/index.html  page fragment + separate scripts and score, for publishing
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const rd = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const fontCss = rd('src/fonts.css').replace(/url\(\.\.\/fonts\/([^)]+)\)/g, (_, f) =>
  `url(data:font/woff2;base64,${fs.readFileSync(path.join(root, 'fonts', f)).toString('base64')})`);
const page = rd('src/page.html').replace('/*@FONTS*/', () => fontCss);
const scripts = ['src/data.js', 'src/art.js', 'src/film.js', 'src/app.js'];

fs.mkdirSync(path.join(root, 'dist/artifact'), { recursive: true });

// standalone
const inline = scripts.map((s) => `<script>\n${rd(s).replace(/<\/script/gi, '<\\/script')}\n</script>`).join('\n');
const standalone = `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n</head>\n<body>\n${page.replace('<!--@SCRIPTS-->', () => inline)}\n</body>\n</html>\n`;
fs.writeFileSync(path.join(root, 'dist/dccu.html'), standalone);

// artifact
const tags = scripts.map((s) => `<script src="${path.basename(s)}"></script>`).join('\n');
fs.writeFileSync(path.join(root, 'dist/artifact/index.html'), page.replace('<!--@SCRIPTS-->', () => tags));
scripts.forEach((s) => fs.copyFileSync(path.join(root, s), path.join(root, 'dist/artifact', path.basename(s))));
if (fs.existsSync(path.join(root, 'dist/score.mp3'))) fs.copyFileSync(path.join(root, 'dist/score.mp3'), path.join(root, 'dist/artifact/score.mp3'));

const kb = (p) => (fs.statSync(path.join(root, p)).size / 1024).toFixed(0) + ' KB';
console.log('dist/dccu.html', kb('dist/dccu.html'));
console.log('dist/artifact/index.html', kb('dist/artifact/index.html'));
