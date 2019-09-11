import { defaultState } from 'client/utils'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default (newState = {}) =>
  new Vuex.Store({
    state: () => ({
      ...defaultState,
      ...newState,
    }),

    mutations: {
      setOutline(state, payload) {
        state.outline = payload
      },
    },
  })
