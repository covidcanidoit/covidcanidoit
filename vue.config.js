module.exports = {
  runtimeCompiler: true,
  devServer: {
    disableHostCheck: true
  },
  css: {
    extract: false,
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/scss/variables.scss";
        `
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
