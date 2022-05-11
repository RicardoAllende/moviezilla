
module.exports = {

  verbose: true,
  "transform": {
    "\\.[jt]sx?$": "babel-jest"
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "^@src(.*)$":  "<rootDir>/src$1",
    "^@components(.*)$":  "<rootDir>/src/components$1",
    "^@pages(.*)$":  "<rootDir>/src/pages$1",
    "^@store(.*)$":  "<rootDir>/src/store$1",
    "^@services(.*)$":  "<rootDir>/src/services$1",
  },
  coverageThreshold: {
    global: {
      functions: 90,
      branch: 90,
      lines: 90,
      statements: 90
    }
  }

};
