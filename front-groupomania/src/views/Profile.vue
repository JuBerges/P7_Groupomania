<template>
  <div class="profile pt-14 mb-11">
    <delete-account
      v-if="displayModal"
      @cancel-delete="displayModal = false"
      @valid-delete="validDelete"
    ></delete-account>
    <div
      title="image d'avatar de l'utilisateur"
      v-if="avatar"
      class="w-40 h-40 md:h-60 md:w-60 mt-5 rounded-full mx-auto preview"
      :style="{ 'background-image': `url(${avatar})` }"
    ></div>
    <form
      id="changeAvatar"
      class="text-center mt-2"
      enctype="multipart/form-data"
    >
      <label
        for="file-upload"
        class="cursor-pointer font-medium text-second-color hover:underline"
      >
        Cliquez ici pour changer d'avatar
      </label>
      <input
        id="file-upload"
        name="image"
        type="file"
        ref="fileInput"
        class="sr-only"
        @input="onSelectFile"
      />
    </form>
    <div
      class="text-white text-3xl md:text-4xl font-bold text-center mt-4"
      v-if="username"
    >
      {{ username }}
    </div>
    <div
      class="text-white text-xl md:text-2xl font-bold text-center mt-4 mx-3"
      v-if="email"
    >
      {{ email }}
    </div>
    <div v-if="messages.length">
      <ul>
        <li
          :key="message"
          v-for="message in messages"
          class="text-center text-second-color"
        >
          {{ message }}
        </li>
      </ul>
    </div>
    <div class="flex justify-center flex-col items-center">
      <button
        @click="updateUser"
        type="button"
        class="mt-6 mx-10 rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:w-auto sm:text-sm"
      >
        Valider le changement
      </button>
      <button
        v-if="!isAdmin"
        @click="deleteUser"
        type="button"
        class="mt-2 mx-6 rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:w-auto sm:text-sm"
      >
        Supprimer mon compte
      </button>
    </div>
    <div v-if="allPosts.length" class="mt-6">
      <h3
        class="text-white text-2xl text-center p-4 font-bold darkborder darkpost rounded-lg mb-2 sm:w-2/3 sm:mx-auto mx-2 uppercase"
      >
        Vos publications
      </h3>
      <div class="sm:mb-24 mx-2 sm:w-2/3 sm:mx-auto">
        <post
          @update-posts="updatePost()"
          :key="post"
          v-for="post in allPosts"
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
  </div>
</template>

<script>
import DeleteAccount from "../components/DeleteAccount.vue";
import Post from "../components/Post.vue";

export default {
  name: "Profile",
  components: { DeleteAccount, Post },
  data() {
    return {
      isAdmin: false,
      username: null,
      email: null,
      avatar: null,
      newAvatar: null,
      currentUser: null,
      displayModal: false,
      messages: [],
      allPosts: [],
    };
  },
  async mounted() {
    this.updatePost();
    //====> Gére l'affichage des données de l'utilisateur connecté
    let currentUser = this.$store.state.user.current_user;
    this.avatar = currentUser.avatar;
    this.username = currentUser.username;
    this.email = currentUser.email;
    if (currentUser.role === "admin") {
      this.isAdmin = true;
    }
  },
  methods: {
    updatePost() {
      let userId = this.$store.state.user.current_user.id;
      this.$store.dispatch("post/getUserPosts", userId).then((posts) => {
        this.allPosts = posts;
      });
    },
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatar = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
        this.avatar = files[0];
        this.newAvatar = files[0];
      }
    },
    updateUser() {
      let that = this;
      if (this.newAvatar) {
        let formData = new FormData();
        formData.append("image", this.newAvatar);
        this.$store
          .dispatch("user/modifyCurrentUser", formData)
          .then((response) => {
            if (response.ok) {
              console.log("Avatar modifié !");
              that.messages = [];
              that.messages.push("Changement effectué !");
              this.$store.dispatch("user/getCurrentUser");
            } else {
              console.log(response);
            }
          });
      } else {
        this.messages = [];
        this.messages.push("Il n'y a rien à valider!");
      }
    },
    deleteUser() {
      this.displayModal = true;
    },
    validDelete() {
      this.$emit("valid-signout");
    },
  },
};
</script>
<style scoped>
.preview {
  background-size: cover;
  background-position: center center;
}
.text-second-color {
  color: rgb(45, 136, 255);
}
.darkborder {
  border: solid rgb(48, 49, 50) 2px;
}
.darkpost {
  background-color: rgb(36, 37, 38);
}
</style>