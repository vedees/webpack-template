import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import example from './example'

export default new Vuex.Store({
  modules: {
    example
  }
})