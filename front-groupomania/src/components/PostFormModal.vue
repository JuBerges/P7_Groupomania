<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
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
              <!-- Heroicon name: exclamation -->
              <svg
                class="h-6 w-6 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Icône point d'excalmation</title>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                class="text-2xl sm:text-center leading-6 font-medium text-white uppercase"
                id="modal-headline"
              >
                Poster une image
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
                />
                <p class="text-gray-400 text-xs pt-1">Maximum 55 caratères.</p>

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
                ></textarea>

                <span class="pt-2 text-white">Image à ajouter:</span>
                <label
                  for="file-upload"
                  class="cursor-pointer font-medium blue-text hover:underline"
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
                <p class="text-gray-400 text-xs pb-2">jpg, jpeg, png ou gif.</p>
                <div
                  v-if="file"
                  class="w-full h-60 mx-auto cursor-pointer bg-contain bg-center bg-no-repeat"
                  :style="{ 'background-image': `url(${file})` }"
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
                    @click.prevent="postForm"
                    type="button"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Poster
                  </button>
                  <button
                    @click.prevent="cancelPost"
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
</template>
<script>
export default {
  name: "PostFormModal",
  data() {
    return {
      file: null,
      postImage: null,
      title: null,
      content: null,
      messages: [],
    };
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.file = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
        this.postImage = files[0];
      }
    },
    cancelPost() {
      this.$emit("cancel-post");
    },
    postForm() {
      let post = {
        userId: this.$store.state.user.current_user.id,
        title: this.title,
        content: this.content,
      };
      let that = this;
      let formData = new FormData();
      formData.append("post", JSON.stringify(post));
      formData.append("image", this.postImage);
      if (this.postImage && this.title) {
        this.$store.dispatch("post/createPost", formData).then((response) => {
          if (response.ok) {
            console.log("Publication enregistrée !");
            this.$store.dispatch("user/getCurrentUser");
            that.$emit("update-post");
          } else {
            console.log(response);
            this.messages = [];
            this.messages.push("Une erreur est survenue ! ");
          }
        });
      } else {
        this.messages = [];
        this.messages.push("Titre et image requis ! ");
      }
    },
  },
};
</script>
<style scoped>
.blue-text {
  color: rgb(45, 136, 255);
}
</style>