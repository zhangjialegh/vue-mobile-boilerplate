import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    iphoneX: 10,
    accessType: "agent", // 'customer', 'agent'
    abstractText: "",
    accountToken: "",
    userInfo: {},
    wxInit: false
  },
  mutations: {
    iphoneX(state, payload) {
      state.iphoneX = payload;
    },
    accessType(state, payload) {
      state.accessType = payload;
    },
    abstractText(state, payload) {
      state.abstractText = payload;
    },
    accountToken(state, payload) {
      state.accountToken = payload;
    },
    userInfo(state, payload) {
      state.userInfo = payload;
    },
    wxInit(state, payload) {
      state.wxInit = payload;
    }
  }
});
