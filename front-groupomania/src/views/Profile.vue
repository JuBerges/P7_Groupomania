<template>
  <div class="profile h-screen pt-11">
    <div><img src="" alt="votre avatar" /></div>
    <div><!-- USERname email et role --></div>
    <div><!-- Bio --></div>
    <div>
      <!-- profil créé le xx/xx/xxxx -->
      <!-- profil mise à jour le xx/xx/xxxx -->
    </div>
  </div>
</template>

<script>
import SignupLogin from "../components/SignupLogin.vue";
export default {
  name: "Profile",
  components: { SignupLogin },
  data() {
    return {
      username: "",
      email: "",
      avatar: "../assets/images/defaultProfilePic.png",
    };
  },
  comptuted: {
    showAvatar() {
      this.avatar;
    },
  },
  methods: {},
};
</script>