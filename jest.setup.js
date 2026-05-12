/* global jest */

import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-async-storage/async-storage', () => {
  const store = new Map();

  return {
    getItem: jest.fn(key => Promise.resolve(store.get(key) ?? null)),
    setItem: jest.fn((key, value) => {
      store.set(key, value);
      return Promise.resolve();
    }),
    removeItem: jest.fn(key => {
      store.delete(key);
      return Promise.resolve();
    }),
    clear: jest.fn(() => {
      store.clear();
      return Promise.resolve();
    }),
    getAllKeys: jest.fn(() => Promise.resolve([...store.keys()])),
    multiGet: jest.fn(keys =>
      Promise.resolve(keys.map(key => [key, store.get(key) ?? null])),
    ),
    multiSet: jest.fn(entries => {
      entries.forEach(([key, value]) => store.set(key, value));
      return Promise.resolve();
    }),
    multiRemove: jest.fn(keys => {
      keys.forEach(key => store.delete(key));
      return Promise.resolve();
    }),
  };
});

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(() => Promise.resolve()),
  isVisible: jest.fn(() => Promise.resolve(false)),
  useHideAnimation: jest.fn(() => ({})),
}));

jest.mock('react-native-simple-toast', () => ({
  SHORT: 0,
  LONG: 1,
  show: jest.fn(),
}));
