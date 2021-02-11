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
    <div v-if="postsDisplayed.length" class="mt-14" id="scrollPosts">
      <post
        @update-posts="fetchPosts(postsDisplayed.length - 1)"
        :key="post"
        v-for="post in postsDisplayed"
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
      postsDisplayed: [],
      onHome: false,
    };
  },
  beforeMount() {
    //====>Fetch toutes les publications<====\\
    this.fetchPosts();
    //====>Bloque la fonction haddleScroll si l'utisateur n'est pas sur l'acceuil<====\\
    this.onHome = true;
  },
  mounted() {
    //====>Détecte la fin scrolling vertical<====\\
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
        //console.log("allPosts présent");
        this.displayPosts(posts, number);
      });
    },
    displayPosts(array, number) {
      /* "Number" est utilisé pour mettre à jour les posts et afficher seulement 
      les posts chargés à l'écran quand l'utilisateur mets à jour l'un de ses posts */
      !number ? (number = 4) : (this.postsDisplayed = []);
      if (this.postsDisplayed.length === array.length) {
        return 0;
      }
      //console.log("Fetch 5 posts de plus");
      for (let i = 0; i <= number; i++) {
        let dest;
        if (!this.postsDisplayed.length) {
          dest = "0";
          //console.log("C'est vide! Post_id: ", array[dest].id);
          this.postsDisplayed.push(array[dest]);
        } else if (this.postsDisplayed.length === array.length) {
          //console.log("Il n'y a plus de posts à afficher!");
          return 0;
        } else {
          dest = this.postsDisplayed.length;
          this.postsDisplayed.push(array[dest]);
          //console.log("Post_id: ", array[dest].id);
        }
      }
    },
    handleScroll() {
      const scroller = document.getElementById("scrollPosts");
      if (!this.onHome || !scroller) {
        return 0;
      }
      if (window.innerHeight + window.scrollY >= scroller.offsetHeight) {
        this.displayPosts(this.allPosts);
      }
    },
  },
};
</script>