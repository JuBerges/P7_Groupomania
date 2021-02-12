<template>
  <article class="mb-5 lg:mx-10">
    <div class="mx-auto p-4 dark-bg rounded-lg shadow-md darkborder">
      <div
        id="postInfos"
        class="flex justify-between p-2 darkborder rounded-lg"
      >
        <span class="text-gray-400 font-bold text-sm pt-1.5"
          >Publié le {{ convertDate(postDate) }}</span
        >
        <span class="flex items-center">
          <p class="text-white font-bold pr-2">{{ postUsername }}</p>
          <div
            title="image d'avatar du créateur de ce post"
            class="w-8 h-8 rounded-full preview blueborder-mini"
            :style="{ 'background-image': `url(${postUserImg})` }"
          ></div>
        </span>
      </div>
      <div class="my-2 flex flex-col items-center darkborder rounded-lg p-2">
        <div class="flex">
          <h2 href="#" class="text-xl my-blue uppercase font-extrabold">
            {{ postTitle }}
          </h2>
          <svg
            v-if="ownerOrAdmin"
            @click="toggleUpdate = true"
            class="w-6 flex-shrink-0 pb-1 cursor-pointer pl-2 text-gray-400 hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <title>Icône de crayon</title>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
        <!-- modal de mofif publications -->
        <div v-if="toggleUpdate" class="fixed z-10 inset-0 overflow-y-auto">
          <div
            class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
          >
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div
                class="absolute inset-0 bg-gray-500 opacity-75"
                @click="toggleUpdate = false"
              ></div>
            </div>
            <span
              class="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
              >&#8203;</span
            >
            <div
              class="inline-block align-bottom bg-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div class="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div>
                  <div
                    class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mb-2 sm:h-10 sm:w-10"
                  >
                    <!-- Heroicon name: plus sign -->
                    <svg
                      class="h-6 w-6 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <title>Icône de crayon</title>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      class="text-2xl sm:text-center leading-6 font-medium text-white uppercase"
                      id="modal-headline"
                    >
                      Modifier la publication
                    </h3>
                    <form
                      action="javascript:void(0);"
                      class="flex flex-col sm:text-center"
                      method="post"
                      enctype="multipart/form-data"
                    >
                      <label class="pt-2 text-white" for="postTitle"
                        >Choisissez un titre:
                      </label>
                      <input
                        id="postTitle"
                        maxlength="55"
                        class="text-black p-1 placeholder-gray-500 border rounded-md"
                        placeholder="Titre de votre publication"
                        type="text"
                        v-model="title"
                        :v-model="title"
                      />
                      <p class="text-gray-400 text-xs pt-1">
                        Maximum 55 caratères.
                      </p>

                      <label class="pt-2 text-white" for="content"
                        >Votre message(falcultatif):</label
                      >
                      <textarea
                        class="resize-y border rounded-md"
                        name="content"
                        id="content"
                        cols="30"
                        rows="5"
                        v-model="content"
                        placeholder="Le texte de votre message(facultatif)..."
                        :v-model="content"
                      ></textarea>
                      <p class="text-gray-400 text-xs pt-1">
                        Vous pouvez modifier la hauteur de ce champs dans le
                        coin inférieur droit.
                      </p>
                      <span class="pt-2 text-white">Image à ajouter:</span>
                      <label
                        for="file-upload"
                        class="cursor-pointer font-medium my-blue hover:underline"
                      >
                        Cliquer ici
                      </label>
                      <input
                        id="file-upload"
                        name="image"
                        type="file"
                        ref="fileInput"
                        class="sr-only"
                        @input="onSelectFile"
                      />
                      <p class="text-gray-400 text-xs pb-2">
                        jpg, jpeg, png ou gif.
                      </p>
                      <div
                        v-if="modFile"
                        class="w-full h-60 mx-auto cursor-pointer bg-contain bg-center bg-no-repeat"
                        :style="{ 'background-image': `url(${modFile})` }"
                        @click.prevent="chooseImage"
                      ></div>
                      <div
                        class="bg-black px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:mx-auto"
                      >
                        <div v-if="messages.length">
                          <ul>
                            <li
                              :key="message"
                              v-for="message in messages"
                              class="text-center text-red-600 sm:pl-2"
                            >
                              {{ message }}
                            </li>
                          </ul>
                        </div>
                        <button
                          @click.prevent="postUpdate()"
                          type="button"
                          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Mettre à jour
                        </button>
                        <button
                          @click.prevent="toggleUpdate = false"
                          type="button"
                          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Annuler
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full text-white my-4 p-2" v-if="postContent">
          <p :class="{ truncate: !toggleText }" v-if="postContent">
            {{ postContent }}
          </p>
          <button
            v-if="!toggleText"
            @click="toggleText = true"
            class="text-xs my-blue"
          >
            Voir plus
          </button>
          <button
            v-else
            class="text-xs my-blue"
            @click="toggleText = !toggleText"
            :aria-pressed="toggleText ? 'true' : 'false'"
          >
            Voir moins
          </button>
        </div>
        <div class="mx-auto w-full my-2">
          <img :src="postImage" alt="Image de la publication" class="mx-auto" />
        </div>
      </div>
      <div class="flex justify-between darkborder rounded-lg p-2">
        <div
          class="flex text-gray-400 cursor-pointer"
          @click="toggleComments = true"
        >
          <span class="font-bold text-sm hover:text-white">
            <!-- Icône commentaires -->
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Icône commentaires</title>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg> </span
          ><span class="pl-1">{{ howManyComments }}</span>
        </div>
        <!--Modal pour les commentaires-->
        <comment-modal
          @decrease-comment="howManyComments--"
          @update-comments="howManyComments++"
          v-if="toggleComments"
          @close-comments="toggleComments = false"
          :postObjectId="postObject.id"
        ></comment-modal>
        <!-- Icone corbeille pour suppression -->
        <div v-if="ownerOrAdmin" class="flex">
          <svg
            @click="toggleDelete = true"
            class="h-6 w-6 text-gray-400 hover:text-white cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <title>Suppression de la publication</title>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <!-- Modal pour la suppression de la publication -->
          <div v-if="toggleDelete" class="fixed z-10 inset-0 overflow-y-auto">
            <div
              class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            >
              <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                class="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
                >&#8203;</span
              >
              <div
                class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div class="dark-bg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        class="text-lg leading-6 font-medium text-white"
                        id="modal-headline"
                      >
                        Souhaitez vous réellement supprimer cette publication ?
                      </h3>
                    </div>
                  </div>
                </div>
                <div
                  class="dark-bg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                >
                  <button
                    @click="deletePost()"
                    type="button"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Supprimer
                  </button>
                  <button
                    @click="toggleDelete = false"
                    type="button"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Bouton like inactif -->
        <div class="text-gray-400 font-bold text-sm flex">
          <div
            v-if="!toggleLike"
            @click="
              toggleLike = true;
              likePost();
            "
          >
            <svg
              class="h-6 w-6 text-gray-400 hover:text-white cursor-pointer"
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
          <!-- Bouton like actif -->
          <div
            v-if="toggleLike"
            @click="
              toggleLike = false;
              likePost();
            "
          >
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
          <p class="pt-1 pl-1">{{ howManyLikes }}</p>
        </div>
      </div>
      <p v-if="updated" class="my-blue text-xs pt-2 text-right">
        Mise à jour le {{ convertDate(postUpdateDate) }}
      </p>
    </div>
  </article>
</template>
<script>
import CommentModal from "./CommentModal.vue";
export default {
  components: { CommentModal },
  name: "Post",
  data() {
    return {
      toggleLike: false,
      toggleDelete: false,
      toggleText: false,
      toggleComments: false,
      toggleUpdate: false,
      ownerOrAdmin: false,
      updated: false,
      howManyLikes: 0,
      howManyComments: 0,
      /* data pour l'update d'un post */
      messages: [],
      modImage: null,
      modFile: null,
      title: null,
      content: null,
    };
  },
  props: [
    "postImage",
    "postTitle",
    "postContent",
    "postDate",
    "postUpdateDate",
    "postUsername",
    "postUserImg",
    "numberOfComments",
    "postLikes",
    "postOwner",
    "postObject",
  ],
  mounted() {
    //====> gére l'affichage de la date si mis à jour <====\\
    if (this.postUpdateDate !== this.postDate) {
      this.updated = true;
    }
    //====> Pour afficher les valeurs dans les champs de modif <====\\
    this.title = this.postTitle;
    this.content = this.postContent;
    this.modFile = this.postImage;
    //====> Pour afficher le nombre de commentaire <====\\
    this.howManyComments = this.numberOfComments;
    //====> Pour mettre à jour les likes et vérif si user a déja liké<====\\
    this.checkNumberOfLikes();
    if (this.checkIfuserAlreadyLiked()) {
      this.toggleLike = true;
    } else {
      this.toggleLike = false;
    }
    //====> Pour verif les droits de l'utilisateur<====\\
    let currentUser = this.$store.state.user.current_user;
    if (currentUser.id === this.postOwner || currentUser.role === "admin") {
      this.ownerOrAdmin = true;
    }
  },
  methods: {
    convertDate(input) {
      var date = new Date(input);
      var dateTime =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      return dateTime;
    },
    postUpdate() {
      let postId = this.postObject.id;
      let post = {
        title: this.title,
        content: this.content,
        postId: postId,
      };
      let that = this;
      let formData = new FormData();
      formData.append("post", JSON.stringify(post));
      formData.append("image", this.modImage);
      if (this.title) {
        this.$store.dispatch("post/updatePost", formData).then((response) => {
          if (response.ok) {
            console.log("Publication modifiée !");
            that.toggleUpdate = false;
            this.$emit("update-posts");
          } else {
            console.log(response);
            this.messages = [];
            this.messages.push("Une erreur est survenue ! ");
          }
        });
      } else {
        this.messages = [];
        this.messages.push("Titre requis");
      }
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
          this.modFile = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
        this.modImage = files[0];
      }
    },
    checkNumberOfLikes() {
      let postId = this.postObject.id;
      this.$store.dispatch("post/findLikes", postId).then((response) => {
        this.howManyLikes = response.length;
      });
    },
    deletePost() {
      let postId = this.postObject.id;
      this.$store.dispatch("post/deletePost", postId).then((response) => {
        this.$emit("update-posts");
        console.log(response);
      });
    },
    likePost() {
      let data = {
        userId: this.$store.state.user.current_user.id,
        postId: this.postObject.id,
      };
      this.$store.dispatch("post/handleLike", data).then((response) => {
        this.checkNumberOfLikes();
      });
    },
    checkIfuserAlreadyLiked() {
      let likes = this.postLikes;
      let currentUserId = this.$store.state.user.current_user.id;
      for (const like of likes) {
        if (like.user_id === currentUserId) {
          return 1;
        }
      }
    },
    updateCommentsNumber(payload) {
      this.howManyComments = payload;
    },
  },
};
</script>