module.exports = {
  verbose: true,
  silent: false,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1"
  },
  moduleFileExtensions: ["js", "json", "ts"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.ts?$": "ts-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"]
};