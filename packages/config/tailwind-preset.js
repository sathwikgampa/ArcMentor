/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary Brand
        primary: {
          DEFAULT: '#4F46E5',
          light: '#818CF8',
          dark: '#3730A3',
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#4F46E5',
          600: '#4338CA',
          700: '#3730A3',
          800: '#312E81',
          900: '#1E1B4B',
        },
        // Semantic Colors
        success: {
          DEFAULT: '#10B981',
          light: '#ECFDF5',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FFFBEB',
          dark: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#FEF2F2',
          dark: '#DC2626',
        },
        info: {
          DEFAULT: '#0EA5E9',
          light: '#F0F9FF',
          dark: '#0284C7',
        },
        // Neutral Surfaces
        surface: {
          dark: '#0F172A',
          DEFAULT: '#F8FAFC',
          card: '#FFFFFF',
          subtle: '#F1F5F9',
        },
        border: {
          DEFAULT: '#E2E8F0',
          dark: '#334155',
        },
        text: {
          primary: '#0F172A',
          secondary: '#64748B',
          muted: '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '12px',
        card: '16px',
        pill: '100px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        elevated: '0 10px 25px rgba(0,0,0,0.08)',
        glass: '0 8px 32px rgba(0,0,0,0.3)',
        'btn-primary': '0 4px 14px rgba(79, 70, 229, 0.4)',
        'btn-destructive': '0 4px 14px rgba(239, 68, 68, 0.3)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4F46E5, #7C3AED)',
        'gradient-hero': 'linear-gradient(180deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)',
        'gradient-card':
          'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
      },
      backdropBlur: {
        glass: '16px',
      },
      animation: {
        'pulse-credit': 'pulseCredit 600ms ease-in-out',
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        pulseCredit: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
};
