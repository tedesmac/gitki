import { defaultState } from 'client/utils'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default (state = {}) =>
  new Vuex.Store({
    state: () => ({
      ...defaultState,
      ...state,
    }),
  })
