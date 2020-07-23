module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  verbose: true,
  moduleFileExtensions: ["js", "json", "vue"],
  collectCoverageFrom: [
    "src/components/*.spec.{js,vue}",
    "!**/node_modules/**"
  ],
  transformIgnorePatterns: ["/node_modules/(?!(vue-google-autocomplete)/)"],
  setupFiles: ["./tests/unit/setup.js"]
};
