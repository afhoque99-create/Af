# DCCU: a fan-made DC connected universe

An imagined slate of 76 projects (live-action films and series, animated films and series, and video games) that tell one canon story across six chapters from 2028 to 2041, plus a library of the best comics for 141 characters.

**Unofficial fan concept.** Not affiliated with, endorsed by or leaked from DC, DC Studios or Warner Bros. Discovery. All characters belong to their owners. Every poster is procedural canvas art and the score is synthesized; no studio artwork, logos or recordings are used.

## What's here

| File | What it is |
|---|---|
| `dist/dccu-unveiling.mp4` | The 4:54 unveiling video, 1280×720, with the synthesized score |
| `dist/dccu.html` | The companion page as one self-contained file (keep `score.mp3` beside it for sound) |
| `dist/score.mp3` | The score on its own |
| `src/data.js` | All 76 projects (plots, cast, adapted comics, release and story placement) and the 141-character source library (748 picks) |
| `src/art.js` | Deterministic generative poster art (30 motifs, generic silhouettes) |
| `src/film.js` | The unveiling film renderer: `render(ctx, t)` draws any frame |
| `src/app.js`, `src/page.html` | The companion page: player, three timelines, project dossiers, library |
| `tools/` | Build, render and score scripts |

## The six chapters

1. **Dawn of Legends** (2028–2030): origins through *Justice League: New World Order*
2. **The Fourth World** (2031–2032): the New Gods arrive, Doomsday, *Cosmic Odyssey*
3. **Blackest Night** (2033–2034): the emotional spectrum at war, the dead rise
4. **The Dark Multiverse** (2035–2036): Flashpoint, Forever Evil, *Final Crisis*
5. **Crisis** (2037–2039): Metal and the *Crisis on Infinite Earths* trilogy (film, game, film)
6. **Infinite Legacy** (2039–2041): Wally West's Flash, Super Sons, *Kingdom Come*

## The three timelines

1. **Release order**: premiere dates, chapter by chapter.
2. **Story chronology**: where each project sits in DC history, from 50,000 BCE to the 31st century.
3. **By medium**: five parallel tracks.

## Rebuild

```bash
cd dccu
node tools/build.js                                   # page -> dist/dccu.html and dist/artifact/
node tools/cues.js build/cues.json                    # film cue sheet
python3 tools/score.py build/cues.json build/score.wav   # needs numpy + scipy
ffmpeg -i build/score.wav -b:a 160k dist/score.mp3
node tools/render.js dist/dccu-unveiling.mp4 build/score.wav  # needs Playwright + ffmpeg
```
