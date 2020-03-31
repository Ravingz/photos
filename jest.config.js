module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['jest-enzyme'],
  testEnvironment: 'enzyme',
  testEnvironmentOptions: {
    enzymeAdapter: 'react16',
  },
};
