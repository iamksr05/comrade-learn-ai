/**
 * PostCSS configuration for processing CSS
 * Used by Vite to transform Tailwind CSS and apply autoprefixer
 *
 * @type {import('postcss-load-config').Config}
 */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

