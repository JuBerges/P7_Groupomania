import { createStore } from "vuex";

export default createStore({
  state: {
    name: "Groupomania",
    current_user: "none",
    current_token: "none",
  },
  mutations: {
    getId(state, id) {
      state.current_user = id;
    },
    getToken(state, token) {
      state.current_token = token;
    },
  },
  actions: {},
  modules: {},
});
