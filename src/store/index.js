import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from '../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: "",
      email: "",
      image: "",
      isAdmin: false
    },
    isAuthenticated: false,
    token: '',
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      },
      state.token = localStorage.getItem('token');
      state.isAuthenticated = true;
    },
    revokeAuthentication(state) {
      state.currentUser = {};
      state.token = '';
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data, statusText } = await userAPI.getCurrentUser();
        if(statusText !== 'OK') throw new Error(statusText);
        const { id, email, name, image, isAdmin } = data
        commit('setCurrentUser', {
          id, email, name, image, isAdmin
        })
        return true;
      } catch (error) {
        console.log(error);
        // failt to be authenticated, clear the token
        commit('rovokeAuthentication');
        return false;
      }
    }
  },
  modules: {
  }
})
