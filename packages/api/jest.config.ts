module.exports = {
  coverageDirectory: "coverage/packages/api",
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["js", "json", "ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/*.test.(ts|js)"],
  testEnvironment: "node",
  preset: "ts-jest",
  collectCoverage: true,
  testPathIgnorePatterns: ["/dist/"],
};
