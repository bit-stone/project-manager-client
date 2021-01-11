import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

interface UserNameList {
  [key: string]: {
    displayName: string;
    loginName: string;
  };
}

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: {
      id: ""
    },
    userNameList: {} as UserNameList
  },
  mutations: {
    userLogin(state, payload) {
      state.isLoggedIn = true;
      console.log(payload);
      state.user.id = payload.id;
    },
    userLogout(state) {
      state.isLoggedIn = false;
      state.user.id = "";
    },
    setUserNameList(state, payload) {
      state.userNameList = payload;
    }
  },
  actions: {},
  getters: {
    loggedInUserId: (state) => {
      return state.user.id;
    },
    loggedInLoginName: (state, getters) => {
      return getters.userLoginName(state.user.id);
    },
    loggedInDisplayName: (state, getters) => {
      return getters.userDisplayName(state.user.id);
    },
    userLoginName: (state) => (id: string) => {
      return state.userNameList[id].loginName;
    },
    userDisplayName: (state) => (id: string) => {
      return state.userNameList[id].displayName;
    }
  }
});
