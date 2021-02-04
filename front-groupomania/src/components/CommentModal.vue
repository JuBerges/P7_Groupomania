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
          <svg
            class="h-4 w-4 my-gray"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
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
        class="p-3 h-60 overflow-scroll text-white border-t-2 border-b-2 darkborder"
      >
        <div id="comments">
          <!-- Header du commentaire -->
          <div
            id="postInfos"
            class="flex justify-center border border-gray-600 rounded-t-lg px-1"
          >
            <div class="flex items-center overflow-hidden">
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
            <p>{{ commentContent }}</p>
          </div>
          <!-- footer du commentaire -->
          <div class="flex justify-between border border-gray-600 rounded-b-lg">
            <span class="text-gray-400 font-bold text-xs pt-1 px-1">{{
              convertedDate
            }}</span
            ><span
              ><svg
                class="h-6 w-6 px-1 my-gray cursor-pointer"
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
                /></svg
            ></span>
          </div>
        </div>
      </div>
      <form
        onsubmit="sendComment()"
        class="flex justify-around items-center w-100 p-3"
      >
        <input
          class="w-2/3 p-0.5 outline-blue outline-none rounded bg-gray-200 focus:bg-white"
          type="text"
          placeholder="Écrivez un commentaire ici..."
          v-model="comInput"
          maxlength="255"
        />
        <button
          class="bg-blue-700 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm"
        >
          Envoyer
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "CommentModal",
  data() {
    return {
      comInput: null,
      commentUserImg:
        "data:image/jpeg;base64,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",
      commentUsername: "Wade",
      convertedDate: "Publié le 02/02/2021",
      commentContent:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, maiores!",
    };
  },
  props: [],
  mounted() {},
  methods: {
    closeModal() {
      this.$emit("close-comments");
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