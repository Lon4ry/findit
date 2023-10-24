/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.tsx',
    './src/client/**/*.tsx',
    './src/shared/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        ibmPlexMono: ['var(--font-ibm-plex-mono)'],
      },
    },
  },
  plugins: [],
};
