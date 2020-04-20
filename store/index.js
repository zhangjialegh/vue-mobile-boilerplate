export const state = () => ({
  account: null,
  warnlog: '',
  errorlog: ''
})

export const mutations = {
  account (state, payload) {
    state.account = payload
  },
  warnlog (state, payload) {
    state.warnlog = payload
  },
  errorlog (state, payload) {
    state.errorlog = payload
  }
}