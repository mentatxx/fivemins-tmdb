const {defaults: tsjPreset} = require('ts-jest/presets');

module.exports = {
  // preset: 'react-native',
  // moduleDirectories: ['node_modules', 'src'],
  // transform: {
  //   '^.+\\.ts?$': 'ts-jest',
  //   '^.+\\.tsx?$': 'ts-jest',
  //   '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  // },
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)?$',
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // moduleNameMapper: {
  //   '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  // },
  // transformIgnorePatterns: [],

  // ...tsjPreset,
  // preset: 'react-native',
  // transform: {
  //   ...tsjPreset.transform,
  //   '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  // },
  // globals: {
  //   'ts-jest': {
  //     babelConfig: true,
  //     diagnostics: true,
  //     tsconfig: true,
  //   },
  // },
  // // This is the only part which you can keep
  // // from the above linked tutorial's config:
  // cacheDirectory: '.jest/cache',

  preset: 'react-native',
  verbose: true,
  // setupFiles: ['./setupJest.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-navigation|@react-native|react-native)',
  ],
  testPathIgnorePatterns: ['build', 'node_modules/'],
  cacheDirectory: '.jest/cache',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)?$',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'js', 'jsx', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/assetsTransformer.js',
    '\\.(css|less)$': '<rootDir>/assetsTransformer.js',
  },
  globals: {
    __DEV__: true,
    'ts-jest': {
      babelConfig: true,
      tsconfig: 'tsconfig.test.json',
    },
  },
};
