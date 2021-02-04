import PostRoutes from "../services/post";

export const post = {
  namespaced: true,
  state: {
    all_posts: "none",
  },
  mutations: {
    getAllPosts(state, posts) {
      state.all_posts = posts;
    },
  },
  actions: {
    createPost({ commit }, formData) {
      return PostRoutes.createPost(formData);
    },
    getAllPosts({ commit }) {
      return PostRoutes.getAllPosts().then((posts) => {
        commit("getAllPosts", posts);
        return Promise.resolve(posts);
      });
    },
    deletePost({ commit }, postId) {
      return PostRoutes.deletePost(postId);
    },
    handleLike({ commit }, data) {
      return PostRoutes.handleLike(data);
    },
  },
};
