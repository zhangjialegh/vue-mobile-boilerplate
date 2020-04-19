import Vue from "vue";
import Qs from "qs";
const flag = "v1";
export function dailyQuotes(isRefresh, params) {
  return Vue.axios.request({
    method: "get",
    url: `/rabbit/${flag}/app/front/daily-quotes`,
    params,
    loading: !isRefresh
  });
}

export function recommendTop(isRefresh, params) {
  return Vue.axios.request({
    method: "get",
    url: `/rabbit/${flag}/city-home/users-recommend-top`,
    params,
    headers: {
      appid: "1",
      currentVersion: "12.1.1"
    },
    loading: !isRefresh
  });
}

export function onlyReports(isRefresh, params) {
  return Vue.axios.request({
    method: "get",
    url: `/rabbit/${flag}/city-home/choice/only-reports`,
    params,
    loading: !isRefresh
  });
}

export function estateHouse(isRefresh, params) {
  return Vue.axios.request({
    method: "get",
    url: `/superior/${flag}/new-estate/my-estate-of-contractor`,
    params,
    loading: !isRefresh
  });
}

export function updateMemo(data) {
  return Vue.axios.request({
    method: "post",
    url: `/superior/${flag}/superior/saveMemo`,
    data,
    loading: true
  });
}

export function getAgentInfo(params = {}) {
  return Vue.axios.request({
    method: "get",
    url: `/superior/${flag}/superior/getSuperiorInfo`,
    params
  });
}

export function updateHeadUrl(data) {
  return Vue.axios.request({
    method: "post",
    url: `/superior/${flag}/superior/saveHeadUrl`,
    data,
    loading: true
  });
}

export function uploadImage(data) {
  return Vue.axios.request({
    method: "post",
    url: "/cms/upload/img",
    data,
    transformRequest: [
      function(data) {
        data = Qs.stringify(data);
        return data;
      }
    ],
    headers: {
      "Content-Type":
        "application/x-www-form-urlencoded; charset=UTF-8 ,text/plain"
    }
  });
}

export function wxAuth() {
  return Vue.axios.request({
    method: "get",
    url: "/pay-platform/authorized/get-authorized-info",
    headers: {
      url: window.location.href.split("#")[0]
    }
  });
}
