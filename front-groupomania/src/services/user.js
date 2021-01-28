import store from "../store/index";
const api = "http://localhost:3000/api/auth/";

class UserRoutes {
  async getCurrentUser() {
    const authHeader = import("../helpers/auth-header");

    const getOptions = {
      method: "GET",
      headers: (await authHeader).authHeader(),
    };
    const userId = store.state.user.current_id;
    const getUserPromise = await fetch(api + userId, getOptions);
    const getResponse = await getUserPromise.json();
    return getResponse;
  }
}

export default new UserRoutes();
