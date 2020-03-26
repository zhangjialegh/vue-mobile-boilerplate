import { tokenName, loginPage } from "@config/index";
import {getAgentInfo} from "@api/index"
export default {
  install(Vue, options = {}) {
    Vue.gb = Vue.prototype.$gb = {
      ...options,
      makePhoneCall(num) {
        location.href = `tel:${num}`;
      },
      thousandFormat(num) {
        if (!num) return 0;
        if (num < 0) num *= -1;
        var str = num + "";
        // ["8", "7", "6", "5", "4", "3", "2", "1"]
        return str
          .split("")
          .reverse()
          .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ",") + prev;
          });
      },
      h5Copy(content) {
        let input = document.createElement("input");
        input.value = content;
        input.readOnly = "readOnly";
        document.body.appendChild(input);
        input.select(); // 选择对象
        input.setSelectionRange(0, content.length); //核心
        let result = document.execCommand("Copy"); // 执行浏览器复制命令
        input.remove();
        return result;
      },
      async initAccount(needLogin, options) {
        if (needLogin) {
          Vue.store.commit("accessType", "agent");
          const token = localStorage.getItem(tokenName);
          let userInfo = localStorage.getItem("userInfo");
          if (userInfo) {
            userInfo = JSON.parse(userInfo);
          }
          if (token && userInfo && JSON.stringify(userInfo) !== "{}") {
            Vue.store.commit("userInfo", userInfo);
            Vue.store.commit("abstractText", userInfo.memo || "");
          } else if (
            token &&
            (!userInfo || JSON.stringify(userInfo) === "{}")
          ) {
            await Vue.gb.initAgentInfo();
          } else if (!token) {
            Vue.gb.toLogin();
          }
        } else {
          Vue.store.commit("accessType", "customer");
          await Vue.gb.initAgentInfo(options);
        }
      },
      async initAgentInfo(options) {
        const res = await getAgentInfo(options);
        const userInfo = res.data.body;
        Vue.store.commit("userInfo", userInfo);
        Vue.store.commit("abstractText", userInfo.memo || "");
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      },
      toLogin() {
        localStorage.removeItem("userInfo");
        Vue.store.commit("userInfo", {});
        location.href = loginPage;
      },
      updateMemo(memo) {
        const userInfo = Vue.store.state.userInfo;
        userInfo.memo = memo;
        Vue.store.commit("userInfo", userInfo);
        Vue.store.commit("abstractText", memo);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      },
      updateAvatar(avatar) {
        const userInfo = Vue.store.state.userInfo;
        userInfo.headImgUrl = avatar;
        Vue.store.commit("userInfo", userInfo);
        Vue.store.commit("abstractText", avatar);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
    };
  }
};
