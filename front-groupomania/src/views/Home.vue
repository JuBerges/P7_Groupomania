<template>
  <div class="home pt-11 h-screen">
    <post></post>
  </div>
</template>

<script>
import Post from "../components/Post.vue";
export default {
  name: "Home",
  components: { Post },
};
</script>