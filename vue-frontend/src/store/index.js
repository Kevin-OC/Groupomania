import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogged: localStorage.getItem('token'),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
