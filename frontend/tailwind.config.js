/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#080B14',
        ink: '#0D1220',
        panel: '#111828',
        line: 'rgba(148,163,196,0.14)',
        frost: '#EEF2FA',
        mist: '#9AA6C3',
        cyan: {
          DEFAULT: '#22D3EE',
          soft: '#5EEAD4',
        },
        azure: '#3B7CFF',
        violet: {
          DEFAULT: '#7B5CFF',
          deep: '#5B3DE0',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['"General Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'ariq-gradient': 'linear-gradient(135deg, #22D3EE 0%, #3B7CFF 45%, #7B5CFF 100%)',
        'ariq-radial': 'radial-gradient(circle at 50% 0%, rgba(59,124,255,0.20), transparent 60%)',
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(59,124,255,0.45)',
        'glow-violet': '0 0 60px -12px rgba(123,92,255,0.45)',
      },
      animation: {
        'spin-slow': 'spin 14s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
      },
    },
  },
  plugins: [],
}
