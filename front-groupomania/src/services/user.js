import store from "../store/index";
const api = "http://localhost:3000/api/auth/";
const authHeader = import("../helpers/auth-header");

class UserRoutes {
  //====>Affichage d'un utilisateur
  async getCurrentUser() {
    const options = {
      method: "GET",
      headers: (await authHeader).authHeader(),
    };
    const userId = store.state.user.current_id;
    const promise = await fetch(api + userId, options);
    const response = await promise.json();
    return response;
  }
  //====>Récup des infos utilisateurs
  async getAllUsers() {
    const options = {
      method: "GET",
      headers: (await authHeader).authHeader(),
    };
    const promise = await fetch(api, options);
    const response = await promise.json();
    return response;
  }
  //====> Suppression d'un utilisateur
  async deleteUser() {
    const userId = store.state.user.current_id;
    let options = {
      method: "DELETE",
      headers: (await authHeader).authHeader(),
    };
    const promise = await fetch(api + userId, options);
    const response = await promise.json();
    return response;
  }
  //====> Suppression d'un utilisateur par l'admin
  async adminDeleteUser(userId) {
    let options = {
      method: "DELETE",
      headers: (await authHeader).authHeader(),
    };
    const promise = await fetch(api + userId, options);
    const response = await promise.json();
    return response;
  }
  //====> Modification de l'utilisateur connecté
  async modifyCurrentUser(formData) {
    const userId = store.state.user.current_id;
    let options = {
      method: "PUT",
      headers: (await authHeader).authHeader(),
      body: formData,
    };
    const promise = await fetch(api + userId, options);
    const response = promise;
    return response;
  }
}

export default new UserRoutes();
