import UserRoutes from "../services/user";

export const user = {
  namespaced: true,
  state: {
    current_user: "none",
    current_id: "none",
    current_token: "none",
  },
  mutations: {
    getCurrentUser(state, user) {
      state.current_user = user;
    },
    getId(state, id) {
      state.current_id = id;
    },
    getToken(state, token) {
      state.current_token = token;
    },
  },
  actions: {
    getCurrentUser({ commit }) {
      return UserRoutes.getCurrentUser().then((user) => {
        commit("getCurrentUser", user);
        return Promise.resolve(user);
      });
    },
  },
};
