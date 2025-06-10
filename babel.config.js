module.exports = {
  presets: ['module:metro-react-native-babel-preset'], // Use only the required preset
  plugins: [
    ['@babel/plugin-transform-private-methods', { loose: true }], // Add this plugin
    'react-native-reanimated/plugin', // Ensure this is the last plugin if you're using react-native-reanimated
  ],
};