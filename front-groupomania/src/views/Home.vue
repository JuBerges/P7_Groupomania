<template>
  <div class="home pt-11 sm:mb-24 h-screen mx-2">
    <div class="flex">
      <button
        @click="addPost = true"
        class="py-2 px-3 text-xl mx-auto ml-2 fixed mt-2 bg-blue-600 font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-full focus:outline-none focus:shadow-outline-blue btn-blue active:bg-blue-600 hover:bg-blue-700"
      >
        +
      </button>
    </div>
    <post-form-modal
      @cancel-post="addPost = false"
      v-if="addPost"
    ></post-form-modal>
    <post></post>
  </div>
</template>

<script>
import Post from "../components/Post.vue";
import PostFormModal from "../components/PostFormModal.vue";
import TheButton from "../components/TheButton.vue";
export default {
  name: "Home",
  components: { Post, TheButton, PostFormModal },
  data() {
    return {
      addPost: false,
    };
  },
};
</script>