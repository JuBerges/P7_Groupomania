<template>
  <div class="signuplogin h-full">
    <div id="login" class="h-screen" v-if="!toggleOptions">
      <div id="homeTitle" class="flex w-max mx-auto pt-11">
        <img
          class="h-11"
          src="../assets/images/nav-mini-logo.png"
          alt="logo groupomania"
        />
        <h1 class="text-white font-bold text-3xl pl-1 pt-1">Groupomania</h1>
      </div>
      <div class="text-white text-center">
        <h2 class="custom-border font-bold text-2xl">Identifiez-vous</h2>
        <form class="flex flex-col" @submit="checkForm" method="post">
          <p v-if="errors.length">
    <b class="text-second-color">Merci de corriger le(s) erreur(s) suivante(s):</b>
    <ul>
      <li :key="error" v-for="error in errors" class="text-red-600">{{ error }}</li>
    </ul>
  </p>
          <label class="pt-2" for="email">E-mail: </label>
          <input
            id="email"
            class="mx-auto text-black p-1 placeholder-gray-500"
            placeholder="E-mail"
            v-model="user.email"
            type="email"
          />
          <label class="pt-2" for="password">Mot de passe: </label>
          <input
            id="password"
            class="mx-auto text-black p-1 placeholder-gray-500"
            placeholder="Mot de passe"
            v-model="user.password"
            type="password"
          />
          <the-button class="mt-6 mx-auto" type="submit" @click.prevent="checkForm">
            <template v-slot:label>Se connecter</template>
          </the-button>
          <p class="pt-4">Vous n'avez pas de compte?</p>
          <button
            class="p text-blue-600 hover:underline"
            @click="toggleOptions = true"
          >
            Créez un compte
          </button>
        </form>
      </div>
    </div>
    <div id="signup" v-else>
      <div id="homeTitle" class="flex w-max mx-auto pt-11">
        <img
          class="h-11"
          src="../assets/images/nav-mini-logo.png"
          alt="logo groupomania"
        />
        <h1 class="text-white font-bold text-3xl pl-1 pt-1">Groupomania</h1>
      </div>
      <div class="text-white text-center">
        <h2 class="custom-border font-bold text-2xl">Créez un compte</h2>
        <form class="flex flex-col">
          <label class="pt-2" for="username">Choisissez votre pseudo: </label>
          <input
            id="username"
            class="mx-auto text-black p-1 placeholder-gray-500"
            placeholder="Pseudo"
            type="text"
          />
          <label class="pt-2" for="email">E-mail: </label>
          <input
            id="email"
            class="mx-auto text-black p-1 placeholder-gray-500"
            placeholder="Adresse e-mail"
            type="email"
          />
          <label class="pt-2" for="password">Mot de passe: </label>
          <input
            id="password"
            class="mx-auto text-black p-1 placeholder-gray-500"
            placeholder="Mot de passe"
            type="password"
          />
          <span class="pt-2">Image de profil:</span>
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
            ref="fileInput"
            class="sr-only"
            @input="onSelectFile"
          />
          <p class="text-gray-400 text-xs pb-2">jpg, jpeg, png ou gif</p>
          <div
            v-if="imageData"
            class="w-20 h-20 rounded-full mx-auto cursor-pointer preview"
            :style="{ 'background-image': `url(${imageData})` }"
            @click="chooseImage"
          ></div>
          <the-button class="mt-6 mx-auto" type="submit" @click="signUp">
            <template v-slot:label>S'inscrire</template>
          </the-button>
          <p class="pt-4">Déjà membre ?</p>
          <button
            class="p text-blue-600 hover:underline pb-11"
            @click="toggleOptions = false"
          >
            Se connecter
          </button>
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
      imageData: null,
      errors: [],
      user: {
        email: null,
        password: null,
        username: null,
      },
    };
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
    logIn() {
      //ATTENTION LA PORTE EST OUVERTE ^^
      if (this.user.email.length === 0 || this.user.password.length === 0) {
        window.alert("Entrez votre e-mail et votre mot de passe svp");
      } else {
        let data = {
          email: this.user.email,
          password: this.user.password,
        };
      }
    },
    checkForm: function (e) {
      if (this.user.email && this.user.password) {
        return true;
      }

      this.errors = [];

      if (!this.user.email) {
        this.errors.push("Email requis.");
      }
      if (!this.user.password) {
        this.errors.push("Mot de passe requis.");
      }

      e.preventDefault();
    },
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
.preview {
  background-size: cover;
  background-position: center center;
}
</style>