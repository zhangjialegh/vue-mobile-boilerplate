export const state = () => ({
  account: null
})

export const mutations = {
  account (state, payload) {
    state.account = payload
  }
}