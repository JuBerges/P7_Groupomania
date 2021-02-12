<template>
  <header
    @click="updateAvatar"
    id="nav"
    class="grid grid-cols-7 md:grid-cols-11 gap-0 dark-bg h-11 border-nav fixed w-full"
  >
    <!--Logo du site-->
    <router-link
      @click="scrollTop"
      class="col-span-1 md:col-span-3 col-start-1 md:col-end-4"
      :to="{ name: 'Home' }"
    >
      <div class="ml-1 md:ml-4 flex min-w-max">
        <img
          class="h-11"
          src="../assets/images/nav-mini-logo.png"
          alt="logo groupomania"
        /><span class="text-white hidden md:block font-bold text-xl pl-1 pt-2"
          ><h1>{{ $store.state.name }}</h1></span
        >
      </div>
    </router-link>
    <!-- Lien vers l'accueil-->
    <router-link
      @click="scrollTop"
      class="mt-2 router col-start-3 md:col-start-5"
      :to="{ name: 'Home' }"
      ><svg
        class="h-6 w-6 mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>Accueil</title>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        /></svg
    ></router-link>
    <!-- Linen vers page profil -->
    <router-link
      @click="scrollTop"
      class="mt-2 router col-start-4 md:col-start-6"
      :to="{ name: 'Profile' }"
    >
      <img
        v-if="avatar"
        :src="avatar"
        alt="logo de l'utlisateur lien vers page profil"
        class="h-6 w-6 rounded-full mx-auto"
      />
    </router-link>
    <!-- Lien vers aide -->
    <router-link
      @click="scrollTop"
      class="mt-2 router col-start-5 md:col-start-7"
      :to="{ name: 'Help' }"
      ><svg
        class="h-6 w-6 mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>Aide</title>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        /></svg
    ></router-link>
    <!-- Bouton de déconnexion -->
    <div
      class="col-start-7 md:col-start-11"
      @click="cancelSignOut = !cancelSignOut"
    >
      <!-- Icône de déconnexion -->
      <svg
        class="h-6 w-6 mx-auto mt-2 cursor-pointer router"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>Déconnexion</title>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    </div>
    <sign-out-modal
      v-if="cancelSignOut"
      @cancel-signout="cancelSignOut = false"
      @valid-signout="loggingOut"
    ></sign-out-modal>
  </header>
</template>

<script>
import SignOutModal from "../components/SignOutModal.vue";

export default {
  name: "NavBar",
  components: { SignOutModal },
  data() {
    return {
      cancelSignOut: false,
      avatar: null,
    };
  },
  async mounted() {
    /* Récup et stocke les infos sur l'utilisateur connecté */
    this.$store.dispatch("user/getCurrentUser").then((user) => {
      this.avatar = user.avatar;
    });
  },
  methods: {
    scrollTop() {
      return this.$emit("scroll-top");
    },
    loggingOut() {
      return this.$emit("valid-signout");
    },
    updateAvatar() {
      this.avatar = this.$store.state.user.current_user.avatar;
    },
  },
};
</script>
<!-- Style for darkmode and router-link-activ -->
<style scoped>
.border-nav {
  border-bottom: solid rgb(48, 49, 50) 3px;
}
.router {
  color: rgb(150, 151, 152);
}
.router:hover {
  color: rgb(255, 255, 255);
}
.router.router-link-active,
.router.router-link-exact-active {
  border-bottom: solid 3px rgb(45, 136, 255);
  color: rgb(45, 136, 255);
}
</style>