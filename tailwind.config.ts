import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        superlight: '#00E3CC',
        light: '#44E3D3',
        medium: '#32A89C',
        mediumdark: '#009688',
        dark: '#00635A',
      },
    },
  },
  plugins: [],
};

export default config;
