/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // v4 uses this new adapter
    autoprefixer: {},
  },
};

export default config;