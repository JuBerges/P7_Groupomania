<template>
  <div class="signuplogin">
    <div id="login" class="h-screen" v-if="!toggleOptions">
      <div id="homeTitle" class="flex w-max mx-auto pt-11">
        <img
          class="h-11"
          src="../assets/images/nav-mini-logo.png"
          alt="logo groupomania"
        />
        <h1 class="text-white font-bold text-3xl pl-1 pt-1">
          {{ $store.state.name }}
        </h1>
      </div>
      <div class="text-white text-center">
        <h2 class="custom-border font-bold text-2xl">Identifiez-vous</h2>
        <form class="flex flex-col" @submit="logIn" method="post">
          <div v-if="errors.length">
            <b class="my-blue"
              >Merci de corriger le(s) erreur(s) suivante(s):</b
            >
            <ul>
              <li :key="error" v-for="error in errors" class="text-red-600">
                {{ error }}
              </li>
            </ul>
          </div>
          <label class="pt-2" for="email">E-mail: </label>
          <input
            id="email"
            class="mx-auto text-black p-1 placeholder-gray-500"
            placeholder="E-mail"
            v-model="email"
            type="email"
          />
          <label class="pt-2" for="password">Mot de passe: </label>
          <input
            id="password"
            class="mx-auto text-black p-1 placeholder-gray-500"
            placeholder="Mot de passe"
            v-model="password"
            type="password"
          />
          <the-button class="mt-6 mx-auto" type="submit" @click.prevent="logIn">
            <template v-slot:label>Se connecter</template>
          </the-button>
          <p class="pt-4">Vous n'avez pas de compte?</p>
          <button
            class="p my-blue hover:underline mb-6"
            @click="
              (toggleOptions = true),
                ((errors = []), (password = null), (email = null))
            "
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
        <h1 class="text-white font-bold text-3xl pl-1 pt-1">
          {{ $store.state.name }}
        </h1>
      </div>
      <div class="text-white text-center">
        <h2 class="custom-border font-bold text-2xl">Créez un compte</h2>
        <form
          class="flex flex-col"
          action="/signup"
          enctype="multipart/form-data"
          method="post"
        >
          <label class="pt-2" for="username">Choisissez votre pseudo: </label>
          <input
            id="username"
            class="mx-auto text-black p-1 placeholder-gray-500"
            placeholder="Pseudo"
            type="text"
            v-model="username"
          />
          <p class="text-gray-400 text-xs pt-2">
            Utilisez uniquement des chiffres<br />
            et des lettres sans espace.
          </p>

          <label class="pt-2" for="email">E-mail: </label>
          <input
            id="email"
            class="mx-auto text-black p-1 placeholder-gray-500"
            placeholder="Adresse e-mail"
            type="email"
            v-model="email"
          />
          <label class="pt-2" for="password">Mot de passe: </label>
          <input
            id="password"
            class="mx-auto text-black p-1 placeholder-gray-500"
            placeholder="Votre mot de passe"
            type="password"
            v-model="password"
          /><input
            id="password"
            class="mx-auto text-black p-1 placeholder-gray-500 mt-1"
            placeholder="Retapez votre mot de passe"
            type="password"
            v-model="passwordCheck"
          />
          <p class="text-gray-400 text-xs pt-2">
            Votre mot de passe doit contenir<br />
            au minimum 8 caractères alphanumériques<br />
            avec au moins 1 majuscule et un chiffre.
          </p>
          <span class="pt-2">Image de profil:</span>
          <label
            for="file-upload"
            class="cursor-pointer font-medium my-blue hover:underline"
          >
            Choisir une image
          </label>
          <input
            id="file-upload"
            name="image"
            type="file"
            ref="fileInput"
            class="sr-only"
            @input="onSelectFile"
          />
          <p class="text-gray-400 text-xs pb-2">jpg, jpeg, png ou gif.</p>
          <div
            v-if="file"
            class="w-20 h-20 rounded-full mx-auto cursor-pointer preview"
            :style="{ 'background-image': `url(${file})` }"
            @click="chooseImage"
          ></div>
          <the-button
            class="mt-6 mx-auto"
            type="submit"
            @click.prevent="signUp"
          >
            <template v-slot:label>S'inscrire</template>
          </the-button>
          <p class="pt-4">Déjà membre ?</p>
          <button
            class="p my-blue hover:underline pb-11"
            @click="(toggleOptions = false), (username = null)"
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
      file: null,
      avatar: null,
      errors: [],
      email: null,
      password: null,
      passwordCheck: null,
      username: null,
    };
  },
  mounted() {
    this.$store.commit("user/getId", "errased");
    this.$store.commit("user/getToken", "erased");
    this.$store.commit("user/getToken", "erased");
    this.$store.commit("user/getCurrentUser", "erased");
    this.$router.push({ path: "/" });
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
          this.file = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
        this.avatar = files[0];
      }
    },
    signUp() {
      if (
        this.email === null ||
        this.password === null ||
        this.username === null
      ) {
        window.alert(
          "N'oubliez pas d'entrer votre pseudo, votre e-mail et un mot de passe svp"
        );
      } else {
        let user = {
          email: this.email,
          password: this.password,
          username: this.username,
        };
        let form = new FormData();
        form.append("user", JSON.stringify(user));
        if (this.password !== this.passwordCheck) {
          return window.alert(
            "Votre mot de passe doit être le même dans les 2 champs"
          );
        } else {
          if (this.avatar !== null) {
            form.append("image", this.avatar);
            console.log("Image d'avatar présente dans le formulaire !");
          } else {
            console.log("Image d'avatar absente du formulaire !");
          }
          let options = {
            method: "POST",
            body: form,
          };
          let that = this;
          let promise = fetch("http://localhost:3000/api/auth/signup", options)
            .then(function (response) {
              console.log(response);
              if (response.status === 401) {
                window.alert("Mot de passe pas assez sécurisé!!");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
          let response = promise;
          return (
            response,
            setTimeout(function () {
              that.logIn();
            }, 500)
          );
        }
      }
    },
    logIn: function () {
      if (this.email && this.password) {
        let data = {
          email: this.email,
          password: this.password,
        };
        let options = {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        };
        const that = this;
        let promise = fetch("http://localhost:3000/api/auth/login", options)
          .then(handleResponse)
          .then(function (user) {
            if (user.token) {
              that.$emit("logged-in");
              console.log("Utilisateur connecté !!");
              that.$store.commit("user/getId", user.userId);
              that.$store.commit("user/getToken", user.token);
            } else {
              that.errors = [];
              that.errors.push("Email et/ou mot de passe non reconnue(s).");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        function handleResponse(response) {
          return response.text().then((text) => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
              if (response.status === 401) {
                // auto logout if 401 response returned from api
                that.errors = [];
                that.errors.push("Email et/ou mot de passe non reconnue(s).");
              }

              const error = (data && data.message) || response.statusText;
              return Promise.reject(error);
            }

            return data;
          });
        }
        let user = promise;
        return user;
      }

      this.errors = [];

      if (!this.email) {
        this.errors.push("Email requis.");
      }
      if (!this.password) {
        this.errors.push("Mot de passe requis.");
      }
    },
  },
};
</script>

<style scoped>
.custom-border:focus {
  border-bottom: solid 3px rgb(45, 136, 255);
}
</style>