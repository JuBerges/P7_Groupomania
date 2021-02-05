import { createStore } from "vuex";
import { user } from "./user";
import { post } from "./post";

export default createStore({
  state: {
    name: "Groupomania",
  },
  mutations: {},
  actions: {},
  modules: { user, post },
});
