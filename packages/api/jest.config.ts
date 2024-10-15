export default {
  coverageDirectory: "coverage/packages/api",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
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
