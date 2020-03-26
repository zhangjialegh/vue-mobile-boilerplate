import Vue from 'vue'
export function dailyQuotes(isRefresh, params) {
  return Vue.axios.request({
    method: "get",
    url: "/rabbit/1/app/front/daily-quotes",
    params,
    loading: !isRefresh
  });
}

export function recommendTop(isRefresh, params) {
  return Vue.axios.request({
    method: "get",
    url: "/rabbit/1/city-home/users-recommend-top",
    params,
    loading: !isRefresh
  });
}

export function onlyReports(isRefresh, params) {
  return Vue.axios.request({
    method: "get",
    url: "/rabbit/1/city-home/choice/only-reports",
    params,
    loading: !isRefresh
  });
}


export function estateHouse(isRefresh, params) {
  return Vue.axios.request({
    method: "get",
          url: "/superior/1/new-estate/my-estate-of-contractor",
          params,
          loading: !isRefresh
  });
}

export function updateMemo(data) {
  return Vue.axios.request({
    method: "post",
    url: "/superior/1/superior/saveMemo",
    data,
    loading: true
  });
}

export function getAgentInfo(params = {}) {
  return Vue.axios.request({
    method: "get",
    url: "/superior/1/superior/getSuperiorInfo",
    params
  });
}

export function updateHeadUrl(data) {
  return Vue.axios.request({
    method: "post",
    url: "/superior/1/superior/saveMemo",
    data,
    loading: true
  });
}