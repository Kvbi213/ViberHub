import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Milky Glass & Surface Hierarchy
        surface: '#FAF9FE',
        'surface-dim': '#DAD9DF',
        'surface-bright': '#FAF9FE',
        'surface-container-lowest': '#FFFFFF',
        'surface-container-low': '#F4F3F8',
        'surface-container': '#EEEDF3',
        'surface-container-high': '#E9E7ED',
        'surface-container-highest': '#E3E2E7',
        'surface-variant': '#E3E2E7',
        'on-surface': '#1C1C1E',
        'on-surface-variant': '#636366',
        'inverse-surface': '#2F3034',
        'inverse-on-surface': '#F1F0F5',
        outline: '#8E8E93',
        'outline-variant': '#E5E7EB',

        // Apple Fluid Primaries & Semantic Actions
        primary: '#0071E3',
        'primary-container': '#0071E3',
        'on-primary': '#FFFFFF',
        'primary-fixed': '#D7E2FF',
        'primary-fixed-dim': '#ABC7FF',
        'inverse-primary': '#ABC7FF',

        // System Telemetry & Status
        secondary: '#FF9500', // Warning / Waiting
        'secondary-container': '#FEF3C7',
        'on-secondary': '#FFFFFF',
        'on-secondary-container': '#92400E',

        tertiary: '#0284C7', // Context / Info
        'tertiary-container': '#E0F2FE',
        'on-tertiary': '#FFFFFF',

        error: '#FF3B30', // Error / Breach
        'error-container': '#FEE2E2',
        'on-error': '#FFFFFF',
        'on-error-container': '#93000A',

        // Apple Native Semantics
        'apple-blue': '#0071E3',
        'apple-green': '#34C759',
        'apple-orange': '#FF9500',
        'apple-red': '#FF3B30',
        'apple-slate': '#8E8E93',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      spacing: {
        'gutter-desktop': '1.5rem',
        gutter: '1rem',
        margin: '1.5rem',
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '0.75rem',
        'space-lg': '1.25rem',
        'space-xl': '2rem',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Inter', 'sans-serif'],
        display: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Inter', 'sans-serif'],
        'mono-code': ['SF Mono', 'JetBrains Mono', 'Geist', 'monospace'],
        'mono-metric': ['JetBrains Mono', 'SF Mono', 'monospace'],
        'mono-status': ['SF Mono', 'JetBrains Mono', 'monospace'],
        'sf-mono': ['SF Mono', 'JetBrains Mono', 'monospace'],
        'title-sm': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0, 0, 0, 0.02)',
        glass: '0 4px 20px -2px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'glass-hover': '0 14px 34px -4px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.03)',
        window: '0 16px 44px -8px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02)',
      },
    },
  },
  plugins: [],
};
export default config;
