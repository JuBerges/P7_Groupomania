<template>
  <div class="signuplogin mt-11 h-screen">
    <div id="homeTitle" class="flex w-max mx-auto">
      <img
        class="h-11"
        src="../assets/images/nav-mini-logo.png"
        alt="logo groupomania"
      />
      <h1 class="text-white font-bold text-3xl pl-1 pt-1">Groupomania</h1>
    </div>
    <div class="text-white text-center">
      <h2 class="custom-border font-bold text-2xl">Se connecter</h2>
      <a href="#" class="p text-blue-600">Créez un compte</a>
      <form class="flex flex-col">
        <label for="email">E-mail: </label>
        <input id="email" class="mx-auto" type="email" />
        <label for="password">Mot de passe: </label>
        <input id="password" class="mx-auto" type="password" />
        <the-button class="mt-6 mx-auto">
          <template v-slot:label>Comfimer</template>
        </the-button>
      </form>
    </div>
  </div>
</template>
<script>
import TheButton from "../components/TheButton.vue";
export default {
  name: "SignupLogin",
  components: { TheButton },
};
</script>

<style scoped>
.custom-border:focus {
  border-bottom: solid 3px rgb(45, 136, 255);
}
</style>