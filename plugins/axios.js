import qs from 'qs'
import {VantUi} from '~/plugins/vant-ui'

export default function({ $axios, redirect, app }) {
  const isClient = process.client //区分端
  const isServer = process.server //区分端
  $axios.onRequest(config => {
    config.data = qs.stringify(config.data, {
      allowDots: true
    });
    let token = app.$cookiz.get('token')
    if (token) config.headers.Authorization = token;
    return config;
  });

  $axios.onResponse(response => {
    return Promise.resolve(response.data);
  });

  $axios.onError(error => {
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
      if (isServer) {
        redirect('/error')
      }
    }
    return Promise.reject(error);
  });
}