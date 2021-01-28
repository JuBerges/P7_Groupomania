import store from "../store/index";

export function authHeader() {
  // return authorization header with jwt token
  let user = store.state.current_token;
  if (user) {
    return { Authorization: "Bearer " + user };
  } else {
    return console.log("Ne fonctionne pas!!");
  }
}
