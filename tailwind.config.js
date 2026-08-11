/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Two-family system: a geometric display face for headings, a neutral
        // UI face for body copy. Both are wired up in app/layout.tsx.
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-body)', 'sans-serif'],
      },
      colors: {
        // Lunexa: moonlight violet with a warm gold accent, on a deep plum canvas.
        brand: {
          DEFAULT: '#8b5cf6',
          dark: '#6d28d9',
          light: '#a78bfa',
          faint: '#c4b5fd',
        },
        accent: { DEFAULT: '#f4b740', dark: '#d99a26', light: '#fbd07a' },
        // Surfaces, darkest to lightest
        night: {
          DEFAULT: '#0A0711', // page canvas
          900: '#0E0A18', // raised band
          800: '#150E24', // section
          700: '#1C1330', // card
          600: '#271A44', // hover / input
        },
      },
      // The default scale jumps 10 → 20, which is too coarse for the low-alpha
      // tints this theme relies on. These fill in the gap.
      opacity: {
        3: '0.03',
        6: '0.06',
        8: '0.08',
        12: '0.12',
        15: '0.15',
        18: '0.18',
        22: '0.22',
      },
      boxShadow: {
        glow: '0 24px 70px -24px rgba(139,92,246,0.55)',
        'glow-sm': '0 12px 32px -14px rgba(139,92,246,0.5)',
        gold: '0 20px 60px -22px rgba(244,183,64,0.45)',
        panel: '0 1px 2px rgba(0,0,0,0.5), 0 22px 48px -24px rgba(0,0,0,0.7)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      keyframes: {
        'rise-in': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'drift': {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-14px,0)' },
        },
        'sheen': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        'rise-in': 'rise-in 0.7s cubic-bezier(0.16,1,0.3,1) both',
        drift: 'drift 7s ease-in-out infinite',
        sheen: 'sheen 6s linear infinite',
      },
    },
  },
  plugins: [],
};
