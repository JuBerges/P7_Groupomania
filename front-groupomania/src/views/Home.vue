<template>
  <div class="home pt-11 sm:mb-24 mx-2 sm:w-2/3 sm:mx-auto">
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
      @update-post="updatePost"
      v-if="addPost"
    ></post-form-modal>
    <div v-if="allPosts.length">
      <post
        @update-posts="updatePost()"
        :key="post"
        v-for="post in allPosts"
        :postTitle="post.title"
        :postContent="post.content"
        :postImage="post.img_url"
        :postDate="post.created_at"
        :postUserImg="post.user.avatar"
        :postUsername="post.user.username"
        :numberOfComments="post.comments.length"
        :postLikes="post.likes"
        :postOwner="post.user.id"
        :postObject="post"
      ></post>
    </div>
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
      allPosts: [],
    };
  },
  async mounted() {
    //====>Fetch toutes les publications<====\\
    this.$store.dispatch("post/getAllPosts").then((posts) => {
      this.allPosts = posts;
    });
  },
  methods: {
    updatePost() {
      this.addPost = false;
      this.$store.dispatch("post/getAllPosts").then((posts) => {
        this.allPosts = posts;
      });
    },
  },
};
</script>