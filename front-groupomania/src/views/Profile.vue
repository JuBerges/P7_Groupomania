<template>
  <div class="profile h-screen pt-11">
    <div><img src="" alt="votre avatar" /></div>
    <div class="text-white text-2xl font-bold" v-if="email">
      E-mail:{{ email }}
    </div>
    <div class="text-white text-2xl font-bold" v-if="username">
      Pseudo:
      {{ username }}
    </div>
    <div>
      <!-- profil créé le xx/xx/xxxx -->
      <!-- profil mise à jour le xx/xx/xxxx -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  components: {},
  data() {
    return {
      username: null,
      email: null,
      avatar: "../assets/images/defaultProfilePic.png",
      currentUser: null,
    };
  },
  async mounted() {
    const currentUserEmail = localStorage.getItem("id");
    const promise = await fetch(
      "http://localhost:3000/api/auth/" + currentUserEmail
    );
    const response = await promise.json();
    this.username = response.username;
    this.email = response.email;
    console.log(response);
    return response;
  },
  methods: {},
};
</script>