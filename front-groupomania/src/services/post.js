import store from "../store/index";
const api = "http://localhost:3000/api/post/";
const authHeader = import("../helpers/auth-header");

class PostRoutes {
  //====>Création d'une publication
  async createPost(formData) {
    let options = {
      method: "POST",
      headers: (await authHeader).authHeader(),
      body: formData,
    };
    const promise = await fetch(api, options);
    const response = promise;
    return response;
  }
  //====>Mise à jour d'une publication
  async updatePost(formData) {
    let options = {
      method: "PUT",
      headers: (await authHeader).authHeader(),
      body: formData,
    };
    const promise = await fetch(api + "/update", options);
    const response = promise;
    return response;
  }
  //====>Suppression d'une publication
  async deletePost(postId) {
    let options = {
      method: "DELETE",
      headers: (await authHeader).authHeader(),
    };
    const promise = await fetch(api + postId, options);
    const response = await promise.json();
    return response;
  }
  //====>Récup toutes les publications
  async getAllPosts() {
    const options = {
      method: "GET",
      headers: (await authHeader).authHeader(),
    };
    const promise = await fetch(api, options);
    const response = await promise.json();
    return response;
  }
  //====>Gére le systeme de like
  async handleLike(data) {
    let options = {
      method: "POST",
      headers: (await authHeader).authHeader(),
    };
    const promise = await fetch(
      api + data.postId + "/" + data.userId + "/like",
      options
    );
    const response = await promise.json();
    return response;
  }
  //====>Récup les likes d'une publication
  async findLikes(postId) {
    let options = {
      method: "GET",
      headers: (await authHeader).authHeader(),
    };
    const promise = await fetch(api + postId + "/like", options);
    const response = await promise.json();
    return response;
  }
  //====>Création d'un commentaire
  async createComment(data) {
    let options = {
      method: "POST",
      headers: (await authHeader).authHeaderJson(),
      body: JSON.stringify(data),
    };
    const promise = await fetch(api + "/comment", options);
    const response = await promise.json();
    return response;
  }
  //====>Récup les commentaires d'une publication
  async getComments(postId) {
    const options = {
      method: "GET",
      headers: (await authHeader).authHeader(),
    };
    const promise = await fetch(api + postId + "/comments", options);
    const response = await promise.json();
    return response;
  }
  //====>Supprime un commentaires
  async deleteComment(commentId) {
    let options = {
      method: "DELETE",
      headers: (await authHeader).authHeader(),
    };
    const promise = await fetch(api + commentId + "/comment", options);
    const response = await promise.json();
    return response;
  }
}

export default new PostRoutes();
