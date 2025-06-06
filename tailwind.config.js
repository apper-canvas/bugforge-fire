/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A0A0A',
          light: '#161616',
          dark: '#000000'
        },
        secondary: {
          DEFAULT: '#161616',
          light: '#2A2A2A',
          dark: '#0A0A0A'
        },
        accent: '#00FF41',
        terminal: '#00FF41',
        amber: '#FFB800',
        critical: '#FF0040',
        ghost: '#E0E0E0',
        steel: '#2A2A2A',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        }
      },
      fontFamily: { 
        sans: ['JetBrains Mono', 'ui-monospace', 'monospace'], 
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        heading: ['JetBrains Mono', 'ui-monospace', 'monospace']
      },
      boxShadow: { 
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)',
        brutal: '4px 4px 0px #2A2A2A',
        'brutal-active': '2px 2px 0px #2A2A2A'
      },
      borderRadius: { xl: '0.75rem', '2xl': '1rem' },
      animation: {
        'cursor-blink': 'cursor-blink 1s infinite',
        'scan-line': 'scan-line 2s linear infinite',
        'glitch': 'glitch 0.3s ease-in-out'
      },
      keyframes: {
        'cursor-blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' }
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' }
        }
      }
    },
  },
  plugins: [],
}