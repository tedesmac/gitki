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
      setMenu(state, payload) {
        state.menu = payload
      },

      setOutline(state, payload) {
        state.outline = payload
      },

      toggleMenu(state) {
        state.menu = !state.menu
      },
    },
  })
