#!/usr/bin/env node
const path = require("path");
const Koa = require("koa");
const KoaStatic = require("koa-static");
const httpProxyMiddleware = require("http-proxy-middleware");
const koaConnect = require("koa2-connect");
const dotenv = require("dotenv");
const app = new Koa();

dotenv.config({ path: path.resolve(process.cwd(), "../.env.development") });
let port = 5000;

// 代理配置
const proxyTable = {
  "/api": {
    target: process.env.VUE_APP_API,
    changeOrigin: true // 开启代理，在本地创建一个虚拟服务端
  }
};

// 引入静态文件
app.use(KoaStatic(path.join(__dirname, "../dist")));

// 代理兼容封装
const proxy = function(context, options) {
  if (typeof options === "string") {
    options = {
      target: options
    };
  }
  return async function(ctx, next) {
    await koaConnect(httpProxyMiddleware(context, options))(ctx, next);
  };
};

Object.keys(proxyTable).map(context => {
  const options = proxyTable[context];
  // 使用代理
  app.use(proxy(context, options));
});

app.listen(port, () => console.log(`processing on port ${port}`));
