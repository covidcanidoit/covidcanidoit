module.exports = {
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
  chainWebpack: config => {
    config.module.rules.delete("svg");
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: "vue-svg-loader"
        }
      ]
    }
  },
  transpileDependencies: ["vuetify"]
};
