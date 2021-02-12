<template>
  <div
    class="flex text-xs justify-between p-2 dark-bg darkborder rounded-lg sm:w-2/3 mx-2 sm:mx-auto"
  >
    <div class="flex">
      <img
        :src="userViewed.avatar"
        alt="avatar d'utilisateur"
        class="h-4 w-4 rounded-full"
      />
      <p class="my-blue pl-1">{{ userViewed.username }}</p>
    </div>
    <div
      v-if="userViewed.role !== 'admin' && userViewed.id !== 1 && isAdmin"
      class="flex"
    >
      <svg
        @click="toggleDelete = true"
        v-if="!toggleDelete"
        class="h-4 w-4 text-gray-400 hover:text-white cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>Suppression de l'utilisateur</title>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      <svg
        v-if="toggleDelete"
        @click="toggleDelete = false"
        class="h-6 w-6 px-1 text-red-800 hover:text-red-500 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>Icône d'annulation de suppression</title>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <!-- Icônes de validation -->
      <svg
        v-if="toggleDelete"
        @click="deleteUser"
        class="h-6 w-6 px-1 my-blue hover:text-blue-400 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>Icône de validation de suppression</title>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  name: "UsersViewer",
  data() {
    return { toggleDelete: false, isAdmin: false };
  },
  props: ["userViewed"],
  mounted() {
    let currentUser = this.$store.state.user.current_user;
    if (currentUser.role === "admin") {
      this.isAdmin = true;
    }
  },
  methods: {
    deleteUser() {
      let userId = this.userViewed.id;
      this.$store.dispatch("user/adminDeleteUser", userId).then((response) => {
        console.log(response);
        this.$emit("refresh-users");
      });
    },
  },
};
</script>