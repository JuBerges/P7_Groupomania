import { createStore } from "vuex";

export default createStore({
  state: {
    name: "Groupomania",
    current_user: "none",
  },
  mutations: {
    getId(state, id) {
      state.current_user = id;
    },
  },
  actions: {},
  modules: {},
});
