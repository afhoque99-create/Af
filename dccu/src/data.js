/* DCCU — fan-made DC connected universe. Data only.
   Media codes: LF live-action film · LS live-action series · AF animated film · AS animated series · VG video game
   Story keys: Year N of the heroic age = 2020 + N. Real calendar years for the past; far future as years. */
(function (root) {
  const media = {
    LF: { label: 'Live-Action Film', short: 'Film', color: '#F2B632' },
    LS: { label: 'Live-Action Series', short: 'Series', color: '#E5484D' },
    AF: { label: 'Animated Film', short: 'Animated Film', color: '#9D7CFF' },
    AS: { label: 'Animated Series', short: 'Animated Series', color: '#2BC4B4' },
    VG: { label: 'Video Game', short: 'Game', color: '#4C9AFF' }
  };

  const chapters = [
    { n: 1, word: 'One', title: 'Dawn of Legends', years: '2028–2030', color: '#F2B632', motif: 'sun', pal: ['#07122b', '#1d4ed8', '#f6c343'],
      tag: 'The first heroes step into the light, and the world decides whether to trust them.' },
    { n: 2, word: 'Two', title: 'The Fourth World', years: '2031–2032', color: '#FF7B3A', motif: 'boom', pal: ['#12051f', '#7b2cbf', '#ffb703'],
      tag: 'Gods arrive from Apokolips and New Genesis, and Earth learns how small it is.' },
    { n: 3, word: 'Three', title: 'Blackest Night', years: '2033–2034', color: '#A07CFF', motif: 'spectrum', pal: ['#000000', '#140c24', '#8a2be2'],
      tag: 'Every color of light goes to war, and the dead refuse to stay buried.' },
    { n: 4, word: 'Four', title: 'The Dark Multiverse', years: '2035–2036', color: '#2BC4B4', motif: 'multiverse', pal: ['#03030a', '#0b3a46', '#4cc9f0'],
      tag: 'Broken timelines, evil twins, and the death of the New Gods.' },
    { n: 5, word: 'Five', title: 'Crisis', years: '2037–2039', color: '#FF4D4D', motif: 'crisis', pal: ['#120000', '#b5000c', '#ffffff'],
      tag: 'Fifty-two worlds. One survives.' },
    { n: 6, word: 'Six', title: 'Infinite Legacy', years: '2039–2041', color: '#5FB0FF', motif: 'kingdom', pal: ['#0b0603', '#9c6644', '#ffe8a3'],
      tag: 'The next generation inherits the light.' }
  ];

  // [id, title, medium, release YYYY-MM, chapter, storyKey, storyLabel, format, logline, plot, cast[], sources[], art{m,p,f}]
  const P = [];
  const add = (o) => P.push(o);

  /* ───────────── CHAPTER ONE · DAWN OF LEGENDS ───────────── */
  add({ id: 'birthright', t: 'Superman: Birthright', m: 'LF', r: '2028-06', ch: 1, sy: 2021, sl: 'Year 1', fmt: 'Feature film',
    log: 'The last son of Krypton shows the world who he is, and Lex Luthor shows the world what to fear.',
    plot: 'After years abroad as a freelance reporter, Clark Kent comes home to Metropolis, joins the Daily Planet and reveals himself as Superman. Lex Luthor, the boy genius who knew Clark in Smallville, answers by staging a fake Kryptonian invasion and turning the world against its new hero. His trump card is John Corben, rebuilt as Metallo around a beating heart of kryptonite. Post-credits: a LexCorp janitor named Rudy Jones touches a containment tank and starts to feed.',
    cast: ['superman', 'lex', 'metallo', 'parasite'],
    src: ['Superman: Birthright', 'Superman for All Seasons', 'Superman: Secret Origin', 'Action Comics (2011) #1–8'],
    art: { m: 'sun', p: ['#07122b', '#1d4ed8', '#f6c343'], f: 'cape' } });

  add({ id: 'long-halloween', t: 'Batman: The Long Halloween', m: 'LS', r: '2028-10', ch: 1, sy: 2021.4, sl: 'Years 1–2', fmt: 'Series · Season 1 · 10 episodes',
    log: 'One year. Twelve holidays. A killer nobody can catch, and a city about to meet its freaks.',
    plot: "Bruce Wayne's first year in the cowl bleeds into a murder mystery: someone is executing Carmine Falcone's mob one holiday at a time. Batman, Captain Jim Gordon and District Attorney Harvey Dent swear a pact to bring down the Roman, while Selina Kyle plays every side. Penguin, Riddler, Poison Ivy, Scarecrow and the swamp-born Solomon Grundy crawl out of the shadows. The finale births Two-Face, and a laughing stranger walks out of a chemical plant.",
    cast: ['batman', 'catwoman', 'twoface', 'penguin', 'riddler', 'ivy', 'scarecrow', 'grundy', 'joker'],
    src: ['Batman: Year One', 'Batman: The Long Halloween', 'Batman: Haunted Knight'],
    art: { m: 'city', p: ['#05070d', '#3b4a6b', '#e8a33d'], f: 'cowl' } });

  add({ id: 'historia', t: 'Wonder Woman: Historia', m: 'AS', r: '2028-12', ch: 1, sy: -1200, sl: 'c. 1200 BCE', fmt: 'Animated series · 8 episodes',
    log: 'Before Diana, there were the Amazons. This is how the gods made them, and how war nearly unmade them.',
    plot: 'A painted epic narrated by the goddesses who made the Amazons from the souls of murdered women. Hippolyta wins a crown and loses a sister, the sorceress Circe is exiled for wanting more, and Ares wages a war that drives the Amazons behind the veil to Themyscira. The final episode, centuries later, shows a queen shaping a daughter from clay and the gods breathing life into Diana.',
    cast: ['wonderwoman', 'ares', 'circe'],
    src: ['Wonder Woman Historia: The Amazons', 'Wonder Woman: Gods and Mortals', 'Wonder Woman: Earth One'],
    art: { m: 'temple', p: ['#1a0b14', '#9a1f2b', '#e9c46a'], f: 'none' } });

  add({ id: 'gods-mortals', t: 'Wonder Woman: Gods and Mortals', m: 'LF', r: '2029-03', ch: 1, sy: 2022, sl: 'Year 2', fmt: 'Feature film',
    log: "An Amazon princess comes to Man's World with a lasso, a sword and a warning: war is a god, and he is winning.",
    plot: "When pilot Steve Trevor crashes on Themyscira carrying evidence of a war conspiracy, Diana wins the contest to become the Amazons' emissary. In Man's World she finds Ares wearing a thousand faces, from arms dealers to generals, pushing two nations toward nuclear war. Her closest ally, archaeologist Barbara Minerva, holds the key to stopping him, along with an ancient curse that will make her the Cheetah.",
    cast: ['wonderwoman', 'ares', 'cheetah'],
    src: ["Wonder Woman (1987) #1–7 'Gods and Mortals'", 'Wonder Woman: Year One', 'Wonder Woman: Godwatch'],
    art: { m: 'temple', p: ['#0c1226', '#b3202c', '#f3c74f'], f: 'stand' } });

  add({ id: 'flash-year-one', t: 'The Flash: Year One', m: 'LF', r: '2029-06', ch: 1, sy: 2022.5, sl: 'Year 2', fmt: 'Feature film',
    log: 'Lightning strikes a forensic scientist, and a man from the future arrives to make sure he never gets fast enough.',
    plot: 'CSI Barry Allen is struck by lightning on the night the Speed Force wakes up. As he learns to run, a speedster in yellow appears at the edges of his life: Eobard Thawne, a man from the 25th century who knows Barry\'s future, and who killed Nora Allen. Captain Cold and his crew test the new hero\'s limits, while young Wally West watches his aunt Iris fall for the man in red. Post-credits: something very large and very smart stirs in an African jungle.',
    cast: ['barry', 'reverseflash', 'cold', 'wally', 'grodd'],
    src: ['The Flash: Year One (2019)', 'The Flash: Rebirth', 'Showcase #4'],
    art: { m: 'speed', p: ['#140404', '#c1121f', '#ffd23f'], f: 'stand' } });

  add({ id: 'brainiac-game', t: 'Superman: Brainiac', m: 'VG', r: '2029-11', ch: 1, sy: 2023, sl: 'Year 3', fmt: 'Open-world action game',
    log: 'Fly every street of Metropolis. Save as much of it as you can.',
    plot: 'Brainiac, the Collector of Worlds, arrives to add Metropolis to his museum of shrunken cities, the fate he dealt Kandor and Argo City long ago. Players fly a fully destructible Metropolis, intercept probes in orbit and finally board the Skull Ship. Lex Luthor offers help that nobody should accept. The canon ending costs Clark his father Jonathan, and frees a Kryptonian pod bound for Earth.',
    cast: ['superman', 'brainiac', 'lex', 'supergirl'],
    src: ['Superman: Brainiac (2008)', 'Action Comics #242', 'Superman: Panic in the Sky'],
    art: { m: 'tech', p: ['#03140f', '#1fa37a', '#b8ff6b'], f: 'cape' } });

  add({ id: 'gl-secret-origin', t: 'Green Lantern: Secret Origin', m: 'LF', r: '2029-12', ch: 1, sy: 2023.5, sl: 'Year 3', fmt: 'Feature film',
    log: 'In brightest day, in blackest night, a man without fear joins the oldest police force in the universe.',
    plot: "Test pilot Hal Jordan is chosen by a dying alien's ring because he is a man entirely without fear. On Oa he is trained by the Corps' greatest Lantern, Thaal Sinestro, and becomes the first recruit to question how Sinestro keeps his home world in line. On Earth, Carol Ferris holds Ferris Air together while a mortician's son named William Hand starts hearing the dead. Out in the dark, the Guardians' oldest prisoner, Atrocitus, swears a crimson oath.",
    cast: ['hal', 'sinestro', 'guardians', 'sapphire', 'blackhand', 'atrocitus'],
    src: ['Green Lantern: Secret Origin', 'Green Lantern: Emerald Dawn', "'Tygers' (Tales of the GL Corps Annual #2)"],
    art: { m: 'emerald', p: ['#020a06', '#0f8a4a', '#7dffb0'], f: 'stand' } });

  add({ id: 'dark-victory', t: 'Batman: Dark Victory', m: 'LS', r: '2030-02', ch: 1, sy: 2023.8, sl: 'Years 3–4', fmt: 'Series · Season 2 · 10 episodes',
    log: "The freaks have taken Gotham's underworld. Batman needs a partner, and a circus boy needs a family.",
    plot: "Two-Face breaks out of Arkham and a new killer, the Hangman, starts murdering the cops who put him there. Gotham's mob is gone, replaced by costumed criminals: the Joker, Scarecrow, Mr. Freeze and the rest. When the Flying Graysons fall to their deaths at Haly's Circus, Bruce sees his own grief in their son, and Robin is born. Selina Kyle leaves Gotham, and leaves Bruce wondering who she really is.",
    cast: ['batman', 'nightwing', 'twoface', 'joker', 'scarecrow', 'freeze', 'catwoman'],
    src: ['Batman: Dark Victory', 'Robin: Year One', 'Detective Comics #38'],
    art: { m: 'city', p: ['#08060c', '#5b2a86', '#e63946'], f: 'duo' } });

  add({ id: 'aquaman-trench', t: 'Aquaman: The Trench', m: 'LF', r: '2030-04', ch: 1, sy: 2024, sl: 'Year 4', fmt: 'Feature film',
    log: 'The king who refused his crown dives into the deep to face the things Atlantis buried.',
    plot: "Arthur Curry, the half-Atlantean son of a lighthouse keeper, has refused the throne of Atlantis for years. Then a race of eyeless predators rises from the Trench and starts devouring coastal towns. With Mera at his side, Arthur descends into the abyss and uncovers a lost chapter of Atlantean history. Waiting for him is David Hyde, who blames Aquaman for his father's death and has built a suit to make him pay. Post-credits: Arthur's half-brother Orm readies the Atlantean fleet.",
    cast: ['aquaman', 'manta', 'oceanmaster'],
    src: ['Aquaman: The Trench', 'Aquaman: The Others', 'The Atlantis Chronicles'],
    art: { m: 'ocean', p: ['#010b14', '#0b6e7a', '#f2c14e'], f: 'stand' } });

  add({ id: 'supergirl', t: 'Supergirl: Last Daughter of Krypton', m: 'LS', r: '2030-06', ch: 1, sy: 2024.3, sl: 'Year 4', fmt: 'Series · 8 episodes',
    log: 'She was sent to protect her baby cousin. She arrived thirty years late.',
    plot: "The pod freed in Superman: Brainiac crashes into Gotham Harbor carrying Kara Zor-El, who watched Krypton die and Brainiac bottle her home. Older than Clark but trapped in a teenager's life, Kara learns heroism on her own terms while hunting Brainiac's last probe across the planet. Her nights are haunted by a voice from the Phantom Zone: General Zod, who knew her father and promises to give her Krypton back.",
    cast: ['supergirl', 'superman', 'brainiac', 'zod'],
    src: ['Superman/Batman: The Supergirl from Krypton', 'Supergirl: Being Super', "Supergirl (2011) 'Last Daughter of Krypton'"],
    art: { m: 'stars', p: ['#0a0f2c', '#2b59c3', '#ff4d6d'], f: 'cape' } });

  add({ id: 'gaa', t: 'Green Arrow & Black Canary', m: 'LS', r: '2030-10', ch: 1, sy: 2024.6, sl: 'Years 4–5', fmt: 'Series · 10 episodes',
    log: "A billionaire with a bow, a singer with a scream, and a city that can't be fixed with trick arrows.",
    plot: "Oliver Queen comes back from five years on a lethal island and takes his bow to Star City's docks. His partner and conscience is Dinah Lance, a bar singer trained by the old boxer Ted Grant, whose sonic cry is a secret even from her mother. When Ollie's ward Roy Harper is caught running heroin through the port, Green Arrow learns there are problems arrows can't solve.",
    cast: ['greenarrow', 'canary', 'roy', 'wildcat'],
    src: ['Green Arrow: Year One', 'Green Arrow: The Longbow Hunters', "Green Lantern/Green Arrow 'Snowbirds Don't Fly'", 'Green Arrow: Quiver'],
    art: { m: 'city', p: ['#040a06', '#2d6a4f', '#f4d35e'], f: 'duo' } });

  add({ id: 'jl-nwo', t: 'Justice League: New World Order', m: 'LF', r: '2030-07', ch: 1, sy: 2025, sl: 'Year 5', fmt: 'Feature film · Chapter One finale',
    log: 'Aliens promise Earth paradise. Seven heroes and a fugitive from Mars know the price.',
    plot: "A team of alien heroes called the Hyperclan arrives promising to end war, famine and disease, and the world loves them. A fugitive hiding as Detective John Jones knows what they are: White Martians, the race that burned his world. When the Hyperclan frame Earth's heroes and Silas Stone rebuilds his dying son Victor with alien technology, Superman, Batman, Wonder Woman, The Flash, Green Lantern, Aquaman, Martian Manhunter and Cyborg finally stand together. Post-credits: on Apokolips, Darkseid studies the Mother Box inside Cyborg's chest.",
    cast: ['superman', 'batman', 'wonderwoman', 'barry', 'hal', 'aquaman', 'jonn', 'cyborg', 'darkseid'],
    src: ['JLA: New World Order', 'Justice League: Origin', 'Martian Manhunter: American Secrets'],
    art: { m: 'league', p: ['#050816', '#3a2a8c', '#ffd166'], f: 'team' } });

  /* ───────────── CHAPTER TWO · THE FOURTH WORLD ───────────── */
  add({ id: 'mister-miracle', t: 'Mister Miracle', m: 'LS', r: '2031-02', ch: 2, sy: 2026, sl: 'Year 6', fmt: 'Series · 9 episodes',
    log: 'The greatest escape artist in the universe tries the one escape nobody survives.',
    plot: "Scott Free escaped Apokolips, Granny Goodness and Darkseid himself. Now he has attempted the one escape no one comes back from, and the war between New Genesis and Apokolips drags him back as its general. With his wife Big Barda, the deadliest woman in two worlds, Scott faces Darkseid's price for peace: their newborn son, traded the way Highfather once traded Scott. Orion fights on the front lines while Metron watches from his Möbius Chair.",
    cast: ['scott', 'barda', 'orion', 'highfather', 'darkseid', 'metron', 'source'],
    src: ['Mister Miracle (2017)', "New Gods #7 'The Pact'", "Jack Kirby's Fourth World"],
    art: { m: 'boom', p: ['#12051f', '#7b2cbf', '#ffb703'], f: 'duo' } });

  add({ id: 'gl-corps', t: 'Green Lantern Corps', m: 'AS', r: '2031-03', ch: 2, sy: 2025.5, sl: 'Years 5–6', fmt: 'Animated series · 10 episodes',
    log: 'Thirty-six hundred sectors. One rookie from Detroit.',
    plot: 'Architect and ex-Marine John Stewart is picked as Earth\'s backup Lantern and shipped to Oa, where drill sergeant Kilowog breaks him down and builds him back up. Episode by episode the series tours the Corps across the universe, from a Lantern who is a living planet to a sector run by a hoarder named Larfleeze. The season ends with Sinestro\'s trial and exile to Qward, the antimatter world where fear is a weapon.',
    cast: ['john', 'sinestro', 'guardians', 'larfleeze', 'hal'],
    src: ['Tales of the Green Lantern Corps', 'Green Lantern Corps: Recharge', 'Green Lantern #87', 'Green Lantern: Agent Orange'],
    art: { m: 'emerald', p: ['#02080a', '#1b9e5a', '#ffe066'], f: 'stand' } });

  add({ id: 'shazam', t: 'Shazam!', m: 'LF', r: '2031-04', ch: 2, sy: 2026.2, sl: 'Year 6', fmt: 'Feature film',
    log: 'Say the word, and a foster kid gets the power of six legends. Say it again, and so does his family.',
    plot: 'Billy Batson follows a ghost train to the Rock of Eternity, where the dying wizard Shazam gives him the power of six legends. Billy shares the power with his new foster siblings, just as Dr. Sivana\'s hunt for magic frees the Seven Deadly Enemies of Man and a tiny worm called Mister Mind starts recruiting a Monster Society. Post-credits: in the ruins of Kahndaq, a man wrapped in black lightning opens his eyes.',
    cast: ['shazam', 'blackadam'],
    src: ['Shazam! (Justice League #7–21, 2012)', 'The Power of Shazam!', 'Shazam! and the Monster Society of Evil'],
    art: { m: 'lightning', p: ['#1a0505', '#c1121f', '#ffd60a'], f: 'cape' } });

  add({ id: 'titans', t: 'The New Teen Titans', m: 'AS', r: '2031-06', ch: 2, sy: 2026.6, sl: 'Years 6–7', fmt: 'Animated series · 2 seasons · 26 episodes',
    log: 'A half-demon girl needs a team. Her father is coming.',
    plot: "The empath Raven gathers Earth's young heroes to stop her father, the interdimensional conqueror Trigon. Robin, Kid Flash, Donna Troy, the alien princess Starfire, the shapeshifting Beast Boy and Cyborg become a family. Season two brings the mercenary Deathstroke and a contract to destroy the Titans from inside, signed by the girl they trusted most. Dick Grayson ends the series with a new name: Nightwing.",
    cast: ['raven', 'starfire', 'beastboy', 'donna', 'wally', 'nightwing', 'cyborg', 'trigon', 'deathstroke'],
    src: ['The New Teen Titans (1980)', 'The Terror of Trigon', "'Who Is Donna Troy?'", 'The Judas Contract'],
    art: { m: 'league', p: ['#0d0618', '#6a0dad', '#ff6b35'], f: 'team' } });

  add({ id: 'jsa', t: 'Justice Society: The Golden Age', m: 'LS', r: '2031-08', ch: 2, sy: 1941, sl: '1941–1951', fmt: 'Period series · 8 episodes',
    log: 'Before the League, there was the Society. History forgot why.',
    plot: "1941. America's first costumed heroes band together against the Axis: Jay Garrick's Flash, Alan Scott's Green Lantern, Hawkman and Hawkgirl, the boxer Wildcat, Doctor Fate and the ghostly Spectre. They battle Vandal Savage's war profiteering, the sorcerer Mordru and a swamp corpse called Solomon Grundy, while the Helm of Nabu slowly consumes Kent Nelson. The final episode jumps to 1951, when a Senate committee orders the heroes to unmask. They refuse, and vanish.",
    cast: ['jay', 'alan', 'hawkman', 'hawkgirl', 'wildcat', 'fate', 'spectre', 'savage', 'grundy', 'nabu', 'mordru'],
    src: ['The Golden Age (1993)', 'JSA (1999)', 'All-Star Comics #3', 'More Fun Comics #55'],
    art: { m: 'war', p: ['#120d06', '#7a5a2b', '#f0d29a'], f: 'team' } });

  add({ id: 'jli', t: 'Justice League International', m: 'AS', r: '2031-09', ch: 2, sy: 2027, sl: 'Year 7', fmt: 'Animated series · 13 episodes',
    log: "The world's most dysfunctional super-team, sponsored by the world's most charming man.",
    plot: "Businessman Maxwell Lord bankrolls a UN-backed Justice League International and gets a team only he could love: inventor Ted Kord as Blue Beetle, time-displaced glory hound Booster Gold, Black Canary, a hopelessly polite Plastic Man, Mister Terrific, suburbanites Mister Miracle and Big Barda, and a long-suffering Martian Manhunter as chairman. They beat Despero and bicker through everything else. The final episode is not a comedy: Ted finds out what Max has been building, and Max shoots him.",
    cast: ['ted', 'booster', 'maxlord', 'jonn', 'canary', 'plasticman', 'terrific', 'scott', 'barda', 'despero'],
    src: ['Justice League International (1987)', 'Booster Gold (1986)', 'Countdown to Infinite Crisis', 'Justice League of America #1'],
    art: { m: 'pop', p: ['#0b1a3a', '#2f80ed', '#f2c94c'], f: 'team' } });

  add({ id: 'court-owls', t: 'Batman: Court of Owls', m: 'VG', r: '2031-10', ch: 2, sy: 2028, sl: 'Year 8', fmt: 'Open-world action game · co-op',
    log: 'Beware the Court of Owls, that watches all the time.',
    plot: "Gotham's oldest nursery rhyme is true. Play as Batman and, for the first time, as Nightwing across an open-world Gotham, from the labyrinth beneath the city to the Court's masquerade. Dick Grayson learns he was meant to be the Court's greatest assassin. Side campaigns tell Mr. Freeze's tragedy, unleash Kirk Langstrom's Man-Bat serum and send a shapeshifting Clayface after the player.",
    cast: ['batman', 'nightwing', 'owls', 'freeze', 'manbat', 'clayface'],
    src: ['Batman: The Court of Owls', 'Night of the Owls', "Batman Annual #1 'First Snow'", 'Detective Comics #400'],
    art: { m: 'owl', p: ['#0b0906', '#5a4630', '#d9b26a'], f: 'none' } });

  add({ id: 'gotham-central', t: 'Gotham Central', m: 'LS', r: '2032-01', ch: 2, sy: 2027.5, sl: 'Years 7–8', fmt: 'Series · 10 episodes',
    log: "The cops who work Batman's city, with no capes, no powers and not much hope.",
    plot: "Detectives Renee Montoya and Crispus Allen work Major Crimes in a city where any case can end with a freak. A frame job by Two-Face, who is obsessed with Renee, exposes her private life to the whole department. The Penguin runs half the precinct's informants, and Mr. Freeze kills a cop in the pilot. In the finale, Crispus Allen is murdered by a dirty cop, and his body disappears from the morgue.",
    cast: ['renee', 'twoface', 'penguin', 'freeze', 'batman'],
    src: ['Gotham Central: Half a Life', 'Gotham Central: In the Line of Duty', "Gotham Central: 'Corrigan'"],
    art: { m: 'noir', p: ['#06080c', '#3a4a5c', '#5bc0eb'], f: 'none' } });

  add({ id: 'black-adam', t: 'Black Adam: Black Reign', m: 'LF', r: '2032-03', ch: 2, sy: 2028.2, sl: 'Year 8 · and ancient Kahndaq', fmt: 'Feature film',
    log: 'The first champion of Shazam comes home, and frees his nation with a massacre.',
    plot: "Thousands of years ago the wizard Shazam gave his power to Teth-Adam, who watched his family murdered and became Kahndaq's avenging god. Woken by Billy's arrival, Black Adam returns to a Kahndaq ruled by a dictator and frees it in a single bloody night. Amanda Waller starts building a team for men like him. He marries the goddess Isis and builds a family, and the world has to decide whether he is a liberator or a tyrant. Shazam must face the man who held his power first.",
    cast: ['blackadam', 'shazam', 'waller'],
    src: ['JSA: Black Reign', '52', 'Black Adam: The Dark Age', 'The Power of Shazam!'],
    art: { m: 'desert', p: ['#0f0a03', '#7a5c1e', '#ffd166'], f: 'cape' } });

  add({ id: 'doomsday', t: 'Superman: Doomsday', m: 'LF', r: '2032-06', ch: 2, sy: 2028.5, sl: 'Year 8', fmt: 'Feature film',
    log: 'Something was buried under Ohio to keep the world safe. It just got out.',
    plot: 'A creature bred on prehistoric Krypton to die, evolve and come back stronger tears out of its vault and through the Justice League. Doomsday leaves a trail of wreckage toward Metropolis, where Superman makes his last stand with Lois Lane watching from the rubble. The world holds a funeral for its greatest hero. Beneath Cadmus Labs, Lex Luthor starts growing a replacement.',
    cast: ['superman', 'doomsday', 'lex', 'supergirl', 'conner'],
    src: ['The Death of Superman', 'Superman/Doomsday: Hunter/Prey', 'Superman: Doomed'],
    art: { m: 'storm', p: ['#0d0505', '#7d1f1f', '#c9d1d9'], f: 'cape' } });

  add({ id: 'death-family', t: 'Batman: A Death in the Family', m: 'AF', r: '2032-08', ch: 2, sy: 2028.7, sl: 'Year 8', fmt: 'Animated feature · R-rated',
    log: "The worst year of Batman's life, in two acts.",
    plot: "Act one: the Joker shoots Commissioner Gordon's daughter Barbara through the spine to prove that one bad day can break anyone. Act two: the second Robin, a furious street kid named Jason Todd, chases the truth about his mother to Ethiopia and walks into the Joker's trap. Batman arrives too late. The film closes on a glass case in the Batcave, and on Barbara Gordon at a wall of monitors, choosing a new name: Oracle.",
    cast: ['batman', 'jason', 'joker', 'barbara'],
    src: ['Batman: A Death in the Family', 'Batman: The Killing Joke', "Suicide Squad #23 (Oracle's debut)", 'Batgirl: Year One'],
    art: { m: 'noir', p: ['#060606', '#2d6a4f', '#9d4edd'], f: 'cowl' } });

  add({ id: 'reign', t: 'Reign of the Supermen', m: 'AF', r: '2032-09', ch: 2, sy: 2029, sl: 'Years 8–9', fmt: 'Animated feature',
    log: 'Four Supermen. One shield. None of them are him.',
    plot: "Four heroes claim Superman's name: a cocky teenage clone from Cadmus, a man in steel armor, a ruthless Kryptonian program called the Eradicator and a cyborg who says he's Clark. Supergirl leads the hunt for the truth while the clone, who calls himself Conner, discovers his DNA is half Superman and half Lex Luthor. The real Superman returns from the Fortress in black, too late to save Coast City.",
    cast: ['conner', 'superman', 'supergirl', 'lex'],
    src: ['Reign of the Supermen', 'Superboy (1994)', "Teen Titans: A Kid's Game"],
    art: { m: 'sun', p: ['#0a0a12', '#3d3d5c', '#e63946'], f: 'team' } });

  add({ id: 'cosmic-odyssey', t: 'Justice League: Cosmic Odyssey', m: 'LF', r: '2032-12', ch: 2, sy: 2029.5, sl: 'Year 9', fmt: 'Feature film · Chapter Two finale',
    log: 'Darkseid and Highfather need the Justice League. That should terrify everyone.',
    plot: "The Anti-Life Equation, a living formula that can enslave every mind in creation, has broken loose, and only Darkseid and Highfather understand it. In an alliance nobody trusts, the New Gods split the League across the cosmos. Superman and Orion fly to Thanagar, Starfire and Batman hunt a cult on Earth, and Green Lantern John Stewart and Martian Manhunter reach the planet Xanshi, where John's pride costs a whole world. The League wins. Darkseid gets exactly what he wanted.",
    cast: ['superman', 'batman', 'jonn', 'john', 'starfire', 'orion', 'darkseid', 'highfather', 'metron', 'source'],
    src: ['Cosmic Odyssey (1988)', 'Legends (1986)', 'Justice League: The Darkseid War'],
    art: { m: 'boom', p: ['#05020f', '#3c096c', '#ff7b00'], f: 'team' } });

  /* ───────────── CHAPTER THREE · BLACKEST NIGHT ───────────── */
  add({ id: 'mosaic', t: 'Green Lantern: Mosaic', m: 'LS', r: '2033-02', ch: 3, sy: 2030, sl: 'Year 10', fmt: 'Series · 10 episodes',
    log: 'John Stewart let a planet die. The Guardians give him a way to answer for it.',
    plot: "Haunted by Xanshi, John Stewart is handed an impossible assignment. The Guardians have torn whole towns from a hundred worlds and stitched them together on Oa into the Mosaic, and John has to keep the peace among neighbors who hate each other. As he becomes the architect of a new kind of world, he notices the Corps' power batteries flickering yellow.",
    cast: ['john', 'guardians', 'sinestro', 'parallax'],
    src: ['Green Lantern: Mosaic (1992)', "Green Lantern Corps (2011) 'Fearsome'", 'Green Lantern: War Journal (2023)'],
    art: { m: 'emerald', p: ['#03100a', '#2a9d8f', '#f4a261'], f: 'stand' } });

  add({ id: 'sandman', t: 'The Sandman', m: 'AS', r: '2033-03', ch: 3, sy: 2030.1, sl: 'Year 10 · and the Dreaming', fmt: 'Adult animated series · 11 episodes',
    log: "The King of Dreams was imprisoned for a century. He's going to get his things back.",
    plot: 'Captured by an occultist in 1916 and held for a hundred years, Dream of the Endless escapes into a world that forgot him. To rebuild his kingdom he must recover his tools: a pouch of sand from John Constantine, a helm from a demon in Hell and a ruby from a madman, with the Martian Manhunter caught in the crossfire. Along the way he meets his family: Death, his cheerful older sister, and Destiny, Desire and Despair. In the last episode Lucifer Morningstar hands Dream the key to Hell.',
    cast: ['dream', 'death', 'destiny', 'desire', 'despair', 'lucifer', 'constantine', 'jonn'],
    src: ['The Sandman: Preludes & Nocturnes', 'The Doll\'s House', 'Season of Mists', "'The Sound of Her Wings'"],
    art: { m: 'dream', p: ['#04030f', '#2c2a6b', '#c7c3ff'], f: 'none' } });

  add({ id: 'red-hood', t: 'Batman: Under the Red Hood', m: 'LF', r: '2033-04', ch: 3, sy: 2030.3, sl: 'Year 10', fmt: 'Feature film',
    log: 'The Robin who died is back. He has a gun, a list, and a question for Batman.',
    plot: "A masked vigilante called the Red Hood takes over Gotham's drug trade by killing everyone above him. Batman and his new Robin, a teenage detective named Tim Drake who worked out Batman's identity on his own, discover the impossible: the Red Hood is Jason Todd, pulled from the grave by Ra's al Ghul's Lazarus Pit. Jason's demand is simple. Kill the Joker, or watch Jason do it.",
    cast: ['jason', 'batman', 'tim', 'joker', 'ras'],
    src: ['Batman: Under the Hood', 'Red Hood: The Lost Days', 'Batman: A Lonely Place of Dying'],
    art: { m: 'city', p: ['#0a0405', '#8d0801', '#f2e9e4'], f: 'cowl' } });

  add({ id: 'swamp-thing', t: 'Swamp Thing', m: 'LS', r: '2033-05', ch: 3, sy: 2030.4, sl: 'Year 10', fmt: 'Series · 8 episodes',
    log: 'Alec Holland died in the swamp. What came out of it was never a man.',
    plot: "Biologist Alec Holland is murdered in the Louisiana bayou, and a creature rises with his memories. When Swamp Thing learns he is the latest avatar of the Green, the force behind all plant life, his horror turns to wonder. A chain-smoking Englishman in a trench coat, John Constantine, arrives to warn him that America's ghosts are waking up. The Phantom Stranger watches every episode from the edges.",
    cast: ['swampthing', 'constantine', 'stranger'],
    src: ["Saga of the Swamp Thing: 'The Anatomy Lesson'", "Saga of the Swamp Thing: 'American Gothic'", 'Swamp Thing (2011)'],
    art: { m: 'swamp', p: ['#020a05', '#2d5016', '#a7f070'], f: 'none' } });

  add({ id: 'question', t: 'The Question', m: 'LS', r: '2033-06', ch: 3, sy: 2030.5, sl: 'Year 10', fmt: 'Series · 8 episodes',
    log: 'A man with no face asks the questions. A woman with nothing left inherits them.',
    plot: 'In the worst city in America, Hub City, reporter Vic Sage hides behind a faceless mask and a philosophy borrowed from a Zen master. When a terminal diagnosis gives him months to live, he picks an unlikely successor: ex-detective Renee Montoya, drinking herself to death after Gotham Central. Their last case together takes them to Kahndaq and a cult that treats crime as scripture.',
    cast: ['vicsage', 'renee', 'blackadam'],
    src: ['The Question (1987)', '52', 'The Question: The Deaths of Vic Sage'],
    art: { m: 'noir', p: ['#05090a', '#264653', '#e9c46a'], f: 'stand' } });

  add({ id: 'throne-atlantis', t: 'Aquaman: Throne of Atlantis', m: 'LF', r: '2033-07', ch: 3, sy: 2030.6, sl: 'Year 10', fmt: 'Feature film',
    log: 'Atlantis declares war on the surface. Its king has to choose a side.',
    plot: 'When a missile strike blamed on the surface sinks an Atlantean city, King Orm, the Ocean Master, floods Boston, Metropolis and Gotham. Arthur Curry has to take the throne from his brother to stop a war between his two worlds. In the chaos, Black Manta takes his revenge and murders Arthur and Mera\'s infant son. The film ends with Arthur crowned and Orm in chains.',
    cast: ['aquaman', 'oceanmaster', 'manta', 'superman', 'cyborg'],
    src: ['Aquaman: Throne of Atlantis', "'The Death of a Prince' (Adventure Comics, 1977)", 'Aquaman: Death of a King'],
    art: { m: 'ocean', p: ['#000814', '#003566', '#ffc300'], f: 'stand' } });

  add({ id: 'demon-knights', t: 'Demon Knights', m: 'AS', r: '2033-08', ch: 3, sy: 1150, sl: '12th century', fmt: 'Animated series · 10 episodes',
    log: "Camelot fell. Merlin's demon, an immortal brute and a witch are all that stand against the dark.",
    plot: "Years after Camelot's fall, the knight Jason Blood still shares his body with the rhyming demon Etrigan, a curse Merlin bound him with. Trapped in a village besieged by the Questing Queen's horde, Etrigan has to fight alongside the immortal caveman Vandal Savage, the sorceress Madame Xanadu and a knight in disguise. In the final episode, the witch-boy Klarion arrives from Limbo Town with a cat and a bargain.",
    cast: ['etrigan', 'savage', 'klarion'],
    src: ['Demon Knights (2011)', 'The Demon (1972)', 'The Demon (1987)'],
    art: { m: 'fire', p: ['#0d0402', '#9d0208', '#ffba08'], f: 'none' } });

  add({ id: 'birds-prey', t: 'Birds of Prey', m: 'LS', r: '2033-09', ch: 3, sy: 2030.8, sl: 'Year 10', fmt: 'Series · 10 episodes',
    log: 'Oracle sees everything. Black Canary hits everything. Huntress shoots everything.',
    plot: "From a clock tower above Gotham, Barbara Gordon runs the best information network on Earth as Oracle. Her field team is Black Canary, newly single and looking for a fight, and Helena Bertinelli, the Huntress, a mafia orphan with a crossbow whom Batman refuses to trust. Their first case pits them against a trafficking ring run out of the Penguin's Iceberg Lounge. Poison Ivy offers an alliance with strings attached.",
    cast: ['barbara', 'canary', 'huntress', 'penguin', 'ivy'],
    src: ['Birds of Prey: Of Like Minds', 'Birds of Prey: Sensei & Student', 'Huntress: Cry for Blood', 'Oracle: Year One'],
    art: { m: 'city', p: ['#0b0614', '#5a189a', '#4cc9f0'], f: 'team' } });

  add({ id: 'sinestro-corps', t: 'Green Lantern: Sinestro Corps War', m: 'VG', r: '2033-11', ch: 3, sy: 2031, sl: 'Year 11', fmt: 'Space action game · 4-player co-op',
    log: 'Fear has an army now. Pick a Lantern and hold the line.',
    plot: 'Exiled to Qward, Sinestro forges yellow rings powered by fear and recruits the most terrifying beings in the universe. Behind him stands the Anti-Monitor. Players fly as Hal Jordan, John Stewart, Guy Gardner or Kyle Rayner, building constructs in real time across Oa, Qward and a final battle above Earth. Mid-campaign, Parallax, the living embodiment of fear, possesses Kyle, and Ion, the entity of willpower, has to be awakened to save him.',
    cast: ['hal', 'john', 'sinestro', 'antimonitor', 'parallax', 'ion', 'guardians', 'larfleeze'],
    src: ['Green Lantern: The Sinestro Corps War', 'Green Lantern: Rebirth', 'Ion: Guardian of the Universe'],
    art: { m: 'emerald', p: ['#060600', '#b59f00', '#2dc653'], f: 'team' } });

  add({ id: 'identity-crisis', t: 'Identity Crisis', m: 'LS', r: '2034-01', ch: 3, sy: 2031.2, sl: 'Year 11', fmt: 'Limited series · 6 episodes',
    log: 'Someone is murdering the families of heroes. The answer is a secret the League buried.',
    plot: "When Sue Dibny, the wife of the Elongated Man, is murdered in her home, every hero on Earth hunts for the killer. The trail leads to a secret the League buried years ago: they let Zatanna wipe the mind of the villain Doctor Light after a horrific crime, and wiped Batman's memory when he objected. Deathstroke is hired to protect Light, Ray Palmer is pulled back in by his ex-wife Jean Loring, and the truth about the killer breaks the League's trust in itself.",
    cast: ['zatanna', 'drlight', 'ray', 'deathstroke', 'batman', 'greenarrow', 'hawkman', 'canary'],
    src: ['Identity Crisis (2004)'],
    art: { m: 'noir', p: ['#070707', '#4a4a4a', '#d00000'], f: 'none' } });

  add({ id: 'sacrifice', t: 'Wonder Woman: Sacrifice', m: 'LF', r: '2034-03', ch: 3, sy: 2031.4, sl: 'Year 11', fmt: 'Feature film',
    log: "Maxwell Lord has taken Superman's mind. Diana has one way to stop him.",
    plot: "Maxwell Lord, Ted Kord's killer, has seized the spy agency Checkmate and turned its satellites into an army of OMAC cyborgs. His masterstroke is controlling Superman's mind and sending him against Wonder Woman and Batman. With the Lasso of Truth around his throat, Max tells Diana the only way to free Superman. She kills him, on camera, and the world turns on her. Booster Gold mourns his best friend. Barbara Minerva, now the Cheetah, sees an opening.",
    cast: ['wonderwoman', 'maxlord', 'superman', 'batman', 'booster', 'cheetah'],
    src: ["Wonder Woman (1987) 'Sacrifice'", 'The OMAC Project', 'Countdown to Infinite Crisis', 'Wonder Woman: The Hiketeia'],
    art: { m: 'temple', p: ['#0a0a10', '#495057', '#e5383b'], f: 'stand' } });

  add({ id: 'last-son', t: 'Superman: Last Son of Krypton', m: 'LF', r: '2034-05', ch: 3, sy: 2031.6, sl: 'Year 11', fmt: 'Feature film',
    log: 'A Kryptonian child lands on Earth. His parents are General Zod and Ursa.',
    plot: 'A rocket crashes outside Metropolis carrying a boy named Lor-Zod, and Clark and Lois take him in. The boy is the key to the Phantom Zone, and his parents, General Zod and Ursa, come through it with an army of Kryptonian convicts. Lex Luthor answers the invasion with his own super-soldier, a broken clone of Superman who calls himself Bizarro. Kara comes face to face with the man who promised her Krypton.',
    cast: ['superman', 'zod', 'bizarro', 'lex', 'supergirl'],
    src: ['Superman: Last Son', 'Superman: New Krypton', 'Superman (1987) #22', 'Escape from Bizarro World'],
    art: { m: 'sun', p: ['#090909', '#3a0ca3', '#f72585'], f: 'cape' } });

  add({ id: 'rogue-war', t: 'The Flash: Rogue War', m: 'LF', r: '2034-06', ch: 3, sy: 2031.8, sl: 'Year 11', fmt: 'Feature film',
    log: 'The Rogues have a code. Zoom just broke it.',
    plot: "Captain Cold's Rogues have kept Central City's crime almost polite for years. Then Hunter Zolomon, a profiler crippled by a supervillain and remade as a speedster who bends time, decides Barry Allen needs tragedy to become a better hero. Zoom turns the Rogues on each other and takes aim at Barry's family. Wally West, now a grown Kid Flash, races beside his uncle for the first time. Gorilla Grodd uses the chaos to march on the city.",
    cast: ['barry', 'wally', 'zoom', 'cold', 'grodd', 'reverseflash'],
    src: ['The Flash: Rogue War', 'The Flash: Blitz', "Final Crisis: Rogues' Revenge", 'The Flash: Gorilla Warfare'],
    art: { m: 'speed', p: ['#020812', '#023e8a', '#ade8f4'], f: 'duo' } });

  add({ id: 'firestorm', t: 'Firestorm: The Nuclear Men', m: 'AS', r: '2034-07', ch: 3, sy: 2032, sl: 'Year 12', fmt: 'Animated series · 10 episodes',
    log: 'A jock and a physicist share one body, and the power of a star.',
    plot: 'A lab accident fuses high-school quarterback Ronnie Raymond and Nobel physicist Martin Stein into Firestorm, a nuclear man who can rewrite matter. They argue about everything, including who gets to drive. The final episodes follow Ronnie\'s death in a battle at the edge of space, and a teenager from Detroit, Jason Rusch, waking up merged with Professor Stein.',
    cast: ['firestorm'],
    src: ['Firestorm, the Nuclear Man (1978)', 'The Fury of Firestorm (1982)', 'Firestorm (2004)', 'The Fury of Firestorm: The Nuclear Men (2011)'],
    art: { m: 'atom', p: ['#120400', '#e85d04', '#ffd60a'], f: 'stand' } });

  add({ id: 'task-force-x', t: 'Suicide Squad: Task Force X', m: 'LS', r: '2034-08', ch: 3, sy: 2032.2, sl: 'Year 12', fmt: 'Series · 8 episodes',
    log: 'Amanda Waller sends the worst people on Earth on missions nobody comes back from.',
    plot: "After Black Adam's rampage, Amanda Waller gets her deniable strike team: Harley Quinn, Killer Croc, Bane, Black Manta and Deathstroke, each with a bomb in their neck. Missions take them from Kahndaq to Apokolips' hidden outposts on Earth. Harley's past as Dr. Harleen Quinzel, the Arkham psychiatrist who fell for the Joker, threads through every episode, as does her growing friendship with Poison Ivy.",
    cast: ['waller', 'harley', 'croc', 'bane', 'manta', 'deathstroke', 'ivy'],
    src: ['Suicide Squad (1987)', 'Harleen (2019)', 'Secret Six (2008)', "Suicide Squad (2016) 'Black Vault'"],
    art: { m: 'noir', p: ['#0a0a0a', '#3d0e61', '#ff006e'], f: 'team' } });

  add({ id: 'blackest-night', t: 'Blackest Night', m: 'LF', r: '2034-11', ch: 3, sy: 2032.6, sl: 'Year 12', fmt: 'Feature film · Chapter Three finale',
    log: 'The dead rise across the universe. Every color of light has to fight together.',
    plot: "Black Hand, now the servant of the death-lord Nekron, raises the fallen as Black Lanterns: Ted Kord, Ronnie Raymond's Firestorm and Solomon Grundy among them. The only weapon against them is light, and Hal Jordan has to unite every Corps of the emotional spectrum, from Sinestro's yellow and Atrocitus's red to Larfleeze's orange and Carol Ferris's violet. The heroes deputize each other with borrowed rings, and Barry Allen and Green Arrow wear colors they never imagined. The red entity, the Butcher, refuses to serve anyone.",
    cast: ['hal', 'john', 'sinestro', 'atrocitus', 'larfleeze', 'sapphire', 'blackhand', 'nekron', 'butcher', 'guardians', 'firestorm', 'ted', 'greenarrow', 'grundy', 'barry'],
    src: ['Blackest Night (2009)', 'Green Lantern: Rage of the Red Lanterns', 'Green Lantern: Agent Orange', 'Solomon Grundy (2009)'],
    art: { m: 'spectrum', p: ['#000000', '#120a1e', '#8a2be2'], f: 'team' } });

  /* ───────────── CHAPTER FOUR · THE DARK MULTIVERSE ───────────── */
  add({ id: 'lucifer', t: 'Lucifer', m: 'LS', r: '2035-01', ch: 4, sy: 2032.8, sl: 'Year 12', fmt: 'Series · 10 episodes',
    log: 'The Devil quit. Now he wants to build a universe of his own.',
    plot: "Lucifer Morningstar closed Hell, gave the key to Dream and opened a piano bar in Los Angeles. Then Heaven asks him for a favor, and he finds a way to create a cosmos outside the Presence's design. His brother Michael Demiurgos, the angel who holds the power of creation, is dragged into the scheme. A teenage girl named Elaine Belloc, who turns out to be Michael's daughter, becomes the most important person in creation.",
    cast: ['lucifer', 'michael', 'elaine', 'presence'],
    src: ['Lucifer (2000)', 'The Sandman: Season of Mists', 'The Sandman Universe: Lucifer'],
    art: { m: 'fire', p: ['#0a0302', '#7f1d1d', '#fbbf24'], f: 'stand' } });

  add({ id: 'blue-beetle', t: 'Blue Beetle', m: 'LS', r: '2035-02', ch: 4, sy: 2033, sl: 'Year 13', fmt: 'Series · 8 episodes',
    log: 'A teenager from El Paso finds a scarab. The scarab finds a host.',
    plot: "After Ted Kord's death, an ancient alien scarab fuses itself to the spine of Jaime Reyes, a sixteen-year-old in El Paso. It talks, it grows weapons out of his back, and it was built to conquer Earth for an empire called the Reach. Jaime's family becomes his mission control while he fights the Reach's sleeper agents. Booster Gold shows up insisting Ted would have liked him.",
    cast: ['jaime', 'booster', 'ted'],
    src: ['Blue Beetle: Shellshocked (2006)', 'Blue Beetle: Graduation Day', 'Blue & Gold (2021)'],
    art: { m: 'tech', p: ['#020617', '#1e40af', '#38bdf8'], f: 'stand' } });

  add({ id: 'flashpoint', t: 'Flashpoint', m: 'LF', r: '2035-03', ch: 4, sy: 2033.2, sl: 'Year 13 · an erased timeline', fmt: 'Feature film',
    log: 'Barry Allen saves his mother, and breaks the world.',
    plot: "Barry Allen wakes in a world where his mother is alive and he has no powers. Here Aquaman's Atlantis and Wonder Woman's Amazons are fighting a war that has drowned Europe, Superman is a starving prisoner and Batman is Thomas Wayne, a father who lost his son. Barry has to rebuild his powers and undo the one wish he always had, with the Reverse-Flash taunting him the whole way. When time snaps back, it doesn't heal right, and someone far outside it is watching.",
    cast: ['barry', 'reverseflash', 'batman', 'aquaman', 'wonderwoman', 'superman', 'cyborg', 'monitor'],
    src: ['Flashpoint (2011)', 'The Flash: Rebirth', 'The Button'],
    art: { m: 'speed', p: ['#0f0700', '#b45309', '#fde68a'], f: 'stand' } });

  add({ id: 'jld', t: 'Justice League Dark', m: 'LF', r: '2035-05', ch: 4, sy: 2033.4, sl: 'Year 13', fmt: 'Feature film',
    log: 'Magic is dying. The people who use it are the only ones who can save it.',
    plot: "When the Upside-Down Man starts devouring Earth's magic, Wonder Woman recruits the people the League doesn't talk about: John Constantine, the stage magician and real sorceress Zatanna, Swamp Thing, the ghost Deadman and Khalid Nassour, a medical student who has just inherited the Helm of Fate from Kent Nelson. Their deal with Etrigan goes about as well as you would expect, Man-Bat turns out to be the team's best researcher, and Klarion plays both sides. The Phantom Stranger warns them each will pay a price.",
    cast: ['constantine', 'zatanna', 'swampthing', 'deadman', 'fate', 'etrigan', 'wonderwoman', 'stranger', 'nabu', 'klarion', 'manbat'],
    src: ['Justice League Dark (2018)', 'Justice League Dark (2011)', 'Doctor Fate (2015)', 'Deadman (Neal Adams)'],
    art: { m: 'magic', p: ['#060312', '#4c1d95', '#22d3ee'], f: 'team' } });

  add({ id: 'tales-multiverse', t: 'Tales of the Multiverse', m: 'AS', r: '2035-06', ch: 4, sy: 2033.5, sl: 'Earths 1–52', fmt: 'Animated anthology · 12 episodes',
    log: 'Fifty-two universes. Twelve of their stories. One boy watching all of them.',
    plot: "A young Monitor named Nix Uotan is assigned to watch the Multiverse, and every episode is a different Earth. A Soviet Superman raised on a collective farm. A Victorian Batman hunting Jack the Ripper. A boy named Clark Kent in a world where Superman is only a comic book. A Gotham where a cured Joker runs for city council. The finale reveals that something is eating the stories from outside: the vampire god Mandrakk.",
    cast: ['nix', 'mandrakk', 'superman', 'batman', 'joker', 'monitor'],
    src: ['The Multiversity', 'Superman: Red Son', 'Gotham by Gaslight', 'Superman: Secret Identity', 'Batman: White Knight', 'Final Crisis: Superman Beyond'],
    art: { m: 'multiverse', p: ['#03030a', '#3a0ca3', '#4cc9f0'], f: 'none' } });

  add({ id: 'forever-evil', t: 'Justice League: Forever Evil', m: 'LF', r: '2035-07', ch: 4, sy: 2033.6, sl: 'Year 13', fmt: 'Feature film',
    log: 'The League is gone. The Crime Syndicate rules Earth. Lex Luthor is the last hope.',
    plot: "The Crime Syndicate, evil doubles of the Justice League from Earth-3, arrive through a breach in the Multiverse and trap the League inside Firestorm's matrix. With Superman, Batman and Wonder Woman gone, the world's villains join the Syndicate's Secret Society, and Gorilla Grodd turns Central City into a slaughterhouse. The resistance is a coalition of the unlikely: Lex Luthor, Cyborg, Captain Cold, Black Manta and Bizarro, with Parasite as hired muscle. The Syndicate was running from something.",
    cast: ['lex', 'cyborg', 'cold', 'manta', 'bizarro', 'grodd', 'parasite', 'firestorm', 'batman'],
    src: ['Forever Evil (2013)', 'Forever Evil: Rogues Rebellion', 'Forever Evil: Arkham War'],
    art: { m: 'metal', p: ['#050000', '#5c0a0a', '#ff3b3b'], f: 'team' } });

  add({ id: 'tornado-path', t: "Justice League of America: The Tornado's Path", m: 'AF', r: '2035-09', ch: 4, sy: 2033.8, sl: 'Year 13', fmt: 'Animated feature',
    log: 'An android searches for a soul. A new League forms around the question.',
    plot: "Red Tornado, an android built by the villain T.O. Morrow, wants to be human, and someone is stealing his body to build the ultimate android, Amazo. Black Canary assembles a new Justice League of America to find him: Green Lantern John Stewart, Black Lightning, Vixen, Hawkgirl and Roy Harper, now Red Arrow. The answer to Tornado's question arrives in the last scene, with a real heartbeat.",
    cast: ['redtornado', 'canary', 'john', 'blacklightning', 'vixen', 'hawkgirl', 'roy'],
    src: ["Justice League of America (2006) 'The Tornado's Path'", 'Justice League of America #64', 'Vixen: Return of the Lion'],
    art: { m: 'tornado', p: ['#0a0204', '#9d0208', '#f48c06'], f: 'none' } });

  add({ id: 'knightfall', t: 'Batman: Knightfall', m: 'LS', r: '2035-10', ch: 4, sy: 2034, sl: 'Year 14', fmt: 'Series · Season 3 · 10 episodes',
    log: 'Bane opens Arkham, wears Batman down one villain at a time, and then breaks him.',
    plot: 'A genius raised in a Caribbean prison and fueled by the drug Venom, Bane blows open Arkham Asylum. Batman spends three months recapturing the Joker, the Riddler, Scarecrow, Poison Ivy, Killer Croc and the rest, and comes home exhausted to find Bane waiting in the Batcave. Robin and Nightwing hold Gotham together while Bruce learns to walk again.',
    cast: ['bane', 'batman', 'tim', 'nightwing', 'joker', 'riddler', 'scarecrow', 'ivy', 'croc'],
    src: ['Batman: Knightfall', 'Vengeance of Bane', 'Batman: Prodigal', 'Arkham Asylum: A Serious House on Serious Earth'],
    art: { m: 'city', p: ['#0b0b0b', '#495057', '#ffba08'], f: 'cowl' } });

  add({ id: 'books-magic', t: 'Justice League Dark: The Books of Magic', m: 'VG', r: '2035-11', ch: 4, sy: 2034.2, sl: 'Year 14', fmt: 'Action RPG · single-player',
    log: 'Choose your magician. Pay your price.',
    plot: "A boy named Tim Hunter is destined to be the most powerful magician alive, and four mystics take him on a tour of magic's past, present and future. Players build their own sorcerer under Constantine, Zatanna, Doctor Fate and Deadman, choosing schools of magic that permanently change the story. Death drops by for a conversation. The final act descends into the Dreaming, where Klarion and the Lord of Order Nabu each want Tim's power.",
    cast: ['constantine', 'zatanna', 'fate', 'deadman', 'klarion', 'nabu', 'stranger', 'etrigan', 'death'],
    src: ['The Books of Magic (1990)', 'Justice League Dark (2018)', 'Seven Soldiers: Klarion', 'Zatanna: Everyday Magic'],
    art: { m: 'magic', p: ['#040807', '#14532d', '#fde047'], f: 'none' } });

  add({ id: 'black-lightning', t: 'Black Lightning', m: 'LS', r: '2036-01', ch: 4, sy: 2034.3, sl: 'Year 14', fmt: 'Series · 10 episodes',
    log: 'A high-school principal by day. The man who lights up Suicide Slum by night.',
    plot: 'Jefferson Pierce, Olympic decathlete turned principal, returns to the Metropolis neighborhood that raised him and takes on the gang called the 100 as Black Lightning. His old friend Mari McCabe, the totem-wielding Vixen, helps him follow the money behind the gang, and the trail leads all the way up to LexCorp.',
    cast: ['blacklightning', 'vixen', 'lex'],
    src: ['Black Lightning (1977)', 'Black Lightning: Year One', 'Black Lightning: Cold Dead Hands'],
    art: { m: 'lightning', p: ['#03040a', '#1d3557', '#90e0ef'], f: 'stand' } });

  add({ id: 'batwoman', t: 'Batwoman: Elegy', m: 'LS', r: '2036-02', ch: 4, sy: 2034.4, sl: 'Year 14', fmt: 'Series · 8 episodes',
    log: 'Kate Kane was thrown out of West Point for telling the truth. Gotham could use that.',
    plot: "Expelled from West Point under \"Don't Ask, Don't Tell,\" Kate Kane takes up the bat with her father's military training behind her. Her enemy is the high madame of a crime cult, Alice, who speaks only in Lewis Carroll and wears the face of Kate's dead twin sister. Renee Montoya, Kate's ex, follows the case. Batman keeps his distance and keeps watch.",
    cast: ['batwoman', 'renee', 'batman'],
    src: ['Detective Comics: Elegy', 'Batwoman: Hydrology', '52'],
    art: { m: 'city', p: ['#080204', '#6a040f', '#f8f9fa'], f: 'cowl' } });

  add({ id: 'son-demon', t: 'Batman: Son of the Demon', m: 'LF', r: '2036-04', ch: 4, sy: 2034.6, sl: 'Year 14', fmt: 'Feature film',
    log: "Ra's al Ghul wants an heir. Talia gives Bruce a son.",
    plot: "Ra's al Ghul, the centuries-old master of the League of Assassins, has spent years trying to make Batman his successor. When Bruce refuses for the last time, Talia al Ghul introduces him to Damian, the ten-year-old son she raised to be a killer. Ra's uses the boy to steal Batman's secret contingency plans for defeating every member of the Justice League, and the League is taken apart one hero at a time.",
    cast: ['batman', 'damian', 'ras', 'jonn', 'superman', 'wonderwoman'],
    src: ['Batman and Son', 'JLA: Tower of Babel', 'Batman: Birth of the Demon', "'Daughter of the Demon' (Batman #232)"],
    art: { m: 'desert', p: ['#0a0603', '#4a2c0f', '#2ec4b6'], f: 'duo' } });

  add({ id: 'stargirl', t: 'Stargirl & the Justice Society', m: 'LS', r: '2036-05', ch: 4, sy: 2034.7, sl: 'Year 14', fmt: 'Series · 10 episodes',
    log: "A sophomore finds a cosmic staff in her stepdad's garage, and brings back the Justice Society.",
    plot: "Courtney Whitmore discovers that her stepfather Pat once fought beside the Justice Society, and that the Cosmic Staff in his garage has chosen her. She tracks down the surviving heroes, now in their nineties: Jay Garrick, Alan Scott and the cranky Ted Grant. Michael Holt, the third-smartest man on Earth, becomes the new team's Mister Terrific. The sorcerer Mordru comes back for the Helm of Fate, and Jay knows exactly how dangerous he is.",
    cast: ['stargirl', 'jay', 'alan', 'wildcat', 'terrific', 'mordru', 'fate'],
    src: ['Stars and S.T.R.I.P.E. (1999)', 'JSA (1999)', 'Justice Society of America: The Next Age', 'Stargirl: The Lost Children'],
    art: { m: 'stars', p: ['#0b0b2a', '#b5179e', '#ffd60a'], f: 'team' } });

  add({ id: 'lobo', t: 'Lobo: The Last Czarnian', m: 'AF', r: '2036-06', ch: 4, sy: 2034.8, sl: 'Year 14', fmt: 'Animated feature · R-rated',
    log: 'The last of his kind. Because he killed the rest.',
    plot: "Lobo, the galaxy's most feared bounty hunter, takes a job escorting his old schoolteacher across space and is annoyed to discover he isn't allowed to kill her. The space police of L.E.G.I.O.N. want him, a planet of nuns wants him and the Justice League would like him off Earth. It is loud, filthy and over in eighty-five minutes.",
    cast: ['lobo'],
    src: ['Lobo: The Last Czarnian (1990)', "Lobo's Back", 'L.E.G.I.O.N.'],
    art: { m: 'pop', p: ['#0b0b0b', '#5c677d', '#e63946'], f: 'stand' } });

  add({ id: 'revelations', t: 'Final Crisis: Revelations', m: 'AF', r: '2036-08', ch: 4, sy: 2035, sl: 'Year 15', fmt: 'Animated feature',
    log: "God's wrath has a new host: a murdered Gotham cop. His old partner is the Question.",
    plot: "Crispus Allen, murdered in Gotham Central, has become the host of the Spectre, the Wrath of God. As Darkseid's Final Crisis begins, he is sent to punish Doctor Light and the cult of the Crime Bible, and the cult's chosen champion is Renee Montoya, the new Question. She has to decide whether to fight God's spirit of vengeance or the friend trapped inside it.",
    cast: ['spectre', 'renee', 'drlight', 'presence'],
    src: ['Final Crisis: Revelations', 'Crime Bible: The Five Lessons of Blood', 'The Spectre (1992)'],
    art: { m: 'magic', p: ['#020604', '#1b4332', '#e9fff0'], f: 'stand' } });

  add({ id: 'final-crisis', t: 'Final Crisis', m: 'LF', r: '2036-12', ch: 4, sy: 2035.3, sl: 'Year 15', fmt: 'Feature film · Chapter Four finale',
    log: 'Darkseid falls through time and drags the universe down with him. Evil wins.',
    plot: "Orion is murdered, and Darkseid, reborn in a stolen human body, broadcasts the Anti-Life Equation across the internet. Within a week most of humanity belongs to him and the Justice League falls one hero at a time. Superman leaves Earth on a mission across the Multiverse to face Mandrakk, Metron arms the last free minds, and Mister Miracle and Big Barda smuggle survivors out. Batman breaks his one rule and shoots Darkseid with a god-killing bullet, and Darkseid's Omega Beams erase him.",
    cast: ['darkseid', 'orion', 'batman', 'superman', 'jonn', 'metron', 'mandrakk', 'nix', 'scott', 'barda', 'source'],
    src: ['Final Crisis (2008)', 'Final Crisis: Superman Beyond', 'Seven Soldiers', 'Death of the New Gods'],
    art: { m: 'boom', p: ['#000000', '#370617', '#e85d04'], f: 'cape' } });

  /* ───────────── CHAPTER FIVE · CRISIS ───────────── */
  add({ id: 'batman-robin', t: 'Batman & Robin', m: 'LS', r: '2037-01', ch: 5, sy: 2035.5, sl: 'Year 15', fmt: 'Series · 10 episodes',
    log: 'Bruce Wayne is gone. Dick Grayson wears the cowl. Damian Wayne does not approve.',
    plot: "With Bruce gone, Dick Grayson reluctantly becomes Batman, and Damian Wayne becomes the most arrogant, and most effective, Robin Gotham has seen. A smiling Batman and a scowling Robin take on the Circus of Strange and a horrifying Professor Pyg, while Jason Todd and Tim Drake each argue they should have had the cowl. Meanwhile Thomas Elliot, the surgeon called Hush, has carved his face into Bruce Wayne's and is spending the Wayne fortune.",
    cast: ['nightwing', 'damian', 'hush', 'jason', 'tim'],
    src: ['Batman & Robin (2009)', 'Batman: Hush', 'Batman: Heart of Hush', 'Batman: Streets of Gotham'],
    art: { m: 'city', p: ['#04080f', '#1d4e89', '#e63946'], f: 'duo' } });

  add({ id: 'hawkman', t: 'Hawkman: Endless Flight', m: 'LF', r: '2037-03', ch: 5, sy: -1500, sl: 'c. 1500 BCE to Year 15', fmt: 'Feature film',
    log: 'In every life, they find each other. In every life, they die.',
    plot: "In ancient Egypt, Prince Khufu and Chay-Ara found a ship made of alien Nth metal and were murdered for it by Vandal Savage. They have been reborn ever since: as a gunslinger, a knight, a 1940s archaeologist named Carter Hall. In the present, Carter remembers every life and Kendra Saunders remembers none. When they finally decode the ship, they learn Nth metal didn't come from the stars. It came from somewhere darker, and something there has been waiting for them to open the door.",
    cast: ['hawkman', 'hawkgirl', 'savage', 'barbatos'],
    src: ['Hawkman (2018)', 'JSA: The Return of Hawkman', 'Hawkman: Endless Flight (2002)', 'Hawkworld'],
    art: { m: 'wings', p: ['#0b0604', '#7f4f24', '#ffd166'], f: 'none' } });

  add({ id: 'return-bruce', t: 'Batman: The Return of Bruce Wayne', m: 'VG', r: '2037-05', ch: 5, sy: -50000, sl: '50,000 BCE to Year 15', fmt: 'Time-travel action-adventure game',
    log: 'Batman wakes up in the Stone Age. He has to fight his way home through all of history.',
    plot: "Darkseid's Omega Beams didn't kill Bruce Wayne. They threw him into the deep past with no memory and a cape. Each chapter is a new era and a new genre: a caveman fighting Vandal Savage's tribe, a Puritan witch hunt, a pirate voyage, a frontier western and a 1940s noir. Every jump charges Bruce with Omega energy, which is what Darkseid intended: a time bomb set to go off when he reaches the present. Something with bat wings follows him through the dark.",
    cast: ['batman', 'savage', 'barbatos', 'darkseid'],
    src: ['Batman: The Return of Bruce Wayne', 'Batman R.I.P.', 'Dark Nights: Metal'],
    art: { m: 'time', p: ['#0b0704', '#6f4518', '#90e0ef'], f: 'cowl' } });

  add({ id: 'american-secrets', t: 'Martian Manhunter: American Secrets', m: 'LS', r: '2037-06', ch: 5, sy: 1955, sl: '1955–1959', fmt: 'Period noir series · 6 episodes',
    log: '1955. A Martian arrives in small-town America and learns how much people hide.',
    plot: "Pulled to Earth by Dr. Saul Erdel's experiment, J'onn J'onzz hides as Detective John Jones in a picture-perfect Eisenhower-era town. Shapeshifting and telepathy let him see the secrets under the picket fences: segregation, Red Scare paranoia and a government program that wants him on a dissection table. The series is framed in the present, where J'onn explains to the League why he chose to trust humanity anyway.",
    cast: ['jonn'],
    src: ['Martian Manhunter: American Secrets (1992)', 'Detective Comics #225', 'Martian Manhunter: Identity (2018)'],
    art: { m: 'noir', p: ['#06100c', '#1b4d3e', '#f4a259'], f: 'stand' } });

  add({ id: 'war-gods', t: 'Wonder Woman: War of the Gods', m: 'LF', r: '2037-07', ch: 5, sy: 2035.7, sl: 'Year 15', fmt: 'Feature film',
    log: 'Circe turns every pantheon on Earth against the others. Diana is caught in the middle.',
    plot: "The sorceress Circe, exiled since the age of the Amazons, sets the gods of Olympus, Egypt, Babylon and Asgard against each other. As holy wars break out across Earth, Diana, still reviled for killing Maxwell Lord, has to win back the world's trust and her sister Donna Troy's. Shazam's patrons are drawn into the war. Barbara Minerva offers Circe her service in exchange for a cure, and Ares sees a war coming and picks an unexpected side.",
    cast: ['wonderwoman', 'circe', 'donna', 'cheetah', 'ares', 'shazam'],
    src: ['War of the Gods (1991)', "Wonder Woman (2016) 'The Truth'", 'Wonder Woman: The Just War', 'The Return of Donna Troy'],
    art: { m: 'temple', p: ['#0d0614', '#5a189a', '#ffd166'], f: 'stand' } });

  add({ id: 'static', t: 'Static Shock', m: 'AS', r: '2037-09', ch: 5, sy: 2035.8, sl: 'Year 15', fmt: 'Animated series · 13 episodes',
    log: 'A freshman in Dakota gets electric powers. His homework is still due.',
    plot: "Virgil Hawkins, a comic-book-loving fifteen-year-old, is caught in the Big Bang, a gang war where an experimental police gas gave dozens of Dakota kids strange powers. As Static he rides manhole covers through the sky and fights the Bang Babies who went bad, while juggling his dad, his sister and his best friend Richie. A visiting Black Lightning becomes a mentor.",
    cast: ['static', 'blacklightning'],
    src: ['Static (1993)', 'Static: Season One', 'Static Shock: Rebirth of the Cool'],
    art: { m: 'lightning', p: ['#050510', '#3a0ca3', '#4cc9f0'], f: 'stand' } });

  add({ id: 'atom', t: 'The Atom: Sword of the Atom', m: 'AF', r: '2037-10', ch: 5, sy: 2036, sl: 'Year 16', fmt: 'Animated feature',
    log: 'Ray Palmer is stuck six inches tall in a jungle full of alien barbarians. His student comes looking.',
    plot: "After Identity Crisis, Ray Palmer shrinks himself out of sight and ends up in the Amazon rainforest, where he finds a lost colony of tiny alien warriors and becomes their swordsman. Back in Ivy Town his student Ryan Choi finds Ray's notes and a size-changing belt, and starts shrinking through a universe of weird science to bring him home. The time thief Chronos wants the belt for himself.",
    cast: ['ray', 'ryan', 'chronos'],
    src: ['Sword of the Atom (1983)', 'The All-New Atom (2006)', 'Chronos (1998)'],
    art: { m: 'atom', p: ['#020c0a', '#2b9348', '#80ffdb'], f: 'stand' } });

  add({ id: 'metal', t: 'Dark Nights: Metal', m: 'LF', r: '2037-12', ch: 5, sy: 2036.2, sl: 'Year 16', fmt: 'Feature film',
    log: 'Under the Multiverse is a dark ocean. Batman is the door.',
    plot: "Bruce Wayne makes it home from the past, and the Omega energy in his body opens a door to the Dark Multiverse, a churning ocean of failed worlds beneath reality. Through it comes Barbatos, a bat-god, with an army of evil Batmen. Hawkman's Nth metal is the only weapon that works, and the League follows the trail back to the dawn of the cosmos, where the World Forger, Alpheus, shapes universes and throws the broken ones away.",
    cast: ['batman', 'barbatos', 'worldforger', 'hawkman', 'hawkgirl', 'superman', 'wonderwoman', 'cyborg', 'barry'],
    src: ['Dark Nights: Metal (2017)', 'Dark Days: The Forge', 'Batman: Lost'],
    art: { m: 'metal', p: ['#040306', '#3c1a5b', '#c0c0c0'], f: 'cowl' } });

  add({ id: 'brief-lives', t: 'The Sandman: Brief Lives', m: 'AS', r: '2038-02', ch: 5, sy: 2036.3, sl: 'Year 16', fmt: 'Adult animated series · Season 2 · 9 episodes',
    log: 'Delirium wants to find their missing brother. Dream agrees to drive.',
    plot: "Three hundred years ago Destruction of the Endless walked away from his duties. Delirium, who was once Delight, is determined to find him, and Dream joins her road trip for reasons he won't admit. Everyone who knows where Destruction went is dying in strange accidents, and Death visits each of them. Destruction, painting on a Greek island, has a warning: the Endless are not as permanent as they think, and neither is the Multiverse.",
    cast: ['dream', 'delirium', 'destruction', 'death', 'desire', 'despair', 'destiny'],
    src: ['The Sandman: Brief Lives', 'Sandman: Endless Nights', 'Death: The High Cost of Living', "Delirium's Party"],
    art: { m: 'dream', p: ['#08020f', '#7b2cbf', '#ff9ef6'], f: 'none' } });

  add({ id: 'booster', t: 'Booster Gold', m: 'LS', r: '2038-04', ch: 5, sy: 2036.4, sl: 'Year 16 · and the 25th century', fmt: 'Series · 10 episodes',
    log: "The greatest hero you've never heard of. These days he prefers it that way.",
    plot: "Michael Jon Carter came from the 25th century to get rich being a superhero. Since Ted Kord's death he has worked for the Time Masters, secretly repairing the timeline while the public thinks he's a joke. Hunted by the time pirate Chronos and an armored ghost called the Time Trapper, Booster discovers the Multiverse has been rewritten before, by a war called the Crisis, and that it is about to happen again. Jaime Reyes helps him keep Ted's memory alive.",
    cast: ['booster', 'chronos', 'trapper', 'ted', 'jaime'],
    src: ["Booster Gold (2007) '52 Pick-Up'", '52', 'Booster Gold (1986)', 'Blue & Gold'],
    art: { m: 'time', p: ['#05060f', '#1d3557', '#ffd60a'], f: 'stand' } });

  add({ id: 'crisis-1', t: 'Crisis on Infinite Earths: Part One', m: 'LF', r: '2038-07', ch: 5, sy: 2037, sl: 'Year 17', fmt: 'Feature film · Part 1 of 3',
    log: 'A wave of antimatter is erasing universes. The Monitor gathers heroes from every Earth.',
    plot: "A white wall of antimatter is swallowing the Multiverse one universe at a time. The Monitor, Mar Novu, gathers heroes from the surviving Earths aboard his satellite, including Kara Zor-El, Barry Allen and the aged Jay Garrick, to defend towers that can hold back the wave, while the cosmic arbiter Kismet records what is lost. His opposite, the Anti-Monitor, feeds on every dead world and wants to free the Multiverse's imprisoned mother, Perpetua. The film ends with Kara, alone, holding the Anti-Monitor back long enough for everyone else to escape.",
    cast: ['monitor', 'antimonitor', 'perpetua', 'supergirl', 'barry', 'jay', 'superman', 'wonderwoman', 'batman', 'lex', 'kismet'],
    src: ['Crisis on Infinite Earths (1985) #1–7', "Justice League (2018) 'The Totality'", 'Dark Nights: Death Metal'],
    art: { m: 'crisis', p: ['#120000', '#b5000c', '#ffffff'], f: 'team' } });

  add({ id: 'crisis-game', t: 'Crisis: Battle for the Multiverse', m: 'VG', r: '2038-11', ch: 5, sy: 2037.4, sl: 'Year 17', fmt: 'Team action game · 140+ playable characters',
    log: "The middle chapter of Crisis isn't a movie. You play it.",
    plot: "The canonical second act of the Crisis trilogy. Players assemble squads from more than 140 characters to hold the Monitor's towers across five Earths, while Lex Luthor's Legion of Doom, with Sinestro, Despero and a very well-paid Lobo, tries to free Perpetua for its own ends. Heroes you lose stay lost in your campaign, but the final mission is fixed: Barry Allen runs into the Anti-Monitor's antimatter cannon and keeps running until there is nothing left of him.",
    cast: ['barry', 'antimonitor', 'perpetua', 'lex', 'lobo', 'despero', 'sinestro', 'darkseid', 'kismet', 'supergirl'],
    src: ['Crisis on Infinite Earths #8', 'Justice League: Doom War', 'Infinite Crisis'],
    art: { m: 'crisis', p: ['#0b0000', '#6a040f', '#ffba08'], f: 'team' } });

  add({ id: 'crisis-2', t: 'Crisis on Infinite Earths: Part Two', m: 'LF', r: '2039-05', ch: 5, sy: 2037.8, sl: 'Year 17 · and the dawn of time', fmt: 'Feature film · Part 3 of 3 · Chapter Five finale',
    log: 'The last heroes of the Multiverse travel to the beginning of time to stop the end of it.',
    plot: "With Kara and Barry gone, the survivors take the fight to the dawn of time, where the Anti-Monitor and Perpetua are trying to unmake creation at its source. The Spectre, Doctor Fate and the Lords of Order hold back the dark while Superman, Wonder Woman and Martian Manhunter lead an assault into the Antimatter Universe, and Hal Jordan carries the light of every Corps. When the light returns, there is one Earth, and almost no one remembers there were ever more. Wally West does. He puts on his uncle's costume.",
    cast: ['superman', 'wonderwoman', 'batman', 'antimonitor', 'perpetua', 'spectre', 'fate', 'presence', 'wally', 'monitor', 'source', 'jonn', 'hal', 'darkseid'],
    src: ['Crisis on Infinite Earths #9–12', 'Dark Nights: Death Metal', 'Infinite Crisis', 'The Flash (1987) #1'],
    art: { m: 'crisis', p: ['#000000', '#3a0000', '#f8f9fa'], f: 'team' } });

  /* ───────────── CHAPTER SIX · INFINITE LEGACY ───────────── */
  add({ id: 'terminal-velocity', t: 'The Flash: Terminal Velocity', m: 'LF', r: '2039-11', ch: 6, sy: 2038, sl: 'Year 18', fmt: 'Feature film',
    log: "Wally West is the fastest man alive. He's about to find out what waits at the end of the Speed Force.",
    plot: "Wally West, Barry's nephew and the last speedster standing, has protected Central City for a year in his uncle's costume and his uncle's shadow. When a vision shows him the death of his fiancée Linda Park, he pushes toward the source of the Speed Force and finds the place where speedsters go when they die. Jay Garrick tells him to come back. Captain Cold has a soft spot for the kid. Hunter Zolomon has unfinished business. And a man in red comes running back out of the light.",
    cast: ['wally', 'zoom', 'cold', 'barry', 'jay'],
    src: ['The Flash: Born to Run', 'The Flash: Terminal Velocity', 'The Return of Barry Allen', "The Flash (2021) 'One-Minute War'"],
    art: { m: 'speed', p: ['#140800', '#d00000', '#ffba08'], f: 'stand' } });

  add({ id: 'super-sons', t: 'Super Sons', m: 'AS', r: '2040-03', ch: 6, sy: 2038.3, sl: 'Year 18', fmt: 'Animated series · 2 seasons · 26 episodes',
    log: "Superman's son and Batman's son. Best friends, if they could stop fighting.",
    plot: "Jon Kent is ten, half-Kryptonian, raised on a farm by Clark and Lois, and still learning to fly. Damian Wayne is thirteen, raised by assassins and certain he's better than everyone. Their fathers decide the boys should be friends. The boys decide to fight crime behind their fathers' backs, which goes wrong in every possible way. Season two's villains are two reality-bending imps, Mister Mxyzptlk and Bat-Mite, who make a bet over which boy will crack first.",
    cast: ['jon', 'damian', 'superman', 'batman', 'mxy', 'batmite'],
    src: ['Superman: Son of Superman', 'Super Sons (2017)', 'Adventures of the Super Sons', 'Superman/Batman: With a Vengeance'],
    art: { m: 'sun', p: ['#07122b', '#e63946', '#ffd166'], f: 'duo' } });

  add({ id: 'young-justice', t: 'Young Justice', m: 'LS', r: '2040-06', ch: 6, sy: 2038.5, sl: 'Year 18', fmt: 'Series · 10 episodes',
    log: 'The sidekicks grow up and start their own team. The grown-ups are not invited.',
    plot: "Tim Drake, now the detective Red Robin, gathers the teenagers the Justice League keeps underestimating: Conner Kent, Jaime Reyes and his scarab, Virgil Hawkins, The Atom's student Ryan Choi and Stargirl. Their first case, a string of disappearances across the country, reveals that the Crisis left refugees from erased Earths stranded in the new universe, and some of them remember what was lost.",
    cast: ['tim', 'conner', 'jaime', 'static', 'ryan', 'stargirl'],
    src: ['Young Justice (1998)', 'Young Justice (2019)', 'Teen Titans (2003)', 'Red Robin (2009)'],
    art: { m: 'league', p: ['#060a14', '#d00000', '#ffd60a'], f: 'team' } });

  add({ id: 'batcat', t: 'Batman/Catwoman', m: 'LF', r: '2040-09', ch: 6, sy: 2038.6, sl: 'Year 18 · and decades on', fmt: 'Feature film',
    log: "Three timelines. One marriage. The Joker's last joke.",
    plot: "Told across three times at once: the night Bruce and Selina first fell for each other in Year 1, the present day as they finally marry, and a future where an old Selina buries Bruce while their daughter Helena carries on. In every timeline the Joker is there. In the present, Harley Quinn comes to Selina with an offer, and the question is simple: what will Selina do to make sure he never comes between them again?",
    cast: ['batman', 'catwoman', 'joker', 'harley'],
    src: ['Batman/Catwoman (2020)', "Batman (2016) 'Rooftops' and 'The Wedding'", 'Catwoman: When in Rome', 'The Autobiography of Bruce Wayne'],
    art: { m: 'city', p: ['#08040c', '#3c096c', '#ffd166'], f: 'duo' } });

  add({ id: 'legion', t: 'Legion of Super-Heroes', m: 'AS', r: '2041-02', ch: 6, sy: 3000, sl: '31st century', fmt: 'Animated series · 13 episodes',
    log: 'A thousand years from now, teenagers from a hundred worlds keep the future safe. The past is calling.',
    plot: "In the 31st century, the United Planets are protected by teenagers with one power each, all inspired by the legend of Superman. When the Time Trapper, a hooded being who lives at the end of time, starts erasing the 21st century, the Legion pulls Jon Kent into the future to stop him. Their investigation uncovers an older shadow spreading across their galaxy, the Great Darkness, and a very old god behind it.",
    cast: ['trapper', 'jon', 'darkseid'],
    src: ["Legion of Super-Heroes 'The Great Darkness Saga'", 'Final Crisis: Legion of 3 Worlds', 'Superman and the Legion of Super-Heroes', 'Legion of Super-Heroes (2019)'],
    art: { m: 'stars', p: ['#020814', '#00509d', '#fdc500'], f: 'team' } });

  add({ id: 'kingdom-come', t: 'Kingdom Come', m: 'LF', r: '2041-07', ch: 6, sy: 2060, sl: 'Decades from now', fmt: 'Feature film · Saga finale',
    log: 'The future the heroes have to prevent.',
    plot: "A minister named Norman McCay is shown the end of the world by the Spectre. Decades from now, a new generation of superhumans fights without restraint until an accident wipes out Kansas. Superman comes out of retirement to impose order with a gulag, Batman builds an army, and Wonder Woman wants war. Lex Luthor's brainwashed Shazam becomes the weapon that decides everything. The film ends back in the present, with the heroes choosing to be better.",
    cast: ['superman', 'wonderwoman', 'batman', 'shazam', 'spectre', 'lex', 'jon', 'damian', 'hal', 'barry'],
    src: ['Kingdom Come (1996)', 'The Kingdom', 'Justice Society of America: Thy Kingdom Come'],
    art: { m: 'kingdom', p: ['#0b0603', '#9c6644', '#ffe8a3'], f: 'team' } });

  /* ───────────── SOURCE LIBRARY · best stories per character ─────────────
     era: P pre-Crisis (1938–86) · C post-Crisis (1986–2011) · N New 52 (2011–16) · R Rebirth (2016–21) · M Infinite Frontier onward (2021–)
     flag: '*' essential pick · 'x' out of continuity / Elseworlds */
  const L = [];
  const g = (group) => (key, name, short, picks, note) => L.push({ key, name, short, group, picks: picks.map(([e, t, y, c, f]) => ({ e, t, y, c: c || '', star: (f || '').includes('*'), oc: (f || '').includes('x') })), note: note || '' });
  const H = g('Heroes'), V = g('Villains & Antiheroes'), X = g('Cosmic & Mystic');

  H('superman', 'Superman (Clark Kent / Kal-El)', 'Superman', [
    ['P', "Superman's Return to Krypton", 1960, 'Jerry Siegel & Wayne Boring'],
    ['P', 'For the Man Who Has Everything', 1985, 'Alan Moore & Dave Gibbons'],
    ['P', 'Whatever Happened to the Man of Tomorrow?', 1986, 'Alan Moore & Curt Swan'],
    ['C', 'The Man of Steel', 1986, 'John Byrne'],
    ['C', 'The Death of Superman', 1992, 'Dan Jurgens & others'],
    ['C', 'Superman for All Seasons', 1998, 'Jeph Loeb & Tim Sale'],
    ['C', 'Superman: Birthright', 2003, 'Mark Waid & Leinil Francis Yu'],
    ['C', 'All-Star Superman', 2005, 'Grant Morrison & Frank Quitely', '*x'],
    ['C', 'Superman: Red Son', 2003, 'Mark Millar & Dave Johnson', 'x'],
    ['C', 'Superman: Brainiac', 2008, 'Geoff Johns & Gary Frank'],
    ['N', 'Action Comics: Superman and the Men of Steel', 2011, 'Grant Morrison & Rags Morales'],
    ['N', 'Superman Unchained', 2013, 'Scott Snyder & Jim Lee'],
    ['R', 'Superman: Son of Superman', 2016, 'Peter J. Tomasi & Patrick Gleason'],
    ['R', 'Superman: Up in the Sky', 2019, 'Tom King & Andy Kubert'],
    ['M', 'Superman: Space Age', 2022, 'Mark Russell & Mike Allred', 'x']]);
  H('batman', 'Batman (Bruce Wayne)', 'Batman', [
    ['P', 'Daughter of the Demon', 1971, "Denny O'Neil & Neal Adams"],
    ['P', 'Strange Apparitions', 1977, 'Steve Englehart & Marshall Rogers'],
    ['C', 'The Dark Knight Returns', 1986, 'Frank Miller', 'x'],
    ['C', 'Batman: Year One', 1987, 'Frank Miller & David Mazzucchelli', '*'],
    ['C', 'The Killing Joke', 1988, 'Alan Moore & Brian Bolland'],
    ['C', 'Arkham Asylum: A Serious House on Serious Earth', 1989, 'Grant Morrison & Dave McKean'],
    ['C', 'Knightfall', 1993, 'Chuck Dixon, Doug Moench & others'],
    ['C', 'The Long Halloween', 1996, 'Jeph Loeb & Tim Sale'],
    ['C', 'Hush', 2002, 'Jeph Loeb & Jim Lee'],
    ['C', 'The Black Mirror', 2011, 'Scott Snyder & Jock'],
    ['N', 'The Court of Owls', 2011, 'Scott Snyder & Greg Capullo'],
    ['N', 'Death of the Family', 2012, 'Scott Snyder & Greg Capullo'],
    ['N', 'Zero Year', 2013, 'Scott Snyder & Greg Capullo'],
    ['R', 'The War of Jokes and Riddles', 2017, 'Tom King & Mikel Janín'],
    ['R', 'Batman: White Knight', 2017, 'Sean Murphy', 'x'],
    ['M', 'Absolute Batman', 2024, 'Scott Snyder & Nick Dragotta', 'x']]);
  H('wonderwoman', 'Wonder Woman (Diana Prince)', 'Wonder Woman', [
    ['P', 'Wonder Woman (Golden Age)', 1941, 'William Moulton Marston & H.G. Peter'],
    ['P', 'The New Wonder Woman (Diana Prince era)', 1968, "Denny O'Neil & Mike Sekowsky"],
    ['C', 'Gods and Mortals', 1987, 'George Pérez & Greg Potter', '*'],
    ['C', 'Challenge of the Gods', 1987, 'George Pérez'],
    ['C', 'Wonder Woman: Spirit of Truth', 2001, 'Paul Dini & Alex Ross'],
    ['C', 'The Hiketeia', 2002, 'Greg Rucka & J.G. Jones'],
    ['C', 'Eyes of the Gorgon', 2005, 'Greg Rucka & Drew Johnson'],
    ['N', 'Wonder Woman: Blood (Azzarello run)', 2011, 'Brian Azzarello & Cliff Chiang'],
    ['R', 'Wonder Woman: Year One', 2016, 'Greg Rucka & Nicola Scott'],
    ['R', 'Wonder Woman: The Lies', 2016, 'Greg Rucka & Liam Sharp'],
    ['M', 'Wonder Woman Historia: The Amazons', 2021, 'Kelly Sue DeConnick & Phil Jimenez'],
    ['M', 'Wonder Woman: Outlaw', 2023, 'Tom King & Daniel Sampere']]);
  H('barry', 'The Flash (Barry Allen)', 'Flash (Barry)', [
    ['P', 'Showcase #4: Mystery of the Human Thunderbolt', 1956, 'Robert Kanigher & Carmine Infantino'],
    ['P', 'Flash of Two Worlds', 1961, 'Gardner Fox & Carmine Infantino', '*'],
    ['P', 'The Trial of the Flash', 1983, 'Cary Bates & Carmine Infantino'],
    ['P', 'Crisis on Infinite Earths #8', 1985, 'Marv Wolfman & George Pérez'],
    ['C', 'The Flash: Rebirth', 2009, 'Geoff Johns & Ethan Van Sciver'],
    ['C', 'Flashpoint', 2011, 'Geoff Johns & Andy Kubert'],
    ['N', 'The Flash: Move Forward', 2011, 'Francis Manapul & Brian Buccellato'],
    ['N', 'The Flash: Gorilla Warfare', 2013, 'Francis Manapul & Brian Buccellato'],
    ['R', 'The Flash: Lightning Strikes Twice', 2016, 'Joshua Williamson & Carmine Di Giandomenico'],
    ['R', 'The Flash: Year One', 2019, 'Joshua Williamson & Howard Porter']]);
  H('wally', 'The Flash (Wally West)', 'Flash (Wally)', [
    ['P', 'The New Teen Titans', 1980, 'Marv Wolfman & George Pérez'],
    ['C', 'The Flash: Born to Run', 1993, 'Mark Waid & Greg LaRocque'],
    ['C', 'The Return of Barry Allen', 1993, 'Mark Waid & Greg LaRocque', '*'],
    ['C', 'Terminal Velocity', 1995, 'Mark Waid & Salvador Larroca'],
    ['C', 'The Flash: Blitz', 2001, 'Geoff Johns & Scott Kolins'],
    ['C', 'The Flash: Rogue War', 2005, 'Geoff Johns & Howard Porter'],
    ['R', 'DC Universe: Rebirth #1', 2016, 'Geoff Johns, Gary Frank & others'],
    ['M', 'The Flash: One-Minute War', 2022, 'Jeremy Adams & Fernando Pasarin'],
    ['M', 'The Flash (Spurrier run)', 2023, 'Simon Spurrier & Mike Deodato Jr.']]);
  H('hal', 'Green Lantern (Hal Jordan)', 'Green Lantern (Hal)', [
    ['P', 'SOS Green Lantern (Showcase #22)', 1959, 'John Broome & Gil Kane'],
    ['P', 'Hard Traveling Heroes', 1970, "Denny O'Neil & Neal Adams"],
    ['P', 'Tygers', 1986, "Alan Moore & Kevin O'Neill"],
    ['C', 'Emerald Dawn', 1989, 'Keith Giffen, Gerard Jones & M.D. Bright'],
    ['C', 'Emerald Twilight', 1994, 'Ron Marz & Darryl Banks'],
    ['C', 'Green Lantern: Rebirth', 2004, 'Geoff Johns & Ethan Van Sciver'],
    ['C', 'The Sinestro Corps War', 2007, 'Geoff Johns, Dave Gibbons & Ivan Reis', '*'],
    ['C', 'Secret Origin', 2008, 'Geoff Johns & Ivan Reis'],
    ['C', 'Blackest Night', 2009, 'Geoff Johns & Ivan Reis'],
    ['N', 'Green Lantern: Sinestro', 2011, 'Geoff Johns & Doug Mahnke'],
    ['N', 'Green Lantern #20 (the Johns finale)', 2013, 'Geoff Johns & Doug Mahnke'],
    ['R', 'The Green Lantern', 2018, 'Grant Morrison & Liam Sharp']]);
  H('john', 'Green Lantern (John Stewart)', 'Green Lantern (John)', [
    ['P', 'Beware My Power! (Green Lantern #87)', 1971, "Denny O'Neil & Neal Adams"],
    ['C', 'Cosmic Odyssey', 1988, 'Jim Starlin & Mike Mignola', '*'],
    ['C', 'Green Lantern: Mosaic', 1992, 'Gerard Jones & Cully Hamner'],
    ['N', 'Green Lantern Corps: Fearsome', 2011, 'Peter J. Tomasi & Fernando Pasarin'],
    ['N', 'Green Lantern Corps (Van Jensen run)', 2013, 'Van Jensen & Bernard Chang'],
    ['R', 'Justice League: No Justice', 2018, 'Scott Snyder, Joshua Williamson & James Tynion IV'],
    ['M', 'Green Lantern: War Journal', 2023, 'Phillip Kennedy Johnson & Montos']]);
  H('aquaman', 'Aquaman (Arthur Curry)', 'Aquaman', [
    ['P', 'Aquaman #35 (Black Manta debut)', 1967, 'Bob Haney & Nick Cardy'],
    ['P', 'The Death of a Prince', 1977, 'David Michelinie, Paul Levitz & Jim Aparo'],
    ['C', 'The Atlantis Chronicles', 1990, 'Peter David & Esteban Maroto'],
    ['C', 'Aquaman: Time and Tide', 1993, 'Peter David & Kirk Jarvinen'],
    ['C', 'Aquaman (Peter David run)', 1994, 'Peter David & Martin Egeland'],
    ['N', 'The Trench', 2011, 'Geoff Johns & Ivan Reis', '*'],
    ['N', 'Throne of Atlantis', 2012, 'Geoff Johns, Paul Pelletier & Ivan Reis'],
    ['R', 'Aquaman: The Drowning', 2016, 'Dan Abnett & Brad Walker'],
    ['R', 'Aquaman: Unspoken Water', 2019, 'Kelly Sue DeConnick & Robson Rocha'],
    ['M', 'Aquaman: Andromeda', 2022, 'Ram V & Christian Ward', 'x']]);
  H('nightwing', 'Nightwing (Dick Grayson)', 'Nightwing', [
    ['P', 'Detective Comics #38 (Robin debut)', 1940, 'Bill Finger, Bob Kane & Jerry Robinson'],
    ['P', 'The Judas Contract', 1984, 'Marv Wolfman & George Pérez'],
    ['C', 'Batman: Prodigal', 1994, 'Chuck Dixon & others'],
    ['C', 'Nightwing (Chuck Dixon run)', 1996, 'Chuck Dixon & Scott McDaniel'],
    ['C', 'Nightwing: Year One', 2005, 'Chuck Dixon, Scott Beatty & Scott McDaniel'],
    ['C', 'Batman & Robin: Batman Reborn', 2009, 'Grant Morrison & Frank Quitely'],
    ['N', 'Grayson', 2014, 'Tom King, Tim Seeley & Mikel Janín', '*'],
    ['R', 'Nightwing: Better Than Batman', 2016, 'Tim Seeley & Javier Fernández'],
    ['M', 'Nightwing: Leaping into the Light', 2021, 'Tom Taylor & Bruno Redondo']]);
  H('greenarrow', 'Green Arrow (Oliver Queen)', 'Green Arrow', [
    ['P', 'Hard Traveling Heroes', 1970, "Denny O'Neil & Neal Adams"],
    ['C', 'The Longbow Hunters', 1987, 'Mike Grell', '*'],
    ['C', 'Green Arrow: Quiver', 2001, 'Kevin Smith & Phil Hester'],
    ['C', 'Green Arrow: Year One', 2007, 'Andy Diggle & Jock'],
    ['N', 'Green Arrow: The Kill Machine', 2013, 'Jeff Lemire & Andrea Sorrentino'],
    ['R', 'The Death and Life of Oliver Queen', 2016, 'Benjamin Percy & Otto Schmidt'],
    ['M', 'Green Arrow (Williamson run)', 2023, 'Joshua Williamson & Sean Izaakse']]);
  H('jonn', "Martian Manhunter (J'onn J'onzz)", 'Martian Manhunter', [
    ['P', 'The Manhunter from Mars (Detective Comics #225)', 1955, 'Joseph Samachson & Joe Certa'],
    ['P', 'Justice League of America (Silver Age)', 1960, 'Gardner Fox & Mike Sekowsky'],
    ['C', 'Justice League International', 1987, 'Keith Giffen, J.M. DeMatteis & Kevin Maguire'],
    ['C', 'Martian Manhunter: American Secrets', 1992, 'Gerard Jones & Eduardo Barreto', '*'],
    ['C', 'JLA: New World Order', 1997, 'Grant Morrison & Howard Porter'],
    ['C', 'Martian Manhunter (Ostrander run)', 1998, 'John Ostrander & Tom Mandrake'],
    ['R', 'Martian Manhunter: Identity', 2018, 'Steve Orlando & Riley Rossmo'],
    ['M', 'Absolute Martian Manhunter', 2025, 'Deniz Camp & Javier Rodríguez', 'x']]);
  H('supergirl', 'Supergirl (Kara Zor-El)', 'Supergirl', [
    ['P', 'The Supergirl from Krypton (Action Comics #252)', 1959, 'Otto Binder & Al Plastino'],
    ['P', 'Crisis on Infinite Earths #7', 1985, 'Marv Wolfman & George Pérez'],
    ['C', 'Superman/Batman: The Supergirl from Krypton', 2004, 'Jeph Loeb & Michael Turner'],
    ['C', 'Supergirl: Cosmic Adventures in the 8th Grade', 2009, 'Landry Q. Walker & Eric Jones', 'x'],
    ['N', 'Supergirl: Last Daughter of Krypton', 2011, 'Michael Green, Mike Johnson & Mahmud Asrar'],
    ['R', 'Supergirl: Being Super', 2016, 'Mariko Tamaki & Joëlle Jones', 'x'],
    ['M', 'Supergirl: Woman of Tomorrow', 2021, 'Tom King & Bilquis Evely', '*']]);
  H('shazam', 'Shazam / Captain Marvel (Billy Batson)', 'Shazam', [
    ['P', 'Whiz Comics #2', 1940, 'Bill Parker & C.C. Beck'],
    ['P', 'The Monster Society of Evil', 1943, 'Otto Binder & C.C. Beck'],
    ['C', 'The Power of Shazam!', 1994, 'Jerry Ordway', '*'],
    ['C', 'Shazam! and the Monster Society of Evil', 2007, 'Jeff Smith', 'x'],
    ['N', 'Shazam! (Justice League backups)', 2012, 'Geoff Johns & Gary Frank'],
    ['R', 'Shazam! and the Seven Magic Lands', 2019, 'Geoff Johns & Dale Eaglesham'],
    ['M', 'Shazam! (Waid run)', 2023, 'Mark Waid & Dan Mora']]);
  H('cyborg', 'Cyborg (Victor Stone)', 'Cyborg', [
    ['P', 'DC Comics Presents #26', 1980, 'Marv Wolfman & George Pérez'],
    ['P', 'The Judas Contract', 1984, 'Marv Wolfman & George Pérez'],
    ['C', "Teen Titans: A Kid's Game", 2003, 'Geoff Johns & Mike McKone'],
    ['N', 'Justice League: Origin', 2011, 'Geoff Johns & Jim Lee', '*'],
    ['N', 'Forever Evil', 2013, 'Geoff Johns & David Finch'],
    ['N', 'Justice League: The Darkseid War', 2015, 'Geoff Johns & Jason Fabok'],
    ['R', 'Cyborg: The Imitation of Life', 2016, 'John Semper Jr. & Paul Pelletier']]);
  H('barbara', 'Batgirl / Oracle (Barbara Gordon)', 'Batgirl / Oracle', [
    ['P', 'The Million Dollar Debut of Batgirl (Detective #359)', 1967, 'Gardner Fox & Carmine Infantino'],
    ['C', 'The Killing Joke', 1988, 'Alan Moore & Brian Bolland'],
    ['C', 'Oracle: Year One — Born of Hope', 1996, 'John Ostrander, Kim Yale & Brian Stelfreeze'],
    ['C', 'Birds of Prey: Of Like Minds', 2003, 'Gail Simone & Ed Benes', '*'],
    ['C', 'Batgirl: Year One', 2003, 'Scott Beatty, Chuck Dixon & Marcos Martin'],
    ['N', 'Batgirl: The Darkest Reflection', 2011, 'Gail Simone & Ardian Syaf'],
    ['N', 'Batgirl of Burnside', 2014, 'Cameron Stewart, Brenden Fletcher & Babs Tarr'],
    ['R', 'Batgirl and the Birds of Prey', 2016, 'Julie & Shawna Benson, Claire Roe']]);
  H('jason', 'Red Hood (Jason Todd)', 'Red Hood', [
    ['P', 'Batman #357 (debut)', 1983, 'Gerry Conway & Don Newton'],
    ['C', 'A Death in the Family', 1988, 'Jim Starlin & Jim Aparo'],
    ['C', 'Under the Hood', 2005, 'Judd Winick & Doug Mahnke', '*'],
    ['C', 'Red Hood: The Lost Days', 2010, 'Judd Winick & Pablo Raimondi'],
    ['N', 'Red Hood and the Outlaws: REDemption', 2011, 'Scott Lobdell & Kenneth Rocafort'],
    ['R', 'Red Hood and the Outlaws: Dark Trinity', 2016, 'Scott Lobdell & Dexter Soy'],
    ['R', 'Batman: Three Jokers', 2020, 'Geoff Johns & Jason Fabok']]);
  H('tim', 'Robin (Tim Drake)', 'Robin (Tim)', [
    ['C', 'A Lonely Place of Dying', 1989, 'Marv Wolfman, George Pérez & Jim Aparo'],
    ['C', 'Robin (Chuck Dixon run)', 1993, 'Chuck Dixon & Tom Grummett'],
    ['C', 'Young Justice', 1998, 'Peter David & Todd Nauck'],
    ['C', "Teen Titans: A Kid's Game", 2003, 'Geoff Johns & Mike McKone'],
    ['C', 'Red Robin: The Grail', 2009, 'Chris Yost & Ramon Bachs'],
    ['R', 'Detective Comics: A Lonely Place of Living', 2017, 'James Tynion IV & Eddy Barrows', '*'],
    ['M', 'Tim Drake: Robin', 2022, 'Meghan Fitzmartin & Riley Rossmo']]);
  H('damian', 'Robin (Damian Wayne)', 'Robin (Damian)', [
    ['C', 'Batman and Son', 2006, 'Grant Morrison & Andy Kubert', '*'],
    ['C', 'Batman & Robin', 2009, 'Grant Morrison & Frank Quitely'],
    ['N', 'Batman and Robin: Born to Kill', 2011, 'Peter J. Tomasi & Patrick Gleason'],
    ['N', 'Batman Incorporated: Demon Star', 2013, 'Grant Morrison & Chris Burnham'],
    ['N', 'Robin: Son of Batman', 2015, 'Patrick Gleason'],
    ['R', 'Super Sons', 2017, 'Peter J. Tomasi & Jorge Jimenez'],
    ['M', 'Robin: The Lazarus Tournament', 2021, 'Joshua Williamson & Gleb Melnikov']]);
  H('catwoman', 'Catwoman (Selina Kyle)', 'Catwoman', [
    ['P', 'Batman #1 (The Cat)', 1940, 'Bill Finger & Bob Kane'],
    ['P', 'The Autobiography of Bruce Wayne', 1983, 'Alan Brennert & Joe Staton'],
    ['C', 'Batman: Year One', 1987, 'Frank Miller & David Mazzucchelli'],
    ['C', 'Catwoman (Brubaker & Cooke run)', 2002, 'Ed Brubaker, Darwyn Cooke & Cameron Stewart', '*'],
    ['C', "Catwoman: Selina's Big Score", 2002, 'Darwyn Cooke'],
    ['C', 'Catwoman: When in Rome', 2004, 'Jeph Loeb & Tim Sale'],
    ['R', 'Batman: Rooftops', 2017, 'Tom King & Mitch Gerads'],
    ['R', 'Batman/Catwoman', 2020, 'Tom King & Clay Mann'],
    ['M', 'Catwoman: Lonely City', 2021, 'Cliff Chiang', 'x']]);
  H('batwoman', 'Batwoman (Kate Kane)', 'Batwoman', [
    ['C', '52', 2006, 'Geoff Johns, Grant Morrison, Greg Rucka & Mark Waid'],
    ['C', 'Detective Comics: Elegy', 2009, 'Greg Rucka & J.H. Williams III', '*'],
    ['N', 'Batwoman: Hydrology', 2011, 'J.H. Williams III & W. Haden Blackman'],
    ['N', "Batwoman: World's Finest", 2013, 'J.H. Williams III & W. Haden Blackman'],
    ['R', 'Detective Comics: Rise of the Batmen', 2016, 'James Tynion IV & Eddy Barrows'],
    ['R', 'Batwoman: The Many Arms of Death', 2017, 'Marguerite Bennett, James Tynion IV & Steve Epting']]);
  H('huntress', 'Huntress (Helena Bertinelli)', 'Huntress', [
    ['C', 'The Huntress', 1989, 'Joey Cavalieri & Joe Staton'],
    ['C', 'Batman: No Man\'s Land', 1999, 'Greg Rucka & others'],
    ['C', 'Huntress: Cry for Blood', 2000, 'Greg Rucka & Rick Burchett'],
    ['C', 'Birds of Prey: Sensei & Student', 2004, 'Gail Simone & Ed Benes', '*'],
    ['C', 'Huntress: Year One', 2008, 'Ivory Madison & Cliff Richards'],
    ['N', 'Grayson', 2014, 'Tom King, Tim Seeley & Mikel Janín'],
    ['R', 'Batgirl and the Birds of Prey: Who Is Oracle?', 2016, 'Julie & Shawna Benson, Claire Roe']]);
  H('constantine', 'John Constantine', 'Constantine', [
    ['P', 'Swamp Thing #37 (debut)', 1985, 'Alan Moore, Stephen Bissette & John Totleben'],
    ['C', 'Hellblazer: Original Sins', 1988, 'Jamie Delano & John Ridgway'],
    ['C', 'Dangerous Habits', 1991, 'Garth Ennis & William Simpson', '*'],
    ['C', 'Hellblazer: Haunted', 2000, 'Warren Ellis & John Higgins'],
    ['C', 'All His Engines', 2005, 'Mike Carey & Leonardo Manco'],
    ['N', 'Justice League Dark: In the Dark', 2011, 'Peter Milligan & Mikel Janín'],
    ['R', 'John Constantine: Hellblazer (Spurrier run)', 2019, 'Simon Spurrier & Aaron Campbell'],
    ['M', 'John Constantine, Hellblazer: Dead in America', 2024, 'Simon Spurrier & Aaron Campbell']]);
  H('zatanna', 'Zatanna', 'Zatanna', [
    ['P', 'Hawkman #4 (debut)', 1964, 'Gardner Fox & Murphy Anderson'],
    ['C', 'Zatanna: Everyday Magic', 2003, 'Paul Dini & Rick Mays'],
    ['C', 'Identity Crisis', 2004, 'Brad Meltzer & Rags Morales'],
    ['C', 'Seven Soldiers: Zatanna', 2005, 'Grant Morrison & Ryan Sook', '*'],
    ['C', 'Zatanna (Dini run)', 2010, 'Paul Dini & Stéphane Roux'],
    ['N', 'Justice League Dark', 2011, 'Peter Milligan, Jeff Lemire & Mikel Janín'],
    ['R', 'Justice League Dark: The Last Age of Magic', 2018, 'James Tynion IV & Álvaro Martínez Bueno'],
    ['M', 'Zatanna: Bring Down the House', 2024, 'Mariko Tamaki & Javier Rodríguez', 'x']]);
  H('fate', 'Doctor Fate (Kent Nelson / Khalid Nassour)', 'Doctor Fate', [
    ['P', 'More Fun Comics #55 (debut)', 1940, 'Gardner Fox & Howard Sherman'],
    ['P', 'The Immortal Doctor Fate', 1975, 'Walt Simonson, Martin Pasko & Keith Giffen'],
    ['C', 'Doctor Fate (DeMatteis & Giffen)', 1987, 'J.M. DeMatteis & Keith Giffen', '*'],
    ['C', 'JSA: Darkness Falls', 2000, 'Geoff Johns, David Goyer & Stephen Sadowski'],
    ['N', 'Doctor Fate (Khalid Nassour)', 2015, 'Paul Levitz & Sonny Liew'],
    ['R', 'Justice League Dark: The Last Age of Magic', 2018, 'James Tynion IV & Álvaro Martínez Bueno']]);
  H('swampthing', 'Swamp Thing (Alec Holland)', 'Swamp Thing', [
    ['P', 'Swamp Thing #1', 1972, 'Len Wein & Bernie Wrightson'],
    ['P', 'The Anatomy Lesson', 1984, 'Alan Moore, Stephen Bissette & John Totleben', '*'],
    ['P', 'American Gothic', 1985, 'Alan Moore, Stephen Bissette & John Totleben'],
    ['C', 'Saga of the Swamp Thing (Moore, final arcs)', 1987, 'Alan Moore, Rick Veitch & John Totleben'],
    ['C', 'Brightest Day', 2010, 'Geoff Johns, Peter J. Tomasi & Ivan Reis'],
    ['N', 'Swamp Thing: Raise Them Bones / Rotworld', 2011, 'Scott Snyder & Yanick Paquette'],
    ['R', 'Swamp Thing (Wein & Jones)', 2016, 'Len Wein & Kelley Jones'],
    ['M', 'Swamp Thing: Green Hell', 2021, 'Jeff Lemire & Doug Mahnke', 'x']]);
  H('raven', 'Raven', 'Raven', [
    ['P', 'The Terror of Trigon (New Teen Titans #1–5)', 1980, 'Marv Wolfman & George Pérez', '*'],
    ['P', 'The Terror of Trigon (New Teen Titans vol. 2 #1–6)', 1984, 'Marv Wolfman & George Pérez'],
    ['C', 'Teen Titans (Johns run)', 2003, 'Geoff Johns & Mike McKone'],
    ['N', 'Raven', 2016, 'Marv Wolfman & Alisson Borges'],
    ['R', 'Teen Titans: Raven', 2019, 'Kami Garcia & Gabriel Picolo', 'x'],
    ['M', 'Titans: Beast World', 2023, 'Tom Taylor & Ivan Reis']]);
  H('deadman', 'Deadman (Boston Brand)', 'Deadman', [
    ['P', 'Strange Adventures #205 (debut)', 1967, 'Arnold Drake & Carmine Infantino'],
    ['P', 'Deadman (Neal Adams run)', 1968, 'Neal Adams', '*'],
    ['C', 'Deadman: Love After Death', 1989, 'Mike Baron & Kelley Jones'],
    ['C', 'Brightest Day', 2010, 'Geoff Johns, Peter J. Tomasi & Ivan Reis'],
    ['N', 'Justice League Dark', 2011, 'Peter Milligan & Mikel Janín'],
    ['R', 'Deadman: Dark Mansion of Forbidden Love', 2016, 'Sarah Vaughn & Lan Medina'],
    ['R', 'Deadman', 2017, 'Neal Adams']]);
  H('etrigan', 'Etrigan the Demon (Jason Blood)', 'Etrigan', [
    ['P', 'The Demon', 1972, 'Jack Kirby', '*'],
    ['C', 'The Demon', 1987, 'Matt Wagner'],
    ['C', 'The Demon (Garth Ennis run)', 1993, 'Garth Ennis & John McCrea'],
    ['N', 'Demon Knights', 2011, 'Paul Cornell & Diógenes Neves'],
    ['R', 'The Demon: Hell Is Earth', 2017, 'Andrew Constant & Brad Walker']]);
  H('starfire', "Starfire (Koriand'r)", 'Starfire', [
    ['P', 'The New Teen Titans', 1980, 'Marv Wolfman & George Pérez', '*'],
    ['P', 'The Judas Contract', 1984, 'Marv Wolfman & George Pérez'],
    ['C', 'Titans Hunt', 1990, 'Marv Wolfman & Tom Grummett'],
    ['N', 'Red Hood and the Outlaws', 2011, 'Scott Lobdell & Kenneth Rocafort'],
    ['N', 'Starfire', 2015, 'Amanda Conner, Jimmy Palmiotti & Emanuela Lupacchino'],
    ['M', 'Titans (Taylor run)', 2023, 'Tom Taylor & Nicola Scott']]);
  H('beastboy', 'Beast Boy (Garfield Logan)', 'Beast Boy', [
    ['P', 'Doom Patrol #99 (debut)', 1965, 'Arnold Drake & Bob Brown'],
    ['P', 'The Judas Contract', 1984, 'Marv Wolfman & George Pérez', '*'],
    ['C', 'Beast Boy', 2000, 'Geoff Johns, Ben Raab & Justiniano'],
    ['C', 'Teen Titans: Beast Boys and Girls', 2005, 'Geoff Johns & others'],
    ['R', 'Teen Titans: Beast Boy', 2020, 'Kami Garcia & Gabriel Picolo', 'x'],
    ['M', 'Titans: Beast World', 2023, 'Tom Taylor & Ivan Reis']]);
  H('jaime', 'Blue Beetle (Jaime Reyes)', 'Blue Beetle (Jaime)', [
    ['C', 'Infinite Crisis', 2005, 'Geoff Johns & Phil Jimenez'],
    ['C', 'Blue Beetle: Shellshocked', 2006, 'Keith Giffen, John Rogers & Cully Hamner', '*'],
    ['C', 'Blue Beetle: Reach for the Stars', 2008, 'John Rogers & Rafael Albuquerque'],
    ['C', 'Justice League: Generation Lost', 2010, 'Keith Giffen & Judd Winick'],
    ['N', 'Blue Beetle: Metamorphosis', 2011, 'Tony Bedard & Ig Guara'],
    ['R', 'Blue Beetle: The More Things Change', 2016, 'Keith Giffen & Scott Kolins'],
    ['M', 'Blue Beetle: Graduation Day', 2022, 'Josh Trujillo & Adrián Gutiérrez']]);
  H('ted', 'Blue Beetle (Ted Kord)', 'Blue Beetle (Ted)', [
    ['P', 'Captain Atom #83 (debut, Charlton)', 1966, 'Steve Ditko'],
    ['C', 'Justice League International', 1987, 'Keith Giffen, J.M. DeMatteis & Kevin Maguire'],
    ['C', 'Formerly Known as the Justice League', 2003, 'Keith Giffen, J.M. DeMatteis & Kevin Maguire'],
    ['C', 'Countdown to Infinite Crisis', 2005, 'Geoff Johns, Greg Rucka & Judd Winick', '*'],
    ['C', 'Booster Gold: 52 Pick-Up', 2007, 'Geoff Johns, Jeff Katz & Dan Jurgens'],
    ['R', 'Blue Beetle: The More Things Change', 2016, 'Keith Giffen & Scott Kolins'],
    ['M', 'Blue & Gold', 2021, 'Dan Jurgens & Ryan Sook']]);
  H('booster', 'Booster Gold (Michael Jon Carter)', 'Booster Gold', [
    ['C', 'Booster Gold', 1986, 'Dan Jurgens'],
    ['C', 'Justice League International', 1987, 'Keith Giffen, J.M. DeMatteis & Kevin Maguire'],
    ['C', '52', 2006, 'Geoff Johns, Grant Morrison, Greg Rucka & Mark Waid', '*'],
    ['C', 'Booster Gold: 52 Pick-Up', 2007, 'Geoff Johns, Jeff Katz & Dan Jurgens'],
    ['N', 'Booster Gold: Futures End', 2014, 'Dan Jurgens'],
    ['M', 'Blue & Gold', 2021, 'Dan Jurgens & Ryan Sook']]);
  H('donna', 'Donna Troy (Troia)', 'Donna Troy', [
    ['P', 'The Brave and the Bold #60 (debut)', 1965, 'Bob Haney & Bruno Premiani'],
    ['P', 'Who Is Donna Troy?', 1984, 'Marv Wolfman & George Pérez', '*'],
    ['C', 'Titans Hunt', 1990, 'Marv Wolfman & Tom Grummett'],
    ['C', 'The Return of Donna Troy', 2005, 'Phil Jimenez & José Luis García-López'],
    ['R', 'Titans: The Lazarus Contract', 2017, 'Dan Abnett, Christopher Priest & others'],
    ['M', 'Wonder Woman: Trial of the Amazons', 2022, 'Becky Cloonan, Michael W. Conrad & others']]);
  H('conner', 'Superboy (Conner Kent)', 'Superboy (Conner)', [
    ['C', 'Reign of the Supermen', 1993, 'Karl Kesel, Tom Grummett & others'],
    ['C', 'Superboy (Kesel run)', 1994, 'Karl Kesel & Tom Grummett'],
    ['C', 'Young Justice', 1998, 'Peter David & Todd Nauck'],
    ['C', "Teen Titans: A Kid's Game", 2003, 'Geoff Johns & Mike McKone', '*'],
    ['C', 'Superboy (Lemire run)', 2010, 'Jeff Lemire & Pier Gallo'],
    ['R', 'Young Justice', 2019, 'Brian Michael Bendis & Patrick Gleason'],
    ['M', 'Superboy: Man of Tomorrow', 2023, 'Kenny Porter & Jahnoy Lindsay']]);
  H('jon', 'Superboy (Jon Kent)', 'Superboy (Jon)', [
    ['R', 'Superman: Son of Superman', 2016, 'Peter J. Tomasi & Patrick Gleason'],
    ['R', 'Super Sons', 2017, 'Peter J. Tomasi & Jorge Jimenez', '*'],
    ['R', 'Adventures of the Super Sons', 2018, 'Peter J. Tomasi & Carlo Barberi'],
    ['M', 'Superman: Son of Kal-El', 2021, 'Tom Taylor & John Timms'],
    ['M', 'Adventures of Superman: Jon Kent', 2023, 'Tom Taylor & Clayton Henry']]);
  H('roy', 'Red Arrow / Arsenal (Roy Harper)', 'Roy Harper', [
    ['P', 'More Fun Comics #73 (debut)', 1941, 'Mort Weisinger & George Papp'],
    ['P', "Snowbirds Don't Fly", 1971, "Denny O'Neil & Neal Adams", '*'],
    ['C', 'Arsenal', 1998, 'Devin Grayson & Rick Mays'],
    ['C', 'Titans', 1999, 'Devin Grayson & Mark Buckingham'],
    ['N', 'Red Hood and the Outlaws', 2011, 'Scott Lobdell & Kenneth Rocafort'],
    ['R', 'Titans: The Return of Wally West', 2016, 'Dan Abnett & Brett Booth']]);
  H('static', 'Static (Virgil Hawkins)', 'Static', [
    ['C', 'Static: Trial by Fire (Milestone)', 1993, 'Dwayne McDuffie, Robert L. Washington III & John Paul Leon', '*'],
    ['C', 'Static Shock: Rebirth of the Cool', 2001, 'Dwayne McDuffie & others'],
    ['M', 'Static: Season One', 2021, 'Vita Ayala & Nikolas Draper-Ivey'],
    ['M', 'Static: Shadows of Dakota', 2022, 'Vita Ayala & Nikolas Draper-Ivey']]);
  H('canary', 'Black Canary (Dinah Lance)', 'Black Canary', [
    ['P', 'Flash Comics #86 (debut)', 1947, 'Robert Kanigher & Carmine Infantino'],
    ['P', 'Hard Traveling Heroes', 1970, "Denny O'Neil & Neal Adams"],
    ['C', 'The Longbow Hunters', 1987, 'Mike Grell'],
    ['C', 'Birds of Prey: Of Like Minds', 2003, 'Gail Simone & Ed Benes', '*'],
    ['C', 'Green Arrow/Black Canary: The Wedding', 2007, 'Judd Winick & Amanda Conner'],
    ['N', 'Black Canary: Kicking and Screaming', 2015, 'Brenden Fletcher & Annie Wu'],
    ['M', 'Black Canary: Best of the Best', 2024, 'Tom King & Ryan Sook']]);
  H('hawkman', 'Hawkman (Carter Hall)', 'Hawkman', [
    ['P', 'Flash Comics #1 (debut)', 1940, 'Gardner Fox & Dennis Neville'],
    ['C', 'Hawkworld', 1989, 'Timothy Truman'],
    ['C', 'JSA: The Return of Hawkman', 2002, 'Geoff Johns, David Goyer & Stephen Sadowski', '*'],
    ['C', 'Hawkman: Endless Flight', 2002, 'Geoff Johns, James Robinson & Rags Morales'],
    ['R', 'Dark Nights: Metal', 2017, 'Scott Snyder & Greg Capullo'],
    ['R', 'Hawkman: Awakening', 2018, 'Robert Venditti & Bryan Hitch']]);
  H('hawkgirl', 'Hawkgirl (Kendra Saunders / Shayera Hol)', 'Hawkgirl', [
    ['P', 'All-Star Comics #5 (first as Hawkgirl)', 1941, 'Gardner Fox'],
    ['P', 'The Brave and the Bold #34 (Shayera Hol)', 1961, 'Gardner Fox & Joe Kubert'],
    ['C', 'JSA: The Return of Hawkman', 2002, 'Geoff Johns, David Goyer & Stephen Sadowski'],
    ['C', 'Hawkgirl', 2006, 'Walter Simonson & Howard Chaykin', '*'],
    ['R', 'Hawkman (Venditti run)', 2018, 'Robert Venditti & Bryan Hitch'],
    ['M', 'Hawkgirl', 2023, 'Jadzia Axelrod & Amancay Nahuelpan']]);
  H('ray', 'The Atom (Ray Palmer)', 'The Atom (Ray)', [
    ['P', 'Showcase #34 (Birth of the Atom)', 1961, 'Gardner Fox & Gil Kane'],
    ['P', 'Sword of the Atom', 1983, 'Jan Strnad & Gil Kane', '*'],
    ['C', 'Identity Crisis', 2004, 'Brad Meltzer & Rags Morales'],
    ['R', 'Justice League of America (Orlando run)', 2017, 'Steve Orlando & Ivan Reis']]);
  H('ryan', 'The Atom (Ryan Choi)', 'The Atom (Ryan)', [
    ['C', 'The All-New Atom: My Life in Miniature', 2006, 'Gail Simone & John Byrne', '*'],
    ['C', 'The All-New Atom: Future/Past', 2007, 'Gail Simone & Mike Norton'],
    ['R', 'Justice League of America: The Atom Rebirth', 2017, 'Steve Orlando & Andy MacDonald'],
    ['R', 'Justice League of America (Orlando run)', 2017, 'Steve Orlando & Ivan Reis']]);
  H('plasticman', 'Plastic Man (Patrick "Eel" O\'Brian)', 'Plastic Man', [
    ['P', 'Police Comics #1 (debut)', 1941, 'Jack Cole', '*'],
    ['C', 'JLA (Morrison run)', 1997, 'Grant Morrison & Howard Porter'],
    ['C', 'Plastic Man: On the Lam!', 2004, 'Kyle Baker'],
    ['R', 'The Terrifics', 2018, 'Jeff Lemire & Ivan Reis'],
    ['R', 'Plastic Man', 2018, 'Gail Simone & Adriana Melo'],
    ['M', 'Plastic Man No More!', 2024, 'Christopher Cantwell & Alex Lins']]);
  H('terrific', 'Mister Terrific (Michael Holt)', 'Mister Terrific', [
    ['C', 'The Spectre #54 (debut)', 1997, 'John Ostrander & Tom Mandrake'],
    ['C', 'JSA (Johns run)', 1999, 'Geoff Johns, David Goyer & Stephen Sadowski', '*'],
    ['C', 'Checkmate', 2006, 'Greg Rucka & Jesus Saiz'],
    ['R', 'The Terrifics', 2018, 'Jeff Lemire & Ivan Reis']]);
  H('blacklightning', 'Black Lightning (Jefferson Pierce)', 'Black Lightning', [
    ['P', 'Black Lightning #1', 1977, 'Tony Isabella & Trevor Von Eeden', '*'],
    ['P', 'Batman and the Outsiders', 1983, 'Mike W. Barr & Jim Aparo'],
    ['C', 'Justice League of America (Meltzer run)', 2006, 'Brad Meltzer & Ed Benes'],
    ['C', 'Black Lightning: Year One', 2009, 'Jen Van Meter & Cully Hamner'],
    ['R', 'Black Lightning: Cold Dead Hands', 2018, 'Tony Isabella & Clayton Henry']]);
  H('vixen', 'Vixen (Mari McCabe)', 'Vixen', [
    ['P', 'Action Comics #521 (debut)', 1981, 'Gerry Conway & Curt Swan'],
    ['P', 'Justice League of America (Detroit era)', 1984, 'Gerry Conway & Chuck Patton'],
    ['C', 'Suicide Squad (Ostrander run)', 1987, 'John Ostrander & Luke McDonnell'],
    ['C', 'Vixen: Return of the Lion', 2008, 'G. Willow Wilson & CAFU', '*'],
    ['N', 'Justice League of America', 2013, 'Geoff Johns & David Finch'],
    ['R', 'Justice League of America (Orlando run)', 2017, 'Steve Orlando & Ivan Reis']]);
  H('firestorm', 'Firestorm (Ronnie Raymond / Martin Stein / Jason Rusch)', 'Firestorm', [
    ['P', 'Firestorm, the Nuclear Man', 1978, 'Gerry Conway & Al Milgrom'],
    ['P', 'The Fury of Firestorm', 1982, 'Gerry Conway & Pat Broderick', '*'],
    ['C', 'Firestorm (Ostrander run)', 1987, 'John Ostrander & Joe Brozowski'],
    ['C', 'Firestorm (Jason Rusch)', 2004, 'Dan Jolley & ChrisCross'],
    ['C', 'Blackest Night', 2009, 'Geoff Johns & Ivan Reis'],
    ['N', 'The Fury of Firestorm: The Nuclear Men', 2011, 'Gail Simone, Ethan Van Sciver & Yildiray Cinar']]);
  H('redtornado', 'Red Tornado', 'Red Tornado', [
    ['P', 'Justice League of America #64 (debut)', 1968, 'Gardner Fox & Dick Dillin'],
    ['C', "Justice League of America: The Tornado's Path", 2006, 'Brad Meltzer & Ed Benes', '*'],
    ['C', 'Red Tornado', 2009, 'Kevin Grevioux & Jorge Correa Jr.']]);
  H('vicsage', 'The Question (Vic Sage)', 'The Question (Vic)', [
    ['P', 'Blue Beetle #1 backup (debut, Charlton)', 1967, 'Steve Ditko'],
    ['C', 'The Question', 1987, "Denny O'Neil & Denys Cowan", '*'],
    ['C', '52', 2006, 'Geoff Johns, Grant Morrison, Greg Rucka & Mark Waid'],
    ['R', 'The Question: The Deaths of Vic Sage', 2019, 'Jeff Lemire & Denys Cowan']]);
  H('renee', 'The Question (Renee Montoya)', 'The Question (Renee)', [
    ['C', 'Gotham Central: Half a Life', 2003, 'Greg Rucka & Michael Lark', '*'],
    ['C', '52', 2006, 'Geoff Johns, Grant Morrison, Greg Rucka & Mark Waid'],
    ['C', 'Crime Bible: The Five Lessons of Blood', 2007, 'Greg Rucka & Tom Mandrake'],
    ['C', 'Final Crisis: Revelations', 2008, 'Greg Rucka & Philip Tan'],
    ['C', 'The Question: Pipeline (Detective Comics backups)', 2009, 'Greg Rucka & Cully Hamner']]);
  H('wildcat', 'Wildcat (Ted Grant)', 'Wildcat', [
    ['P', 'Sensation Comics #1 (debut)', 1942, 'Bill Finger & Irwin Hasen'],
    ['C', 'Batman/Wildcat', 1997, 'Chuck Dixon & Beau Smith'],
    ['C', 'JSA (Johns run)', 1999, 'Geoff Johns, David Goyer & Stephen Sadowski', '*'],
    ['C', 'Justice Society of America: The Next Age', 2007, 'Geoff Johns & Dale Eaglesham']]);
  H('jay', 'The Flash (Jay Garrick)', 'Flash (Jay)', [
    ['P', 'Flash Comics #1 (debut)', 1940, 'Gardner Fox & Harry Lampert'],
    ['P', 'Flash of Two Worlds', 1961, 'Gardner Fox & Carmine Infantino', '*'],
    ['P', 'Crisis on Earth-One! / Crisis on Earth-Two!', 1963, 'Gardner Fox & Mike Sekowsky'],
    ['C', 'The Golden Age', 1993, 'James Robinson & Paul Smith', 'x'],
    ['C', 'JSA (Johns run)', 1999, 'Geoff Johns, David Goyer & Stephen Sadowski'],
    ['N', 'Earth 2: The Gathering', 2012, 'James Robinson & Nicola Scott'],
    ['R', 'Flash War', 2018, 'Joshua Williamson & Howard Porter']]);
  H('alan', 'Green Lantern (Alan Scott)', 'Green Lantern (Alan)', [
    ['P', 'All-American Comics #16 (debut)', 1940, 'Martin Nodell & Bill Finger'],
    ['C', 'The Golden Age', 1993, 'James Robinson & Paul Smith', 'x'],
    ['C', 'JSA: Thy Kingdom Come', 2007, 'Geoff Johns, Alex Ross & Dale Eaglesham'],
    ['N', 'Earth 2: The Gathering', 2012, 'James Robinson & Nicola Scott'],
    ['M', 'Alan Scott: The Green Lantern', 2023, 'Tim Sheridan & Cian Tormey', '*']]);
  H('stargirl', 'Stargirl (Courtney Whitmore)', 'Stargirl', [
    ['C', 'Stars and S.T.R.I.P.E.', 1999, 'Geoff Johns & Lee Moder', '*'],
    ['C', 'JSA (Johns run)', 1999, 'Geoff Johns & others'],
    ['C', 'Justice Society of America: The Next Age', 2007, 'Geoff Johns & Dale Eaglesham'],
    ['N', 'Justice League of America', 2013, 'Geoff Johns & David Finch'],
    ['M', 'Stargirl: The Lost Children', 2022, 'Geoff Johns & Todd Nauck']]);
  H('barda', 'Big Barda', 'Big Barda', [
    ['P', 'Mister Miracle #4 (debut)', 1971, 'Jack Kirby'],
    ['C', 'Justice League International', 1987, 'Keith Giffen, J.M. DeMatteis & Kevin Maguire'],
    ['C', 'JLA: Rock of Ages', 1997, 'Grant Morrison & Howard Porter'],
    ['R', 'Mister Miracle', 2017, 'Tom King & Mitch Gerads', '*'],
    ['R', 'Female Furies', 2019, 'Cecil Castellucci & Adriana Melo']]);
  H('scott', 'Mister Miracle (Scott Free)', 'Mister Miracle', [
    ['P', 'Mister Miracle (Kirby run)', 1971, 'Jack Kirby'],
    ['P', 'The Pact (New Gods #7)', 1972, 'Jack Kirby'],
    ['C', 'Justice League International', 1987, 'Keith Giffen, J.M. DeMatteis & Kevin Maguire'],
    ['R', 'Mister Miracle', 2017, 'Tom King & Mitch Gerads', '*']]);
  H('orion', 'Orion', 'Orion', [
    ['P', 'New Gods #1', 1971, 'Jack Kirby'],
    ['P', 'The Pact (New Gods #7)', 1972, 'Jack Kirby', '*'],
    ['P', 'The Hunger Dogs', 1985, 'Jack Kirby'],
    ['C', 'Cosmic Odyssey', 1988, 'Jim Starlin & Mike Mignola'],
    ['C', 'Orion', 2000, 'Walter Simonson'],
    ['C', 'Final Crisis', 2008, 'Grant Morrison & J.G. Jones']]);

  V('joker', 'The Joker', 'The Joker', [
    ['P', 'Batman #1', 1940, 'Bill Finger, Bob Kane & Jerry Robinson'],
    ['P', "The Joker's Five-Way Revenge", 1973, "Denny O'Neil & Neal Adams"],
    ['P', 'The Laughing Fish', 1978, 'Steve Englehart & Marshall Rogers'],
    ['C', 'The Killing Joke', 1988, 'Alan Moore & Brian Bolland', '*'],
    ['C', 'A Death in the Family', 1988, 'Jim Starlin & Jim Aparo'],
    ['C', 'Emperor Joker', 2000, 'Jeph Loeb, Joe Kelly & others'],
    ['C', 'Batman: The Man Who Laughs', 2005, 'Ed Brubaker & Doug Mahnke'],
    ['C', 'Joker', 2008, 'Brian Azzarello & Lee Bermejo', 'x'],
    ['N', 'Death of the Family', 2012, 'Scott Snyder & Greg Capullo'],
    ['N', 'Endgame', 2014, 'Scott Snyder & Greg Capullo'],
    ['R', 'Joker War', 2020, 'James Tynion IV & Jorge Jimenez'],
    ['M', 'The Joker', 2021, 'James Tynion IV & Guillem March']]);
  V('lex', 'Lex Luthor', 'Lex Luthor', [
    ['P', 'How Luthor Met Superboy (Adventure Comics #271)', 1960, 'Jerry Siegel & Al Plastino'],
    ['P', 'The Showdown Between Luthor and Superman (Superman #164)', 1963, 'Edmond Hamilton & Curt Swan'],
    ['C', 'The Man of Steel', 1986, 'John Byrne'],
    ['C', 'Superman/Batman: Public Enemies', 2003, 'Jeph Loeb & Ed McGuinness'],
    ['C', 'Lex Luthor: Man of Steel', 2005, 'Brian Azzarello & Lee Bermejo', '*'],
    ['C', 'Action Comics: The Black Ring', 2010, 'Paul Cornell & Pete Woods'],
    ['N', 'Forever Evil', 2013, 'Geoff Johns & David Finch'],
    ['N', 'Justice League: The Darkseid War', 2015, 'Geoff Johns & Jason Fabok'],
    ['R', 'Justice League: The Totality / Doom War', 2018, 'Scott Snyder & Jorge Jimenez'],
    ['M', 'Superman: House of Brainiac', 2024, 'Joshua Williamson & Rafa Sandoval']]);
  V('darkseid', 'Darkseid', 'Darkseid', [
    ['P', 'Forever People #1', 1971, 'Jack Kirby'],
    ['P', 'The Great Darkness Saga', 1982, 'Paul Levitz & Keith Giffen', '*'],
    ['P', 'The Hunger Dogs', 1985, 'Jack Kirby'],
    ['C', 'Legends', 1986, 'John Ostrander, Len Wein & John Byrne'],
    ['C', 'Cosmic Odyssey', 1988, 'Jim Starlin & Mike Mignola'],
    ['C', 'Final Crisis', 2008, 'Grant Morrison & J.G. Jones'],
    ['N', 'Justice League: Origin', 2011, 'Geoff Johns & Jim Lee'],
    ['N', 'Justice League: The Darkseid War', 2015, 'Geoff Johns & Jason Fabok'],
    ['R', 'Mister Miracle', 2017, 'Tom King & Mitch Gerads']]);
  V('sinestro', 'Sinestro (Thaal Sinestro)', 'Sinestro', [
    ['P', 'Green Lantern #7 (debut)', 1961, 'John Broome & Gil Kane'],
    ['C', 'The Sinestro Corps War', 2007, 'Geoff Johns, Dave Gibbons & Ivan Reis', '*'],
    ['C', 'Green Lantern: Secret Origin', 2008, 'Geoff Johns & Ivan Reis'],
    ['N', 'Green Lantern: Sinestro', 2011, 'Geoff Johns & Doug Mahnke'],
    ['N', 'Sinestro: The Demon Within', 2014, 'Cullen Bunn & Dale Eaglesham'],
    ['R', "Hal Jordan and the Green Lantern Corps: Sinestro's Law", 2016, 'Robert Venditti & Rafa Sandoval']]);
  V('deathstroke', 'Deathstroke (Slade Wilson)', 'Deathstroke', [
    ['P', 'The New Teen Titans #2 (debut)', 1980, 'Marv Wolfman & George Pérez'],
    ['P', 'The Judas Contract', 1984, 'Marv Wolfman & George Pérez', '*'],
    ['C', 'Deathstroke the Terminator: Full Cycle', 1991, 'Marv Wolfman & Steve Erwin'],
    ['C', 'Identity Crisis', 2004, 'Brad Meltzer & Rags Morales'],
    ['R', 'Deathstroke: The Professional', 2016, 'Christopher Priest & Carlo Pagulayan'],
    ['R', 'Titans: The Lazarus Contract', 2017, 'Christopher Priest, Dan Abnett & others'],
    ['R', 'Deathstroke vs. Batman', 2018, 'Christopher Priest & Carlo Pagulayan']]);
  V('reverseflash', 'Reverse-Flash (Eobard Thawne)', 'Reverse-Flash', [
    ['P', 'Menace of the Reverse-Flash (Flash #139)', 1963, 'John Broome & Carmine Infantino'],
    ['P', 'What Ever Happened to Iris Allen? (Flash #275)', 1979, 'Cary Bates & Alex Saviuk'],
    ['P', 'The Trial of the Flash', 1983, 'Cary Bates & Carmine Infantino'],
    ['C', 'The Return of Barry Allen', 1993, 'Mark Waid & Greg LaRocque'],
    ['C', 'The Flash: Rebirth', 2009, 'Geoff Johns & Ethan Van Sciver'],
    ['C', 'Flashpoint', 2011, 'Geoff Johns & Andy Kubert', '*'],
    ['R', 'The Button', 2017, 'Tom King, Joshua Williamson & Jason Fabok'],
    ['R', 'The Flash: Year One', 2019, 'Joshua Williamson & Howard Porter']]);
  V('brainiac', 'Brainiac (Vril Dox)', 'Brainiac', [
    ['P', 'The Super-Duel in Space (Action Comics #242)', 1958, 'Otto Binder & Al Plastino'],
    ['P', 'Whatever Happened to the Man of Tomorrow?', 1986, 'Alan Moore & Curt Swan'],
    ['C', 'Panic in the Sky', 1992, 'Dan Jurgens & others'],
    ['C', 'Superman: Brainiac', 2008, 'Geoff Johns & Gary Frank', '*'],
    ['N', 'Superman: Doomed', 2014, 'Greg Pak, Charles Soule & others'],
    ['M', 'Superman: House of Brainiac', 2024, 'Joshua Williamson & Rafa Sandoval']]);
  V('zod', 'General Zod (Dru-Zod)', 'General Zod', [
    ['P', 'Adventure Comics #283 (debut)', 1961, 'Robert Bernstein & George Papp'],
    ['P', 'The Phantom Zone', 1982, 'Steve Gerber & Gene Colan'],
    ['C', 'Superman #22 (the Pocket Universe)', 1988, 'John Byrne'],
    ['C', 'Superman: Last Son', 2006, 'Geoff Johns, Richard Donner & Adam Kubert', '*'],
    ['C', 'Superman: New Krypton', 2008, 'Geoff Johns, James Robinson & others'],
    ['M', 'Kneel Before Zod', 2024, 'Joe Casey & Dan McDaid']]);
  V('ras', "Ra's al Ghul", "Ra's al Ghul", [
    ['P', 'Daughter of the Demon (Batman #232)', 1971, "Denny O'Neil & Neal Adams", '*'],
    ['P', 'The Demon Lives Again! (Batman #243–244)', 1972, "Denny O'Neil & Neal Adams"],
    ['C', 'Batman: Son of the Demon', 1987, 'Mike W. Barr & Jerry Bingham', 'x'],
    ['C', 'Batman: Birth of the Demon', 1992, "Denny O'Neil & Norm Breyfogle"],
    ['C', 'JLA: Tower of Babel', 2000, 'Mark Waid & Howard Porter'],
    ['C', "Batman: The Resurrection of Ra's al Ghul", 2007, 'Grant Morrison, Paul Dini & others']]);
  V('cheetah', 'Cheetah (Barbara Ann Minerva)', 'Cheetah', [
    ['P', 'Wonder Woman #6 (Priscilla Rich)', 1943, 'William Moulton Marston & H.G. Peter'],
    ['C', 'Wonder Woman #7–8 (Barbara Minerva debut)', 1987, 'George Pérez & Len Wein'],
    ['C', 'Challenge of the Gods', 1987, 'George Pérez'],
    ['N', 'Justice League #13–14 (New 52 origin)', 2012, 'Geoff Johns & Tony S. Daniel'],
    ['R', 'Wonder Woman: Godwatch', 2017, 'Greg Rucka & Bilquis Evely', '*']]);
  V('blackadam', 'Black Adam (Teth-Adam)', 'Black Adam', [
    ['P', 'The Marvel Family #1 (debut)', 1945, 'Otto Binder & C.C. Beck'],
    ['C', 'The Power of Shazam!', 1994, 'Jerry Ordway'],
    ['C', 'JSA: Black Reign', 2003, 'Geoff Johns & Don Kramer'],
    ['C', '52', 2006, 'Geoff Johns, Grant Morrison, Greg Rucka & Mark Waid', '*'],
    ['C', 'Black Adam: The Dark Age', 2007, 'Peter J. Tomasi & Doug Mahnke'],
    ['N', 'Shazam! (Justice League backups)', 2012, 'Geoff Johns & Gary Frank'],
    ['M', 'Black Adam', 2022, 'Christopher Priest & Rafa Sandoval']]);
  V('harley', 'Harley Quinn (Harleen Quinzel)', 'Harley Quinn', [
    ['C', 'Mad Love', 1994, 'Paul Dini & Bruce Timm', '*'],
    ['C', 'Batman: Harley Quinn', 1999, 'Paul Dini & Yvel Guichet'],
    ['C', 'Gotham City Sirens', 2009, 'Paul Dini & Guillem March'],
    ['N', 'Harley Quinn: Hot in the City', 2013, 'Amanda Conner, Jimmy Palmiotti & Chad Hardin'],
    ['R', 'Suicide Squad: Black Vault', 2016, 'Rob Williams & Jim Lee'],
    ['R', 'Harleen', 2019, 'Stjepan Šejić', 'x']]);
  V('twoface', 'Two-Face (Harvey Dent)', 'Two-Face', [
    ['P', 'Detective Comics #66 (debut)', 1942, 'Bill Finger & Bob Kane'],
    ['P', 'Half an Evil (Batman #234)', 1971, "Denny O'Neil & Neal Adams"],
    ['C', 'Eye of the Beholder (Batman Annual #14)', 1990, 'Andrew Helfer & Chris Sprouse'],
    ['C', 'The Long Halloween', 1996, 'Jeph Loeb & Tim Sale', '*'],
    ['C', 'Batman: Face the Face', 2006, 'James Robinson & Don Kramer'],
    ['N', 'Batman and Robin: The Big Burn', 2013, 'Peter J. Tomasi & Patrick Gleason'],
    ['M', 'Batman: One Bad Day: Two-Face', 2022, 'Mariko Tamaki & Javier Fernández']]);
  V('riddler', 'The Riddler (Edward Nygma)', 'The Riddler', [
    ['P', 'Detective Comics #140 (debut)', 1948, 'Bill Finger & Dick Sprang'],
    ['C', 'Secret Origins Special: When Is a Door', 1989, 'Neil Gaiman & Bernie Mireault'],
    ['C', 'Detective Comics (Dini run)', 2006, 'Paul Dini & others'],
    ['N', 'Zero Year', 2013, 'Scott Snyder & Greg Capullo'],
    ['R', 'The War of Jokes and Riddles', 2017, 'Tom King & Mikel Janín'],
    ['M', 'Batman: One Bad Day: The Riddler', 2022, 'Tom King & Mitch Gerads', '*'],
    ['M', 'Riddler: Year One', 2022, 'Paul Dano & Stevan Subic']]);
  V('penguin', 'The Penguin (Oswald Cobblepot)', 'The Penguin', [
    ['P', 'Detective Comics #58 (debut)', 1941, 'Bill Finger & Bob Kane'],
    ['C', 'Batman: Penguin Triumphant', 1992, 'John Ostrander & Joe Staton'],
    ['N', 'Penguin: Pain and Prejudice', 2011, 'Gregg Hurwitz & Szymon Kudranski'],
    ['M', 'The Penguin', 2023, 'Tom King & Rafael de Latorre', '*']]);
  V('bane', 'Bane', 'Bane', [
    ['C', 'Vengeance of Bane', 1993, 'Chuck Dixon & Graham Nolan'],
    ['C', 'Knightfall', 1993, 'Chuck Dixon, Doug Moench & others', '*'],
    ['C', 'Secret Six', 2008, 'Gail Simone & Nicola Scott'],
    ['N', 'Forever Evil: Arkham War', 2013, 'Peter J. Tomasi & Scot Eaton'],
    ['R', 'I Am Bane', 2017, 'Tom King & David Finch'],
    ['R', 'City of Bane', 2019, 'Tom King & others']]);
  V('manta', 'Black Manta (David Hyde)', 'Black Manta', [
    ['P', 'Aquaman #35 (debut)', 1967, 'Bob Haney & Nick Cardy'],
    ['P', 'The Death of a Prince', 1977, 'David Michelinie, Paul Levitz & Jim Aparo', '*'],
    ['N', 'Aquaman: The Others', 2012, 'Geoff Johns & Ivan Reis'],
    ['N', 'Forever Evil', 2013, 'Geoff Johns & David Finch'],
    ['R', 'Aquaman: The Drowning', 2016, 'Dan Abnett & Brad Walker'],
    ['M', 'Black Manta', 2021, 'Chuck Brown & Valentine De Landro']]);
  V('scarecrow', 'Scarecrow (Jonathan Crane)', 'Scarecrow', [
    ['P', "World's Finest Comics #3 (debut)", 1941, 'Bill Finger & Bob Kane'],
    ['C', "Batman: Haunted Knight ('Fears')", 1993, 'Jeph Loeb & Tim Sale', '*'],
    ['C', 'The Long Halloween', 1996, 'Jeph Loeb & Tim Sale'],
    ['C', 'Scarecrow: Year One', 2005, 'Bruce Jones & Sean Murphy'],
    ['M', 'Batman: Fear State', 2021, 'James Tynion IV & Jorge Jimenez']]);
  V('ivy', 'Poison Ivy (Pamela Isley)', 'Poison Ivy', [
    ['P', 'Batman #181 (debut)', 1966, 'Robert Kanigher & Sheldon Moldoff'],
    ['C', 'Secret Origins #36: Pavane', 1989, 'Neil Gaiman & Mark Buckingham'],
    ['C', "Batman: No Man's Land", 1999, 'Greg Rucka & others'],
    ['C', 'Gotham City Sirens', 2009, 'Paul Dini & Guillem March'],
    ['R', 'Everyone Loves Ivy (Batman #41–43)', 2018, 'Tom King & Mikel Janín'],
    ['M', 'Poison Ivy: The Virtuous Cycle', 2022, 'G. Willow Wilson & Marcio Takara', '*']]);
  V('freeze', 'Mr. Freeze (Victor Fries)', 'Mr. Freeze', [
    ['P', 'Batman #121 (debut as Mr. Zero)', 1959, 'Dave Wood & Sheldon Moldoff'],
    ['C', 'Batman: Mr. Freeze', 1997, 'Paul Dini & Mark Buckingham', '*'],
    ['N', 'Batman Annual #1: First Snow', 2012, 'Scott Snyder, James Tynion IV & Jason Fabok'],
    ['R', 'Batman: Cold Days (Batman #51–53)', 2018, 'Tom King & Lee Weeks']]);
  V('clayface', 'Clayface (Basil Karlo)', 'Clayface', [
    ['P', 'Detective Comics #40 (debut)', 1940, 'Bill Finger & Bob Kane'],
    ['C', 'Mudpack', 1989, 'Alan Grant & Norm Breyfogle'],
    ['R', 'Detective Comics: Rise and Fall of the Batmen', 2016, 'James Tynion IV & Eddy Barrows', '*']]);
  V('hush', 'Hush (Thomas Elliot)', 'Hush', [
    ['C', 'Hush', 2002, 'Jeph Loeb & Jim Lee', '*'],
    ['C', 'Batman: Heart of Hush', 2008, 'Paul Dini & Dustin Nguyen'],
    ['C', 'Batman: Streets of Gotham', 2009, 'Paul Dini & Dustin Nguyen'],
    ['N', 'Batman Eternal', 2014, 'Scott Snyder, James Tynion IV & others'],
    ['M', 'H2SH', 2025, 'Jeph Loeb & Jim Lee']]);
  V('owls', 'The Court of Owls', 'Court of Owls', [
    ['C', 'Batman: Gates of Gotham', 2011, 'Scott Snyder, Kyle Higgins & Trevor McCarthy'],
    ['N', 'The Court of Owls', 2011, 'Scott Snyder & Greg Capullo', '*'],
    ['N', 'Night of the Owls', 2012, 'Scott Snyder & others'],
    ['N', 'Batman: City of Owls', 2012, 'Scott Snyder & Greg Capullo'],
    ['N', 'Talon', 2012, 'James Tynion IV & Guillem March']]);
  V('croc', 'Killer Croc (Waylon Jones)', 'Killer Croc', [
    ['P', 'Batman #357 (debut)', 1983, 'Gerry Conway & Don Newton'],
    ['C', 'Hush', 2002, 'Jeph Loeb & Jim Lee'],
    ['C', 'Arkham Asylum: Living Hell', 2003, 'Dan Slott & Ryan Sook'],
    ['C', 'Batman: Broken City', 2003, 'Brian Azzarello & Eduardo Risso', '*'],
    ['R', 'Suicide Squad (Rob Williams run)', 2016, 'Rob Williams & Jim Lee']]);
  V('manbat', 'Man-Bat (Kirk Langstrom)', 'Man-Bat', [
    ['P', 'Challenge of the Man-Bat (Detective #400)', 1970, 'Frank Robbins & Neal Adams', '*'],
    ['C', 'Man-Bat', 1996, 'Jamie Delano & John Bolton', 'x'],
    ['R', 'Justice League Dark (Tynion run)', 2018, 'James Tynion IV & Álvaro Martínez Bueno'],
    ['M', 'Man-Bat', 2021, 'Dave Wielgosz & Sumit Kumar']]);
  V('doomsday', 'Doomsday', 'Doomsday', [
    ['C', 'The Death of Superman', 1992, 'Dan Jurgens & others', '*'],
    ['C', 'Superman/Doomsday: Hunter/Prey', 1994, 'Dan Jurgens & Brett Breeding'],
    ['N', 'Superman: Doomed', 2014, 'Greg Pak, Charles Soule & others'],
    ['R', 'Action Comics: Path of Doom', 2016, 'Dan Jurgens & Patrick Zircher']]);
  V('bizarro', 'Bizarro', 'Bizarro', [
    ['P', 'Superboy #68 (debut)', 1958, 'Otto Binder & George Papp'],
    ['P', 'Tales of the Bizarro World', 1961, 'Jerry Siegel & John Forte'],
    ['C', 'The Man of Steel #5', 1986, 'John Byrne'],
    ['C', 'Escape from Bizarro World', 2007, 'Geoff Johns, Richard Donner & Eric Powell', '*'],
    ['N', 'Bizarro', 2015, 'Heath Corson & Gustavo Duarte'],
    ['R', 'Red Hood and the Outlaws: Dark Trinity', 2016, 'Scott Lobdell & Dexter Soy']]);
  V('metallo', 'Metallo (John Corben)', 'Metallo', [
    ['P', 'Action Comics #252 (debut)', 1959, 'Robert Bernstein & Al Plastino'],
    ['C', 'Superman #1 (1987)', 1987, 'John Byrne'],
    ['C', 'Superman: Secret Origin', 2009, 'Geoff Johns & Gary Frank', '*'],
    ['N', 'Action Comics: Superman and the Men of Steel', 2011, 'Grant Morrison & Rags Morales']]);
  V('parasite', 'Parasite (Rudy Jones)', 'Parasite', [
    ['P', 'Action Comics #340 (first Parasite)', 1966, 'Jim Shooter & Al Plastino'],
    ['C', 'Firestorm #58 (Rudy Jones debut)', 1987, 'John Ostrander & Joe Brozowski'],
    ['C', 'Superman: Secret Origin', 2009, 'Geoff Johns & Gary Frank', '*']]);
  V('ares', 'Ares', 'Ares', [
    ['P', 'Wonder Woman #2 (as Mars)', 1942, 'William Moulton Marston & H.G. Peter'],
    ['C', 'Gods and Mortals', 1987, 'George Pérez & Greg Potter', '*'],
    ['C', 'War of the Gods', 1991, 'George Pérez'],
    ['N', 'Wonder Woman: War', 2013, 'Brian Azzarello & Cliff Chiang'],
    ['R', 'Wonder Woman: The Truth', 2017, 'Greg Rucka & Liam Sharp']]);
  V('circe', 'Circe', 'Circe', [
    ['C', 'Wonder Woman #17–19 (post-Crisis debut)', 1988, 'George Pérez'],
    ['C', 'War of the Gods', 1991, 'George Pérez', '*'],
    ['C', 'Amazons Attack!', 2007, 'Will Pfeifer & Pete Woods']]);
  V('maxlord', 'Maxwell Lord', 'Maxwell Lord', [
    ['C', 'Justice League #1', 1987, 'Keith Giffen, J.M. DeMatteis & Kevin Maguire'],
    ['C', 'Countdown to Infinite Crisis', 2005, 'Geoff Johns, Greg Rucka & Judd Winick'],
    ['C', 'Wonder Woman: Sacrifice', 2005, 'Greg Rucka & others', '*'],
    ['C', 'Justice League: Generation Lost', 2010, 'Keith Giffen & Judd Winick'],
    ['R', 'Justice League vs. Suicide Squad', 2016, 'Joshua Williamson & Jason Fabok']]);
  V('savage', 'Vandal Savage', 'Vandal Savage', [
    ['P', 'Green Lantern #10 (debut)', 1943, 'Alfred Bester & Martin Nodell'],
    ['C', 'DC One Million', 1998, 'Grant Morrison & Val Semeiks'],
    ['C', 'JSA: Savage Times', 2002, 'Geoff Johns, David Goyer & Leonard Kirk'],
    ['N', 'Demon Knights', 2011, 'Paul Cornell & Diógenes Neves', '*'],
    ['N', 'Superman: Savage Dawn', 2016, 'Peter J. Tomasi, Patrick Gleason & others']]);
  V('grodd', 'Gorilla Grodd', 'Gorilla Grodd', [
    ['P', 'The Menace of Gorilla Grodd (Flash #106)', 1959, 'John Broome & Carmine Infantino'],
    ['N', 'The Flash: Gorilla Warfare', 2013, 'Francis Manapul & Brian Buccellato', '*'],
    ['N', 'Forever Evil', 2013, 'Geoff Johns & David Finch'],
    ['R', 'Justice League: The Totality / Doom War', 2018, 'Scott Snyder & Jorge Jimenez']]);
  V('cold', 'Captain Cold (Leonard Snart)', 'Captain Cold', [
    ['P', 'Showcase #8 (debut)', 1957, 'John Broome & Carmine Infantino'],
    ['C', 'The Flash: Rogues', 2003, 'Geoff Johns & Scott Kolins'],
    ['C', "Final Crisis: Rogues' Revenge", 2008, 'Geoff Johns & Scott Kolins', '*'],
    ['N', 'Forever Evil: Rogues Rebellion', 2013, 'Brian Buccellato & Patrick Zircher'],
    ['M', 'Rogues', 2022, 'Joshua Williamson & Leomacs', 'x']]);
  V('zoom', 'Zoom (Hunter Zolomon)', 'Zoom', [
    ['C', 'The Flash: Blitz', 2001, 'Geoff Johns & Scott Kolins', '*'],
    ['C', 'The Flash: Rogue War', 2005, 'Geoff Johns & Howard Porter'],
    ['R', 'The Flash: Running Scared', 2017, 'Joshua Williamson & Carmine Di Giandomenico'],
    ['R', 'Flash War', 2018, 'Joshua Williamson & Howard Porter']]);
  V('atrocitus', 'Atrocitus', 'Atrocitus', [
    ['C', 'Green Lantern: Secret Origin', 2008, 'Geoff Johns & Ivan Reis'],
    ['C', 'Rage of the Red Lanterns', 2008, 'Geoff Johns & Shane Davis', '*'],
    ['C', 'Blackest Night', 2009, 'Geoff Johns & Ivan Reis'],
    ['N', 'Red Lanterns', 2011, 'Peter Milligan & Ed Benes']]);
  V('larfleeze', 'Larfleeze', 'Larfleeze', [
    ['C', 'Green Lantern: Agent Orange', 2009, 'Geoff Johns & Philip Tan', '*'],
    ['C', 'Blackest Night', 2009, 'Geoff Johns & Ivan Reis'],
    ['N', 'Larfleeze', 2013, 'Keith Giffen, J.M. DeMatteis & Scott Kolins']]);
  V('sapphire', 'Star Sapphire (Carol Ferris)', 'Star Sapphire', [
    ['P', 'Showcase #22 (Carol Ferris debut)', 1959, 'John Broome & Gil Kane'],
    ['P', 'Green Lantern #16 (first Star Sapphire)', 1962, 'Gardner Fox & Gil Kane'],
    ['C', 'Green Lantern: Secret Origin', 2008, 'Geoff Johns & Ivan Reis'],
    ['C', 'Blackest Night', 2009, 'Geoff Johns & Ivan Reis', '*'],
    ['N', 'Green Lantern: New Guardians', 2011, 'Tony Bedard & Tyler Kirkham']]);
  V('oceanmaster', 'Ocean Master (Orm Marius)', 'Ocean Master', [
    ['P', 'Aquaman #29 (debut)', 1966, 'Bob Haney & Nick Cardy'],
    ['C', 'Aquaman: Time and Tide', 1993, 'Peter David & Kirk Jarvinen'],
    ['N', 'Throne of Atlantis', 2012, 'Geoff Johns, Paul Pelletier & Ivan Reis', '*'],
    ['R', 'Ocean Master: Year of the Villain', 2019, 'Dan Watters & Miguel Mendonça']]);
  V('blackhand', 'Black Hand (William Hand)', 'Black Hand', [
    ['P', 'Green Lantern #29 (debut)', 1964, 'John Broome & Gil Kane'],
    ['C', 'Green Lantern: Secret Origin', 2008, 'Geoff Johns & Ivan Reis'],
    ['C', 'Blackest Night', 2009, 'Geoff Johns & Ivan Reis', '*'],
    ['N', 'Green Lantern: The Revenge of Black Hand', 2012, 'Geoff Johns & Doug Mahnke']]);
  V('trigon', 'Trigon', 'Trigon', [
    ['P', 'The Terror of Trigon (New Teen Titans #1–5)', 1980, 'Marv Wolfman & George Pérez'],
    ['P', 'The Terror of Trigon (New Teen Titans vol. 2 #1–6)', 1984, 'Marv Wolfman & George Pérez', '*'],
    ['C', 'Titans: Old Friends', 2008, 'Judd Winick & Joe Benitez']]);
  V('waller', 'Amanda Waller', 'Amanda Waller', [
    ['C', 'Legends', 1986, 'John Ostrander, Len Wein & John Byrne'],
    ['C', 'Suicide Squad: Trial by Fire', 1987, 'John Ostrander & Luke McDonnell', '*'],
    ['C', 'Checkmate', 2006, 'Greg Rucka & Jesus Saiz'],
    ['R', 'Suicide Squad: Black Vault', 2016, 'Rob Williams & Jim Lee'],
    ['M', 'Absolute Power', 2024, 'Mark Waid & Dan Mora']]);
  V('lobo', 'Lobo', 'Lobo', [
    ['P', 'Omega Men #3 (debut)', 1983, 'Roger Slifer & Keith Giffen'],
    ['C', 'L.E.G.I.O.N.', 1989, 'Keith Giffen, Alan Grant & Barry Kitson'],
    ['C', 'Lobo: The Last Czarnian', 1990, 'Keith Giffen, Alan Grant & Simon Bisley', '*'],
    ['C', "Lobo's Paramilitary Christmas Special", 1991, 'Keith Giffen, Alan Grant & Simon Bisley'],
    ['R', 'Justice League of America (Orlando run)', 2017, 'Steve Orlando & Ivan Reis']]);
  V('grundy', 'Solomon Grundy', 'Solomon Grundy', [
    ['P', 'All-American Comics #61 (debut)', 1944, 'Alfred Bester & Paul Reinman'],
    ['C', 'The Long Halloween', 1996, 'Jeph Loeb & Tim Sale'],
    ['C', 'Solomon Grundy: Born on a Monday', 2009, 'Geoff Johns & Scott Kolins', '*'],
    ['C', 'Blackest Night', 2009, 'Geoff Johns & Ivan Reis']]);
  V('drlight', 'Doctor Light (Arthur Light)', 'Doctor Light', [
    ['P', 'Justice League of America #12 (debut)', 1962, 'Gardner Fox & Mike Sekowsky'],
    ['C', 'Identity Crisis', 2004, 'Brad Meltzer & Rags Morales', '*'],
    ['C', 'Final Crisis: Revelations', 2008, 'Greg Rucka & Philip Tan']]);
  V('despero', 'Despero', 'Despero', [
    ['P', 'Justice League of America #1 (debut)', 1960, 'Gardner Fox & Mike Sekowsky', '*']],
    'A classic Justice League foe with few standalone classics; his first appearance is still his best showcase.');

  X('lucifer', 'Lucifer Morningstar', 'Lucifer', [
    ['C', 'The Sandman: Season of Mists', 1990, 'Neil Gaiman & Kelley Jones'],
    ['C', 'Lucifer (Carey & Gross)', 2000, 'Mike Carey & Peter Gross', '*'],
    ['N', 'Lucifer', 2015, 'Holly Black & Lee Garbett'],
    ['R', 'The Sandman Universe: Lucifer', 2018, 'Dan Watters & Max Fiumara']]);
  X('dream', 'Dream of the Endless (Morpheus)', 'Dream', [
    ['C', 'Preludes & Nocturnes', 1989, 'Neil Gaiman, Sam Kieth & Mike Dringenberg', '*'],
    ['C', "The Doll's House", 1989, 'Neil Gaiman & Mike Dringenberg'],
    ['C', 'Season of Mists', 1990, 'Neil Gaiman & Kelley Jones'],
    ['C', 'The Kindly Ones', 1994, 'Neil Gaiman & Marc Hempel'],
    ['C', 'Sandman: Endless Nights', 2003, 'Neil Gaiman & various'],
    ['N', 'The Sandman: Overture', 2013, 'Neil Gaiman & J.H. Williams III'],
    ['R', 'The Dreaming', 2018, 'Simon Spurrier & Bilquis Evely']]);
  X('death', 'Death of the Endless', 'Death', [
    ['C', 'The Sound of Her Wings (Sandman #8)', 1989, 'Neil Gaiman & Mike Dringenberg', '*'],
    ['C', 'Death: The High Cost of Living', 1993, 'Neil Gaiman & Chris Bachalo'],
    ['C', 'Death: The Time of Your Life', 1996, 'Neil Gaiman & Chris Bachalo'],
    ['C', 'Action Comics #894 (Lex meets Death)', 2010, 'Paul Cornell & Pete Woods']]);
  X('mxy', 'Mister Mxyzptlk', 'Mxyzptlk', [
    ['P', 'Superman #30 (debut)', 1944, 'Jerry Siegel & Ira Yarbrough'],
    ['P', 'Whatever Happened to the Man of Tomorrow?', 1986, 'Alan Moore & Curt Swan', '*'],
    ['C', 'Emperor Joker', 2000, 'Jeph Loeb, Joe Kelly & others'],
    ['C', 'Superman/Batman: With a Vengeance', 2005, 'Jeph Loeb & Ed McGuinness']]);
  X('batmite', 'Bat-Mite', 'Bat-Mite', [
    ['P', 'Detective Comics #267 (debut)', 1959, 'Bill Finger & Sheldon Moldoff'],
    ['C', 'Legend of the Dark Mite (Legends of the Dark Knight #38)', 1992, "Alan Grant & Kevin O'Neill", '*'],
    ['C', 'Superman/Batman: With a Vengeance', 2005, 'Jeph Loeb & Ed McGuinness'],
    ['N', 'Bat-Mite', 2015, 'Dan Jurgens & Corin Howell']]);
  X('antimonitor', 'The Anti-Monitor (Mobius)', 'Anti-Monitor', [
    ['P', 'Crisis on Infinite Earths', 1985, 'Marv Wolfman & George Pérez', '*'],
    ['C', 'The Sinestro Corps War', 2007, 'Geoff Johns, Dave Gibbons & Ivan Reis'],
    ['C', 'Blackest Night', 2009, 'Geoff Johns & Ivan Reis'],
    ['N', 'Justice League: The Darkseid War', 2015, 'Geoff Johns & Jason Fabok']]);
  X('spectre', 'The Spectre (Jim Corrigan / Hal Jordan / Crispus Allen)', 'The Spectre', [
    ['P', 'More Fun Comics #52 (debut)', 1940, 'Jerry Siegel & Bernard Baily'],
    ['P', 'The Wrath of the Spectre', 1974, 'Michael Fleisher & Jim Aparo'],
    ['C', 'The Spectre (Ostrander & Mandrake)', 1992, 'John Ostrander & Tom Mandrake', '*'],
    ['C', 'Day of Judgment (Hal Jordan becomes the Spectre)', 1999, 'Geoff Johns & Matt Smith'],
    ['C', 'Final Crisis: Revelations', 2008, 'Greg Rucka & Philip Tan']]);
  X('presence', 'The Presence', 'The Presence', [
    ['C', 'The Spectre (Ostrander & Mandrake)', 1992, 'John Ostrander & Tom Mandrake'],
    ['C', 'Lucifer (Carey & Gross)', 2000, 'Mike Carey & Peter Gross', '*']]);
  X('guardians', 'The Guardians of the Universe (Ganthet)', 'The Guardians', [
    ['P', 'Green Lantern (Silver Age)', 1959, 'John Broome & Gil Kane'],
    ['C', 'Emerald Twilight', 1994, 'Ron Marz & Darryl Banks'],
    ['C', 'Green Lantern: Rebirth', 2004, 'Geoff Johns & Ethan Van Sciver', '*'],
    ['N', 'Green Lantern: Rise of the Third Army', 2012, 'Geoff Johns & others']]);
  X('parallax', 'Parallax', 'Parallax', [
    ['C', 'Emerald Twilight', 1994, 'Ron Marz & Darryl Banks'],
    ['C', 'Zero Hour', 1994, 'Dan Jurgens'],
    ['C', 'Green Lantern: Rebirth', 2004, 'Geoff Johns & Ethan Van Sciver', '*'],
    ['C', 'The Sinestro Corps War', 2007, 'Geoff Johns, Dave Gibbons & Ivan Reis']]);
  X('ion', 'Ion', 'Ion', [
    ['C', 'Green Lantern: The Power of Ion', 2001, 'Judd Winick & others'],
    ['C', 'Ion: Guardian of the Universe', 2006, 'Ron Marz & Greg Tocchini'],
    ['C', 'The Sinestro Corps War', 2007, 'Geoff Johns, Dave Gibbons & Ivan Reis', '*']]);
  X('butcher', 'The Butcher', 'The Butcher', [
    ['C', 'Blackest Night', 2009, 'Geoff Johns & Ivan Reis'],
    ['C', 'Brightest Day', 2010, 'Geoff Johns, Peter J. Tomasi & Ivan Reis', '*'],
    ['N', 'Red Lanterns', 2011, 'Peter Milligan & Ed Benes']]);
  X('destiny', 'Destiny of the Endless', 'Destiny', [
    ['P', 'Weird Mystery Tales #1 (debut)', 1972, 'Marv Wolfman & Bernie Wrightson'],
    ['C', 'The Sandman', 1989, 'Neil Gaiman & various', '*'],
    ['C', 'Sandman: Endless Nights', 2003, 'Neil Gaiman & various']]);
  X('destruction', 'Destruction of the Endless', 'Destruction', [
    ['C', 'Brief Lives', 1992, 'Neil Gaiman & Jill Thompson', '*'],
    ['C', 'Sandman: Endless Nights', 2003, 'Neil Gaiman & various']]);
  X('desire', 'Desire of the Endless', 'Desire', [
    ['C', "The Doll's House", 1989, 'Neil Gaiman & Mike Dringenberg', '*'],
    ['C', "Endless Nights: What I've Tasted of Desire", 2003, 'Neil Gaiman & Milo Manara']]);
  X('despair', 'Despair of the Endless', 'Despair', [
    ['C', "The Doll's House", 1989, 'Neil Gaiman & Mike Dringenberg'],
    ['C', 'Endless Nights: Fifteen Portraits of Despair', 2003, 'Neil Gaiman & Barron Storey', '*']]);
  X('delirium', 'Delirium of the Endless', 'Delirium', [
    ['C', 'Brief Lives', 1992, 'Neil Gaiman & Jill Thompson', '*'],
    ['C', "Delirium's Party: A Little Endless Storybook", 2011, 'Jill Thompson'],
    ['R', 'The Dreaming', 2018, 'Simon Spurrier & Bilquis Evely']]);
  X('michael', 'Michael Demiurgos', 'Michael', [
    ['C', 'Lucifer (Carey & Gross)', 2000, 'Mike Carey & Peter Gross', '*']]);
  X('elaine', 'Elaine Belloc', 'Elaine Belloc', [
    ['C', 'Lucifer (Carey & Gross)', 2000, 'Mike Carey & Peter Gross', '*'],
    ['C', 'Lucifer #75 (the finale)', 2006, 'Mike Carey & Peter Gross']]);
  X('perpetua', 'Perpetua', 'Perpetua', [
    ['R', 'Justice League: No Justice', 2018, 'Scott Snyder, Joshua Williamson & James Tynion IV'],
    ['R', 'Justice League: The Totality', 2018, 'Scott Snyder & Jim Cheung', '*'],
    ['R', 'Justice/Doom War', 2019, 'Scott Snyder & Jorge Jimenez'],
    ['R', 'Dark Nights: Death Metal', 2020, 'Scott Snyder & Greg Capullo']]);
  X('monitor', 'The Monitor (Mar Novu)', 'The Monitor', [
    ['P', 'The New Teen Titans #21 (first glimpse)', 1982, 'Marv Wolfman & George Pérez'],
    ['P', 'Crisis on Infinite Earths', 1985, 'Marv Wolfman & George Pérez', '*']]);
  X('worldforger', 'The World Forger (Alpheus)', 'World Forger', [
    ['R', 'Dark Days: The Forge', 2017, 'Scott Snyder, James Tynion IV & Jim Lee'],
    ['R', 'Dark Nights: Metal', 2017, 'Scott Snyder & Greg Capullo', '*']]);
  X('source', 'The Source / The Source Wall', 'The Source', [
    ['P', "Jack Kirby's Fourth World", 1971, 'Jack Kirby', '*'],
    ['C', 'Cosmic Odyssey', 1988, 'Jim Starlin & Mike Mignola'],
    ['C', 'Final Crisis', 2008, 'Grant Morrison & J.G. Jones'],
    ['R', 'Justice League: No Justice', 2018, 'Scott Snyder & others']]);
  X('nekron', 'Nekron', 'Nekron', [
    ['P', 'Tales of the Green Lantern Corps #1 (debut)', 1981, 'Mike W. Barr, Len Wein & Joe Staton'],
    ['C', 'Blackest Night', 2009, 'Geoff Johns & Ivan Reis', '*']]);
  X('nix', 'Nix Uotan (The Superjudge)', 'Nix Uotan', [
    ['C', 'Final Crisis', 2008, 'Grant Morrison & J.G. Jones'],
    ['N', 'The Multiversity', 2014, 'Grant Morrison & various', '*']]);
  X('mandrakk', 'Mandrakk (Dax Novu)', 'Mandrakk', [
    ['C', 'Final Crisis: Superman Beyond', 2008, 'Grant Morrison & Doug Mahnke', '*'],
    ['N', 'The Multiversity', 2014, 'Grant Morrison & various']]);
  X('stranger', 'Phantom Stranger', 'Phantom Stranger', [
    ['P', 'The Phantom Stranger #1', 1952, 'John Broome & Carmine Infantino'],
    ['C', 'Secret Origins #10 (four possible origins)', 1987, 'Alan Moore, Paul Levitz & others', '*'],
    ['C', 'The Books of Magic', 1990, 'Neil Gaiman & John Bolton'],
    ['N', 'Trinity of Sin: The Phantom Stranger', 2012, 'Dan DiDio & Brent Anderson']]);
  X('nabu', 'Nabu', 'Nabu', [
    ['P', 'More Fun Comics #67 (Fate\'s origin)', 1941, 'Gardner Fox & Howard Sherman'],
    ['C', 'Doctor Fate (DeMatteis & Giffen)', 1987, 'J.M. DeMatteis & Keith Giffen', '*'],
    ['C', 'JSA: Darkness Falls', 2000, 'Geoff Johns, David Goyer & Stephen Sadowski']]);
  X('mordru', 'Mordru', 'Mordru', [
    ['P', 'Adventure Comics #369 (debut)', 1968, 'Jim Shooter & Curt Swan'],
    ['C', 'JSA: Darkness Falls', 2000, 'Geoff Johns, David Goyer & Stephen Sadowski', '*']]);
  X('klarion', 'Klarion the Witch Boy', 'Klarion', [
    ['P', 'The Demon #7 (debut)', 1973, 'Jack Kirby'],
    ['C', 'Seven Soldiers: Klarion the Witch Boy', 2005, 'Grant Morrison & Frazer Irving', '*']]);
  X('kismet', 'Kismet', 'Kismet', [],
    'A deep cut: a cosmic arbiter with only scattered appearances and no definitive story. The DCCU builds her largely fresh, as the witness who records what each Crisis erases.');
  X('barbatos', 'Barbatos', 'Barbatos', [
    ['C', 'Batman: The Return of Bruce Wayne', 2010, 'Grant Morrison & various'],
    ['R', 'Dark Nights: Metal', 2017, 'Scott Snyder & Greg Capullo', '*'],
    ['R', 'Dark Nights: Death Metal', 2020, 'Scott Snyder & Greg Capullo']]);
  X('chronos', 'Chronos (David Clinton)', 'Chronos', [
    ['P', 'The Atom #3 (debut)', 1962, 'Gardner Fox & Gil Kane'],
    ['C', 'Chronos', 1998, 'John Francis Moore & Paul Guinan', '*'],
    ['C', 'The All-New Atom', 2006, 'Gail Simone & others']]);
  X('trapper', 'The Time Trapper', 'Time Trapper', [
    ['P', 'Adventure Comics #317 (debut)', 1964, 'Edmond Hamilton & John Forte'],
    ['C', 'Final Crisis: Legion of 3 Worlds', 2008, 'Geoff Johns & George Pérez', '*']]);
  X('highfather', 'Highfather (Izaya)', 'Highfather', [
    ['P', 'New Gods #1', 1971, 'Jack Kirby'],
    ['P', 'The Pact (New Gods #7)', 1972, 'Jack Kirby', '*'],
    ['R', 'Mister Miracle', 2017, 'Tom King & Mitch Gerads']]);
  X('metron', 'Metron', 'Metron', [
    ['P', 'New Gods #1', 1971, 'Jack Kirby'],
    ['C', 'Cosmic Odyssey', 1988, 'Jim Starlin & Mike Mignola'],
    ['C', 'Final Crisis', 2008, 'Grant Morrison & J.G. Jones'],
    ['N', 'Justice League: The Darkseid War', 2015, 'Geoff Johns & Jason Fabok', '*']]);

  const eras = {
    P: { label: 'Pre-Crisis', span: '1938–1986' },
    C: { label: 'Post-Crisis', span: '1986–2011' },
    N: { label: 'New 52', span: '2011–2016' },
    R: { label: 'Rebirth', span: '2016–2021' },
    M: { label: 'Infinite Frontier+', span: '2021–2026' }
  };

  // Chronology bands
  const bands = [
    { id: 'ancient', label: 'The Ancient World', test: (k) => k < 500 },
    { id: 'legend', label: 'The Age of Legend', test: (k) => k >= 500 && k < 1900 },
    { id: 'golden', label: 'The Golden Age', test: (k) => k >= 1900 && k < 2021 },
    { id: 'heroic', label: 'The Heroic Age · Years 1–18', test: (k) => k >= 2021 && k < 2045 },
    { id: 'future', label: 'Possible Futures', test: (k) => k >= 2045 }
  ];

  const byKey = Object.fromEntries(L.map((c) => [c.key, c]));
  P.forEach((p, i) => {
    p.idx = i;
    p.cast.forEach((k) => { if (!byKey[k]) throw new Error('Unknown cast key ' + k + ' in ' + p.id); });
  });
  L.forEach((c) => { c.projects = P.filter((p) => p.cast.includes(c.key)).map((p) => p.id); });

  root.DCCU = { media, chapters, projects: P, library: L, eras, bands, byKey };
})(typeof window !== 'undefined' ? window : globalThis);
