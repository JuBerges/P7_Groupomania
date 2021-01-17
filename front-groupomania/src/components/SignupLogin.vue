<template>
  <div class="signuplogin h-screen">
    <div id="login" v-if="!toggleOptions">
      <div id="homeTitle" class="flex w-max mx-auto pt-11">
        <img
          class="h-11"
          src="../assets/images/nav-mini-logo.png"
          alt="logo groupomania"
        />
        <h1 class="text-white font-bold text-3xl pl-1 pt-1">Groupomania</h1>
      </div>
      <div class="text-white text-center">
        <h2 class="custom-border font-bold text-2xl">Se connecter</h2>
        <button
          class="p text-blue-600 hover:underline"
          @click="toggleOptions = true"
        >
          Créez un compte
        </button>
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
    <div id="signup" v-if="toggleOptions">
      <div id="homeTitle" class="flex w-max mx-auto pt-11">
        <img
          class="h-11"
          src="../assets/images/nav-mini-logo.png"
          alt="logo groupomania"
        />
        <h1 class="text-white font-bold text-3xl pl-1 pt-1">Groupomania</h1>
      </div>
      <div class="text-white text-center">
        <h2 class="custom-border font-bold text-2xl">S'inscrire</h2>
        <button
          class="p text-blue-600 hover:underline"
          @click="toggleOptions = false"
        >
          Déja inscrit ?
        </button>
        <form class="flex flex-col">
          <label for="username">Pseudo: </label>
          <input id="username" class="mx-auto" type="text" />
          <label for="email">E-mail: </label>
          <input id="email" class="mx-auto" type="email" />
          <label for="password">Mot de passe: </label>
          <input id="password" class="mx-auto" type="password" />
          <span>Image de profil:</span>
          <label
            for="file-upload"
            class="cursor-pointer font-medium text-second-color hover:underline"
          >
            Choisir une image
          </label>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            class="sr-only"
          />
          <the-button class="mt-6 mx-auto">
            <template v-slot:label>Enregistrer</template>
          </the-button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import TheButton from "../components/TheButton.vue";
export default {
  name: "SignupLogin",
  components: { TheButton },
  data() {
    return {
      toggleOptions: false,
    };
  },
};
</script>

<style scoped>
.custom-border:focus {
  border-bottom: solid 3px rgb(45, 136, 255);
}
.text-second-color {
  color: rgb(45, 136, 255);
}
</style>