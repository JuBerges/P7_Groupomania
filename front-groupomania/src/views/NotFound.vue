<template>
  <div class="notfound pt-11 ml-6">
    <h1 class="text-white bold text-5xl mt-6">404</h1>
    <h2 class="text-white bold text-5xl">Page Introuvable</h2>
    <router-link :to="{ name: 'Home' }">
      <the-button class="mx-auto mt-3">
        <template v-slot:label>Retour à l'accueil</template>
      </the-button>
    </router-link>
    <img
      class="mx-auto"
      src="../assets/images/losttra.png"
      alt="image de john travolta perdu"
    />
  </div>
</template>
<script>
import TheButton from "../components/TheButton.vue";
export default {
  name: "NotFound",
  components: { TheButton },
};
</script>