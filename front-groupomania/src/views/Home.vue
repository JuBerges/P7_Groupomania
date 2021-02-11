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
    <div v-if="postsMounted.length" class="mt-14" id="scrollPosts">
      <post
        @update-posts="fetchPosts(postsMounted.length - 1)"
        :key="post"
        v-for="post in postsMounted"
        :postTitle="post.title"
        :postContent="post.content"
        :postImage="post.img_url"
        :postDate="post.created_at"
        :postUpdateDate="post.updated_at"
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
      postsMounted: [],
    };
  },
  beforeMount() {
    //====>Fetch toutes les publications<====\\
    this.fetchPosts();
    //====>Affiche les publications quand on scroll<====\\
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    fetchPosts(number) {
      this.addPost = false;
      this.$store.dispatch("post/getAllPosts").then((posts) => {
        this.allPosts = posts;
        console.log("allPosts présent");
        this.displayPosts(posts, number);
      });
    },
    displayPosts(array, number) {
      !number ? (number = 4) : (this.postsMounted = []);
      if (this.postsMounted.length === array.length) {
        return 0;
      }
      console.log("fetch 3 de plus");
      for (let i = 0; i <= number; i++) {
        let dest;
        if (!this.postsMounted.length) {
          dest = "0";
          console.log("ok c'est vide ", array[dest].title);
          this.postsMounted.push(array[dest]);
        } else if (this.postsMounted.length === array.length) {
          console.log("Il n'y a plus de posts à afficher!");
          return 0;
        } else {
          dest = this.postsMounted.length;
          this.postsMounted.push(array[dest]);
          console.log(array[dest].title);
        }
      }
    },
    handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.getElementById("scrollPosts").offsetHeight
      ) {
        this.displayPosts(this.allPosts);
      }
    },
  },
};
</script>