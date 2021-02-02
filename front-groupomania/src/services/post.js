import store from "../store/index";
const api = "http://localhost:3000/api/post/";
const authHeader = import("../helpers/auth-header");

class PostRoutes {
  //====>Affichage d'un utilisateur
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
  async getAllPosts() {
    const options = {
      method: "GET",
      headers: (await authHeader).authHeader(),
    };
    const promise = await fetch(api, options);
    const response = await promise.json();
    return response;
  }
}

export default new PostRoutes();
