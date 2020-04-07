import Vue from 'vue'
const Bus = new Vue()
Vue.Bus = Vue.prototype.$bus = {
  '$off': function (eventName) {
    Bus.$off(eventName)
  },
  '$on': function (eventName, fn, cmp, position = 'destory') {
    Bus.$on(eventName, fn)
    if (cmp && cmp._isVue) {
      let offFn = function () {
        Bus.$off(eventName, fn)
        let beforeDestroyHooks = cmp.$options.beforeDestroy || []
        for (let i = 0; i < beforeDestroyHooks.length; i++) {
          if (beforeDestroyHooks[i] === offFn) {
            beforeDestroyHooks[i] = null
            break
          }
        }

        if (beforeDestroyHooks.length && beforeDestroyHooks[beforeDestroyHooks.length - 1] === null) {
          for (let i = 0; i < beforeDestroyHooks.length; i++) {
            if (beforeDestroyHooks[i] === null) {
              beforeDestroyHooks.splice(i, beforeDestroyHooks.length - i)
              break
            }
          }
        }

        cmp = null
      }
        // 默认: 在destory时清除事件监听 如果activated中注册事件可能出现反复注册情况，需要保证唯一性
      let beforeDestroyHooks = cmp.$options.beforeDestroy
      if (beforeDestroyHooks) {
        let re = /function\s*(\w*)/i
        if (!beforeDestroyHooks.find(item => re.exec(item)[1] === 'offFn')) { beforeDestroyHooks.push(offFn) }
      } else {
        cmp.$options.beforeDestroy = [offFn]
      }

      // 自定义：在deactivated时清除事件监听
      if (position === 'deactivated') {
        let deactivatedOffFn = function () {
          if (!cmp) return
          Bus.$off(eventName, fn)
          let beforeDeactivatedHooks = cmp.$options.deactivated || []
          for (let i = 0; i < beforeDeactivatedHooks.length; i++) {
            if (beforeDeactivatedHooks[i] === deactivatedOffFn) {
              beforeDeactivatedHooks[i] = null
              break
            }
          }
          if (beforeDeactivatedHooks.length && beforeDeactivatedHooks[beforeDeactivatedHooks.length - 1] === null) {
            for (let i = 0; i < beforeDeactivatedHooks.length; i++) {
              if (beforeDeactivatedHooks[i] === null) {
                beforeDeactivatedHooks.splice(i, beforeDeactivatedHooks.length - i)
                break
              }
            }
          }
        }
        let beforeDeactivatedHooks = cmp.$options ? cmp.$options.deactivated : null
        if (beforeDeactivatedHooks) {
          let re = /function\s*(\w*)/i
          if (!beforeDeactivatedHooks.find(item => re.exec(item)[1] === 'deactivatedOffFn')) { beforeDeactivatedHooks.push(deactivatedOffFn) }
        } else {
          cmp.$options.deactivated = [deactivatedOffFn]
        }
      }
    }
  },
  '$emit': function () {
    Bus.$emit(...arguments)
  }
}