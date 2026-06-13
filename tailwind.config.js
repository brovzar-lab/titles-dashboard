/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(100%)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.2s ease-out forwards',
        'slide-up': 'slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      colors: {
        void: '#06080F',
        base: '#0A0D16',
        surface: '#0F1420',
        elevated: '#161D2E',
        overlay: '#1E2740',
        // Lane accents
        amber: {
          DEFAULT: '#F59E0B',
          glow: 'rgba(245, 158, 11, 0.18)',
          muted: 'rgba(245, 158, 11, 0.08)',
        },
        cobalt: {
          DEFAULT: '#3B82F6',
          glow: 'rgba(59, 130, 246, 0.18)',
          muted: 'rgba(59, 130, 246, 0.08)',
        },
        crimson: {
          DEFAULT: '#E11D48',
          glow: 'rgba(225, 29, 72, 0.18)',
          muted: 'rgba(225, 29, 72, 0.08)',
        },
      },
    },
  },
  plugins: [],
}
