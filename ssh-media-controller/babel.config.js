module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',    // The module you import from
        path: '../.env',       // Set path to one directory higher
      }],
    ],
  };
  