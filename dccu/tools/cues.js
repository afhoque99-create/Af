require('../src/data.js'); require('../src/art.js'); require('../src/film.js');
const b = globalThis.DCCUFilm.build();
const cues = b.segs.map((s) => ({ type: s.type, start: +s.start.toFixed(3), dur: s.dur, ch: s.ch ? s.ch.n : 0 }));
require('fs').writeFileSync(process.argv[2] || 'build/cues.json', JSON.stringify(cues));
console.log('cues', cues.length, 'total', b.total.toFixed(2));
