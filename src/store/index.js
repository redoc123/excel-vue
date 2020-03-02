import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import data from './modules/data'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'vuexl',
  storage: window.localStorage
})

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    data
  },
  getters,
  plugins: [vuexPersist.plugin]
})

export default store
