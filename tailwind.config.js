const colors = require("tailwindcss/colors"); // eslint-disable-line

module.exports = {
  content: ["./pages/**/*.tsx", "./src/**/*.tsx"],
  theme: {},
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
