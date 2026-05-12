module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native.*|@react-native(-community)?|@react-native-async-storage|@react-navigation|@reduxjs/toolkit|immer|redux|react-redux|ad-bs-converter|jwt-decode)/)',
  ],
};
