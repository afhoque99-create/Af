/** Tailwind maps every colour to a CSS token defined in src/styles.css,
 *  so light/dark/system themes switch at the token level. */
export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        well: 'var(--well)',
        line: 'var(--line)',
        ink: 'var(--ink)',
        ink2: 'var(--ink-2)',
        ink3: 'var(--ink-3)',
        jute: 'var(--jute)',
        jutefill: 'var(--jute-fill)',
        jutesoft: 'var(--jute-soft)',
        crit: 'var(--crit)',
        critsoft: 'var(--crit-soft)',
        prog: 'var(--prog)',
        progsoft: 'var(--prog-soft)',
        asset: 'var(--asset)',
        assetsoft: 'var(--asset-soft)',
        water: 'var(--water)',
      },
      fontFamily: {
        display: ['Archivo', 'Arial Narrow', 'Helvetica Neue', 'Arial', 'sans-serif'],
        sans: ['Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'Cambria', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        bangla: ['"Tiro Bangla"', '"Noto Serif Bengali"', '"Noto Sans Bengali"', 'serif'],
      },
      maxWidth: { page: '76rem' },
    },
  },
  plugins: [],
};
