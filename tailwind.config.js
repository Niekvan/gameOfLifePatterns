module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ['./public/**/*.html', './src/**/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        Bagnard: ['Bagnard'],
      },
    },
  },
  variants: {},
  plugins: [],
};
