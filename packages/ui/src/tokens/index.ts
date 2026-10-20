export const COLORS = {
  background: '#090d16',
  surface: 'rgba(15, 23, 42, 0.75)',
  border: 'rgba(255, 255, 255, 0.08)',
  borderActive: 'rgba(56, 189, 248, 0.25)',
  accentPrimary: '#00f0ff',
  accentSecondary: '#6366f1',
  status: {
    working: '#00f0ff',
    waiting: '#f59e0b',
    idle: '#94a3b8',
    error: '#f43f5e',
    online: '#10b981',
  },
} as const;

export const TYPOGRAPHY = {
  fontSans: 'Inter, system-ui, sans-serif',
  fontMono: 'JetBrains Mono, Fira Code, monospace',
} as const;
