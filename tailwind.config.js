/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': 'var(--bg-main)',
        'bg-soft': 'var(--bg-soft)',
        'bg-card': 'var(--bg-card)',
        'primary': 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        'accent': 'var(--accent)',
        'text-main': 'var(--text-main)',
        'text-secondary': 'var(--text-secondary)',
        'border': 'var(--border)',
        'hero-bg': 'var(--hero-bg)',
        'hero-title': 'var(--hero-title)',
        'hero-text': 'var(--hero-text)',
        'hero-badge-text': 'var(--hero-badge-text)',
        'hero-highlight': 'var(--hero-highlight)',
        'footer-bg': 'var(--footer-bg)',
        'footer-text': 'var(--footer-text)',
        'footer-text-secondary': 'var(--footer-text-secondary)',
        'footer-title': 'var(--footer-title)',
        'footer-border': 'var(--footer-border)',
        'footer-icon-bg': 'var(--footer-icon-bg)',
        'footer-icon-hover-bg': 'var(--footer-icon-hover-bg)',
        'navbar-bg': 'var(--navbar-bg)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
