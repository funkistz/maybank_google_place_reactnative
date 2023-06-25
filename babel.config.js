module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["import", { "libraryName": "antd-mobile-rn" }],
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          '@components': './src/components',
          '@features': './src/features',
          '@pages': './src/pages',
          // '@hooks': './src/hooks',
        },
      },
    ],
  ],
};
