<template>
  <div class="home pt-11 h-screen">
    <post></post>
  </div>
</template>

<script>
import Signin from "../components/Signin.vue";
import Post from "../components/Post.vue";
export default {
  name: "Home",
  components: { Signin, Post },
};
</script>