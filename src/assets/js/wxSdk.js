import Vue from "vue";
export let isReady = false;
export const wxInit = function(options) {
  return new Promise((resolve, reject) => {
    Vue.wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: options.appId, // 必填，公众号的唯一标识
      timestamp: options.timestamp, // 必填，生成签名的时间戳
      nonceStr: options.nonceStr, // 必填，生成签名的随机串
      signature: options.signature, // 必填，签名
      jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline", "getLocation"] // 必填，需要使用的JS接口列表
    });
    Vue.wx.ready(function() {
      isReady = true;
      resolve(true);
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });
    Vue.wx.error(function(err) {
      isReady = false;
      reject(err);
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });
  });
};

export const wxShare = function({ title, desc, link, imgUrl }) {
  return new Promise((resolve, reject) => {
    Vue.wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc || "更新的房产动态，更全面的市场行情。助您更好的买房", // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function() {
        resolve(true);
      },
      fail: function(err) {
        reject(err);
      }
    });
    Vue.wx.onMenuShareTimeline({
      title: title, // 分享标题
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function() {
        resolve(true);
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
};

export function wxLocation() {
  return new Promise((resolve, reject) => {
    Vue.wx.getLocation({
      type: "wgs84",
      success: function(res) {
        resolve({
          lon: res.longitude,
          lat: res.latitude
        });
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}
