export default {
  state: {
    message: 'hello vuex'
  },
  mutations: {},
  actions: {},
  getters: {
    getMessage (state) {
      return state.message
    }
  }
}