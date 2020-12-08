const path = require("path");
const autoprefixer = require("autoprefixer");
const px2rem = require("postcss-px2rem");

const postcss = px2rem({
  remUnit: 16 //基准大小 baseSize
});

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    https: true,
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: process.env.VUE_APP_API,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@views", resolve("src/views"))
      .set("@utils", resolve("src/utils"))
      .set("@config", resolve("src/config"))
      .set("@api", resolve("src/api"))
      .set("@components", resolve("src/components"));
  },

  css: {
    loaderOptions: {
      postcss: {
        plugins: [autoprefixer(), postcss]
      }
    }
  }
};
