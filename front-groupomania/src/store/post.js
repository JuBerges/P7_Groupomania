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
    getAllComments(state, comments) {
      state.all_comments = comments;
    },
  },
  actions: {
    createPost({ commit }, formData) {
      return PostRoutes.createPost(formData);
    },
    updatePost({ commit }, formData) {
      return PostRoutes.updatePost(formData);
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
    findLikes({ commit }, postId) {
      return PostRoutes.findLikes(postId);
    },
    createComment({ commit }, data) {
      return PostRoutes.createComment(data);
    },
    getComments({ commit }, postId) {
      return PostRoutes.getComments(postId).then((comments) => {
        return Promise.resolve(comments);
      });
    },
    deleteComment({ commit }, commentId) {
      return PostRoutes.deleteComment(commentId);
    },
  },
};
