<template>
  <article class="my-14 lg:mx-10">
    <div class="mx-auto p-4 darkpost rounded-lg shadow-md">
      <div id="postInfos" class="flex justify-between">
        <span class="text-gray-400 font-bold text-sm">{{ convertedDate }}</span>
        <span class="flex items-center">
          <p class="text-white font-bold">{{ postUsername }}</p>
          <div
            title="image d'avatar du créateur de ce post"
            class="w-8 h-8 mx-4 rounded-full preview"
            :style="{ 'background-image': `url(${postUserImg})` }"
          ></div>
        </span>
      </div>
      <div class="my-2 flex flex-col items-center">
        <h2 href="#" class="text-2xl text-white uppercase font-bold">
          {{ postTitle }}
        </h2>
        <div
          title="image de publication"
          class="mx-auto view-post h-60 w-full"
          :style="{ 'background-image': `url(${postImage})` }"
        ></div>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-400 font-bold text-sm cursor-pointer pt-1"
          >Commentaires: {{ numberOfComments }}</span
        >
        <div v-if="ownerOrAdmin">
          <svg
            @click="deletePost()"
            class="h-6 w-6 text-gray-400 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        <div class="text-gray-400 font-bold text-sm flex">
          <div v-if="!toggleLike" @click="toggleLike = true">
            <svg
              class="h-6 w-6 text-gray-400 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <div v-if="toggleLike" @click="toggleLike = false">
            <svg
              class="h-6 w-6 my-blue cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <p class="pt-1 pl-1">{{ numberOfLikes }}</p>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  name: "Post",
  data() {
    return {
      convertedDate: null,
      toggleLike: false,
      ownerOrAdmin: false,
    };
  },
  props: [
    "postImage",
    "postTitle",
    "postDate",
    "postUsername",
    "postUserImg",
    "numberOfLikes",
    "postComments",
    "numberOfComments",
    "postLikes",
    "postOwner",
    "postObject",
  ],
  mounted() {
    //====> Pour convertir la date<====\\
    var date = new Date(this.postDate);
    var dateTime =
      "Posté le " +
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear();
    this.convertedDate = dateTime;
    //====> Pour verif les droits de l'utilisateur<====\\
    let currentUser = this.$store.state.user.current_user;
    if (currentUser.id === this.postOwner || currentUser.role === "admin") {
      this.ownerOrAdmin = true;
    }
  },
  methods: {
    deletePost() {
      let postId = this.postObject.id;
      this.$store.dispatch("post/deletePost", postId).then((response) => {
        this.$emit("update-posts");
        console.log(response);
      });
    },
  },
};
</script>

<style scoped>
.darkpost {
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
.view-post {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>