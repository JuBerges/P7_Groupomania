<template>
  <div
    class="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50"
  >
    <!-- modal -->
    <div class="dark-bg rounded-lg shadow-lg w-full mx-2 border-2 darkborder">
      <!-- modal header -->
      <header class="px-4 py-2 flex justify-between items-center rounded-t-lg">
        <h3 class="font-semibold text-lg my-blue">Commentaires</h3>
        <button class="text-black close-modal" @click="closeModal()">
          <!-- Icône pour fermeture modal -->
          <svg
            class="h-4 w-4 my-gray"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <title>Icône de retour vers les publications</title>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </header>
      <!-- modal body -->
      <div
        id="commentScroll"
        class="p-3 h-60 overflow-scroll text-white border-t-2 border-b-2 darkborder"
      >
        <p v-if="noComment">Aucun commentaire pour le moment...&#128546;</p>
        <comment-list
          @refresh-comments="
            getComments();
            decreaseCommentNumber();
          "
          v-else
          :key="com"
          v-for="com in allComments"
          :commentContent="com.comment"
          :commentDate="com.created_at"
          :commentUsername="com.user.username"
          :commentUserImg="com.user.avatar"
          :commentId="com.id"
          :commentUser="com.user"
        ></comment-list>
      </div>
      <form
        action="javascript:void(0);"
        class="flex justify-around items-center w-100 p-3"
        enctype="multipart/form-data"
      >
        <input
          class="w-2/3 p-0.5 outline-blue outline-none rounded bg-gray-200 focus:bg-white"
          type="text"
          placeholder="Écrivez un commentaire ici..."
          v-model="comInput"
          maxlength="255"
        />
        <button
          @click.prevent="sendComment()"
          class="bg-blue-700 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm"
        >
          Envoyer
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import CommentList from "./CommentList.vue";
export default {
  components: { CommentList },
  name: "CommentModal",
  data() {
    return {
      comInput: null,
      allComments: [],
      noComment: false,
    };
  },
  props: ["postObjectId"],
  mounted() {
    this.getComments();
    /* Renvoi le scrolling des commentaires vers le bas */
    setTimeout(this.commentScroll, 100);
  },
  methods: {
    closeModal() {
      this.$emit("close-comments");
    },
    sendComment() {
      let data = {
        userId: this.$store.state.user.current_user.id,
        comment: this.comInput,
        postId: this.postObjectId,
      };
      let regex = ".*[^ ].*";
      if (!this.comInput) {
        return 0;
      } else if (!this.comInput.match(regex)) {
        window.alert("Votre commentaire ne contient rien!!!");
        return 0;
      } else {
        let postId = this.postObjectId;
        this.$store.dispatch("post/createComment", data).then((response) => {
          this.comInput = null;
          this.$emit("update-comments");
          console.log(response.message);
          this.getComments();
          setTimeout(this.commentScroll, 100);
          this.noComment = false;
        });
      }
    },
    getComments() {
      let postId = this.postObjectId;
      this.$store.dispatch("post/getComments", postId).then((comments) => {
        if (comments.length === 0) {
          return (this.noComment = true);
        } else {
          return (this.allComments = comments);
        }
      });
    },
    decreaseCommentNumber() {
      this.$emit("decrease-comment");
    },
    commentScroll() {
      document
        .querySelector("#commentScroll")
        .scrollTo(0, document.querySelector("#commentScroll").scrollHeight);
    },
  },
};
</script>
<style scoped>
.dark-bg {
  background-color: rgb(36, 37, 38);
}
.darkborder {
  border: solid rgb(48, 49, 50) 2px;
}
.my-blue {
  color: rgb(45, 136, 255);
}
.my-gray {
  color: rgb(150, 151, 152);
}
.preview {
  background-size: cover;
  background-position: center center;
}
.outline-blue:focus {
  outline-color: rgb(45, 136, 255);
  outline-style: groove;
}
</style>