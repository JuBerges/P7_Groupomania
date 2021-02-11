<template>
  <div id="comments" class="my-2">
    <!-- Header du commentaire -->
    <div
      id="postInfos"
      class="flex justify-center border border-gray-600 rounded-t-lg px-1"
    >
      <div class="flex items-center overflow-hidden p-1">
        <p class="text-white text-sm font-bold truncate">
          {{ commentUsername }}
        </p>
        <div
          title="image d'avatar de l'auteur de ce commentaire"
          class="w-5 h-5 mx-4 rounded-full preview"
          :style="{ 'background-image': `url(${commentUserImg})` }"
        ></div>
      </div>
    </div>
    <!-- Body du commentaire -->
    <div id="commentBody" class="border-l border-r border-gray-600 px-1">
      <p class="p-2 text-sm">" {{ commentContent }} "</p>
    </div>
    <!-- footer du commentaire -->
    <div class="flex justify-between border border-gray-600 rounded-b-lg">
      <span class="text-gray-400 font-bold text-xs pt-1 px-1">{{
        convertedDate
      }}</span
      ><span v-if="ownerOrAdmin" class="flex">
        <!-- Icône de corbeille -->
        <svg
          @click="displayDeleteValidation = true"
          class="h-6 w-6 px-1 my-gray cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Icône de suppression de commentaire</title>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <!-- Icône d'annulation -->
        <svg
          v-if="displayDeleteValidation"
          @click="displayDeleteValidation = false"
          class="h-6 w-6 px-1 text-red-800 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Icône d'annulation de suppression</title>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <!-- Icônes de validation -->
        <svg
          v-if="displayDeleteValidation"
          @click="deleteComment()"
          class="h-6 w-6 px-1 my-blue cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Icône de validation de suppression</title>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          /></svg
      ></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "CommentList",
  data() {
    return {
      convertedDate: null,
      ownerOrAdmin: false,
      displayDeleteValidation: false,
    };
  },
  props: [
    "commentUserImg",
    "commentUsername",
    "commentDate",
    "commentContent",
    "commentId",
    "commentUser",
  ],
  mounted() {
    //====> Pour convertir la date<====\\
    var date = new Date(this.commentDate);
    var dateTime =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    this.convertedDate = dateTime;
    //====> Check si l'utilisateur est admin ou auteur du commentaire <====\\
    let currentUser = this.$store.state.user.current_user;
    if (
      currentUser.id === this.commentUser.id ||
      currentUser.role === "admin"
    ) {
      this.ownerOrAdmin = true;
    } else {
      this.ownerOrAdmin = false;
    }
  },

  methods: {
    deleteComment() {
      let commentId = this.commentId;
      this.$store.dispatch("post/deleteComment", commentId).then((response) => {
        console.log(response.message);
        this.$emit("refresh-comments");
      });
    },
  },
};
</script>