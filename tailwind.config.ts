import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    './branding/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--brand-primary)',
          'primary-hover': 'var(--brand-primary-hover)',
          secondary: 'var(--brand-secondary)',
          'secondary-hover': 'var(--brand-secondary-hover)',
          accent: 'var(--brand-accent)',
        },
        surface: {
          bg: 'var(--surface-bg)',
          card: 'var(--surface-card)',
          'card-hover': 'var(--surface-card-hover)',
          border: 'var(--surface-border)',
        },
        content: {
          main: 'var(--content-main)',
          muted: 'var(--content-muted)',
          subtle: 'var(--content-subtle)',
        },
      },
      fontFamily: {
        sans: ['var(--font-primary)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        custom: 'var(--brand-radius)',
      },
    },
  },
  plugins: [],
};

export default config;
