import { createStore } from "vuex";
import { user } from "./user";

export default createStore({
  state: {
    name: "Groupomania",
  },
  mutations: {},
  actions: {},
  modules: { user },
});
