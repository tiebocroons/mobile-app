module.exports = {
  presets: ['module:metro-react-native-babel-preset'], // Use only the required preset
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      safe: false,
      allowUndefined: true,
    }],
    ['@babel/plugin-transform-private-methods', { loose: true }], // Add this plugin
    'react-native-reanimated/plugin', // Ensure this is the last plugin if you're using react-native-reanimated
  ],
};