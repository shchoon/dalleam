import type { Config } from 'tailwindcss';

const pxToRem = (px: number, base = 16) => `${px / base}rem`;

const range = (start: number, end: number) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
};

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    animation: {
      'expand-line': 'expandLine 2s ease-in-out',
      'heart-stroke': 'heartStroke 2s ease-in-out',
      'fill-heart': 'fillHeart 2s ease-in-out',
      'fFill-heart': 'fillHeart 1s ease-in-out',
      'saved-bg': 'savedBg 2s ease-in-out',
    },
    keyframes: {
      expandLine: {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(0)' },
      },
      savedBg: {
        '0%': { border: 'none' },
        '100%': {
          'background-color': '#FFF7ED',
          border: 'none',
        },
      },
      heartStroke: {
        '0%': { transform: 'scale(1)', stroke: '#9CA3AF' },
        '30%': { transform: 'scale(0.9)', stroke: '#9CA3AF' },
        '60%': { transform: 'scale(1.1)', stroke: '#9CA3AF' },
        '100%': { transform: 'scale(1)', stroke: '#EA580C' },
      },
      fillHeart: {
        '0%': { transform: 'scale(0.1)' },
        '100%': { transform: 'scale(1)' },
      },
    },
    screens: {
      md: '744px',
      lg: '1128px',
    },
    extend: {
      spacing: {
        ...range(1, 2401).reduce<Record<string, string>>((acc, px) => {
          acc[`${px}pxr`] = pxToRem(px);
          return acc;
        }, {}),
      },
      boxShadow: {
        'progressBar-shadow':
          '-2px -2px 12px 0px rgba(219, 219, 219, 0.20), 2px 2px 12px 0px rgba(219, 219, 219, 0.20)',
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      colors: {
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
        red: {
          600: '#DC2626',
        },
      },
    },
  },
  plugins: [],
};
export default config;
