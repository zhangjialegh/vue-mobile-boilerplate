import qs from 'qs'
import {VantUi} from '~/plugins/vant-ui'
import {tokenName} from '~/plugins/config'
/**
 * @param {$axios} loading
 *  如果 $axios的request里还有loading，就会显示loading组件
 */

export default function({ $axios, redirect, app, store }) {
  const isClient = process.client //客户端
  const isServer = process.server //服务端
  let loadingToast = null  // 加载组件

  $axios.setHeader('Content-Type', 'application/json')
  $axios.setToken(app.$storage.getVal(tokenName))

  $axios.onRequest(config => {
    if (isClient && config.loading) {
      loadingToast = VantUi.Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
    }
    config.data = qs.stringify(config.data, {
      allowDots: true
    });
    return config;
  });

  $axios.onResponse(res => {
    if (isClient && res.data && !res.data.success) {
      if (loadingToast) {
        loadingToast.clear()
      }
      VantUi.Toast(res.data.message)
    }
    if (isServer && res.data && !res.data.success) {
      store.commit('warnlog', res.data.message)
    }
    return Promise.resolve(res.data);
  });

  $axios.onError(error => {
    if (loadingToast) {
      loadingToast.clear()
    }
    const res = error.response
    if ( res && res.status === 401) {
      if (isClient) {
        VantUi.Toast(error.response.data.message || '授权过期，请重新授权')
      }
      redirect('/login')
    } else {
      if (isClient && res.data && res.data.message) {
        VantUi.Toast.fail(res.data.message)
      }
      if (isServer && res.data && res.data.message) {
        store.commit('errorlog', res.data.message)
      }
    }
    return Promise.reject(res.data || res);
  });
}