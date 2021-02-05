<template>
  <div id="comments" class="my-2">
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
      <p class="p-2 text-sm">" {{ commentContent }} "</p>
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
</template>
<script>
export default {
  name: "CommentList",
  data() {
    return {
      convertedDate: null,
    };
  },
  mounted() {
    //====> Pour convertir la date<====\\
    var date = new Date(this.commentDate);
    var dateTime =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    this.convertedDate = dateTime;
  },
  props: ["commentUserImg", "commentUsername", "commentDate", "commentContent"],
};
</script>
<style scoped>
.preview {
  background-size: cover;
  background-position: center center;
}
</style>