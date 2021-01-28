<template>
  <div class="profile h-screen pt-11">
    <delete-account
      v-if="displayModal"
      @cancel-delete="displayModal = false"
      @valid-delete="validDelete"
    ></delete-account>
    <div
      title="image d'avatar de l'utilisateur"
      v-if="avatar"
      class="w-40 h-40 md:h-60 md:w-60 mt-11 rounded-full mx-auto preview"
      :style="{ 'background-image': `url(${avatar})` }"
    ></div>
    <div class="text-white text-4xl font-bold text-center mt-4" v-if="username">
      {{ username }}
    </div>
    <div class="text-white text-2xl font-bold text-center mt-4" v-if="email">
      {{ email }}
    </div>
    <div class="mt-4 flex justify-center">
      <button
        @click="deleteUser"
        type="button"
        class="mt-2 w-full mx-4 rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:w-auto sm:text-sm"
      >
        Supprimer mon compte
      </button>
    </div>
  </div>
</template>

<script>
import DeleteAccount from "../components/DeleteAccount.vue";
import { authHeader } from "../helpers/auth-header.js";
export default {
  name: "Profile",
  components: { DeleteAccount },
  data() {
    return {
      username: null,
      email: null,
      avatar: null,
      currentUser: null,
      displayModal: false,
    };
  },
  async mounted() {
    const currentUserId = this.$store.state.current_user;
    let options = {
      method: "GET",
      headers: authHeader(),
    };
    const promise = await fetch(
      "http://localhost:3000/api/auth/" + currentUserId,
      options
    );
    const response = await promise.json();
    this.username = response.username;
    this.email = response.email;
    this.avatar = response.avatar;
    return response;
  },
  methods: {
    deleteUser() {
      this.displayModal = true;
    },
    validDelete() {
      this.$emit("valid-signout");
    },
  },
};
</script>
<style scoped>
.preview {
  background-size: cover;
  background-position: center center;
}
</style>