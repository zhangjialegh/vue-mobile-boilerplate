const path = require("path");
const os = require("os");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  parallel: os.cpus().length > 1,
  devServer: {
    port: 8080,
    open: true,
    host: "localhost",
    hotOnly: false,
    https: process.env.VUE_APP_HTTPS === "1",
    proxy: {
      "/api": {
        target: process.env.VUE_APP_API,
        changeOrigin: true // 开启代理，在本地创建一个虚拟服务端
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@views", resolve("src/views"))
      .set("@widgets", resolve("src/widgets"))
      .set("@style", resolve("src/assets/style"))
      .set("@js", resolve("src/assets/js"))
      .set("@img", resolve("src/assets/img"))
      .set("@components", resolve("src/components"));

    // 打包分析
    if (IS_PROD) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static"
        }
      ]);
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
        }
      }
    }
  }
};
