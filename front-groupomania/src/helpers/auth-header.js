import store from "../store/index";

export function authHeader() {
  // return authorization header with jwt token
  let user = store.state.user.current_token;
  if (user) {
    return { Authorization: "Bearer " + user };
  } else {
    return console.log("Problème d'identification!!");
  }
}
export function authHeaderJson() {
  // return authorization header with jwt token
  let user = store.state.user.current_token;
  if (user) {
    return {
      Authorization: "Bearer " + user,
      "Content-type": "application/json; charset=UTF-8",
    };
  } else {
    return console.log("Problème d'identification!!");
  }
}
