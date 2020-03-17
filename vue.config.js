const path = require("path");
const autoprefixer = require("autoprefixer");
const px2rem = require("postcss-px2rem");

const postcss = px2rem({
  remUnit: 25.6 //基准大小 baseSize
});

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@views", resolve("src/views"))
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
