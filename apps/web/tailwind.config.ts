import type { Config } from 'tailwindcss';
import sharedPreset from '@arcmentor/config/tailwind-preset';

const config: Config = {
  presets: [sharedPreset],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
