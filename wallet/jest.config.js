/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\.tsx?$': ['ts-jest', {
      useESM: true
    }]
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapping: {
    '^(\.{1,2}/.*)\.js$': '$1'
  }
};