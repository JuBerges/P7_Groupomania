<template>
  <div class="profil h-screen pt-11">
    <div><!-- img du profile --></div>
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
  name: "Profil",
  components: { SignupLogin },
};
</script>