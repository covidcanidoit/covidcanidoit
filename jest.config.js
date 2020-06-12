module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  verbose: true,
  moduleFileExtensions: [
      "js",
      "json",
      "vue"
  ], 
  collectCoverage: true,
  collectCoverageFrom: [
      "src/components/*.{js,vue}",
      "!**/node_modules/**"
  ],
};