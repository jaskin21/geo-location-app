const flowbite = require('flowbite-react/tailwind');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {
      colors: {
        customGray: '#454553', // Add your custom gray color here
      },
    },
  },
  plugins: [flowbite.plugin()],
};
