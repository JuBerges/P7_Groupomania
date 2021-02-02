import { createStore } from "vuex";
import { user } from "./user";
import { post } from "./post";
import { comment } from "./comment";

export default createStore({
  state: {
    name: "Groupomania",
  },
  mutations: {},
  actions: {},
  modules: { user, post, comment },
});
