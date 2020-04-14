const path = require("path");
const os = require("os");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const zopfli = require("@gfx/zopfli");
const BrotliPlugin = require("brotli-webpack-plugin");
const PrerenderSpaPlugin = require("prerender-spa-plugin");

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const preRender = require("./router-config");

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
  configureWebpack: config => {
    const plugins = [];
    if (IS_PROD) {
      // 预渲染
      if (preRender.open) {
        plugins.push(
          new PrerenderSpaPlugin({
            staticDir: resolve("dist"),
            routes: Object.keys(preRender.config),
            postProcess(ctx) {
              ctx.route = ctx.originalRoute;
              ctx.html = ctx.html.split(/>[\s]+</gim).join("><");
              ctx.html = ctx.html.replace(
                /<title>(.*?)<\/title>/gi,
                `<title>${
                  preRender["config"][ctx.route].title
                }</title><meta name="keywords" content="${
                  preRender["config"][ctx.route].keywords
                }" /><meta name="description" content="${
                  preRender["config"][ctx.route].description
                }" />`
              );
              if (ctx.route.endsWith(".html")) {
                ctx.outputPath = path.join(__dirname, "dist", ctx.route);
              }
              return ctx;
            },
            minify: {
              collapseBooleanAttributes: true,
              collapseWhitespace: true,
              decodeEntities: true,
              keepClosingSlash: true,
              sortAttributes: true
            },
            renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
              // 需要注入一个值，这样就可以检测页面当前是否是预渲染的
              inject: {},
              headless: false,
              // 视图组件是在API请求获取所有必要数据后呈现的，因此我们在dom中存在“data view”属性后创建页面快照
              renderAfterDocumentEvent: "render-event"
            })
          })
        );
      }
      // 移除代码中的console
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"] //移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      );
      // gzip压缩
      plugins.push(
        new CompressionWebpackPlugin({
          algorithm(input, compressionOptions, callback) {
            return zopfli.gzip(input, compressionOptions, callback);
          },
          compressionOptions: {
            numiterations: 15
          },
          minRatio: 0.99,
          test: productionGzipExtensions
        })
      );
      plugins.push(
        new BrotliPlugin({
          test: productionGzipExtensions,
          minRatio: 0.99
        })
      );
      // 分开打包
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            common: {
              name: "chunk-common",
              chunks: "initial",
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 1,
              reuseExistingChunk: true,
              enforce: true
            },
            vendors: {
              name: "chunk-vendors",
              test: /[\\/]node_modules[\\/]/,
              chunks: "initial",
              priority: 2,
              reuseExistingChunk: true,
              enforce: true
            },
            vantUI: {
              name: "chunk-vant",
              test: /[\\/]node_modules[\\/]vant[\\/]/,
              chunks: "all",
              priority: 3,
              reuseExistingChunk: true,
              enforce: true
            },
            echarts: {
              name: "chunk-echarts",
              test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
              chunks: "all",
              priority: 4,
              reuseExistingChunk: true,
              enforce: true
            }
          }
        }
      };
    }
    config.plugins = [...config.plugins, ...plugins];
  },
  chainWebpack: config => {
    // alias别名
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

    // 使用svg组件
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.exclude.add(/node_modules/);
    svgRule
      .test(/\.svg$/)
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
    const imagesRule = config.module.rule("images");
    imagesRule.exclude.add(resolve("src/icons"));
    config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);

    return config;
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
