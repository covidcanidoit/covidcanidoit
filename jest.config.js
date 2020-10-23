module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  verbose: true,
  moduleFileExtensions: ["js", "json", "vue"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/{components,views}/*.{js,vue}",
    "!**/node_modules/**"
  ],
  transformIgnorePatterns: ["/node_modules/(?!(vue-google-autocomplete)/)"],
  setupFiles: ["./tests/unit/setup.js"]
};
