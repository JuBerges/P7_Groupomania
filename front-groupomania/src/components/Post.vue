<template>
  <article class="my-14 lg:mx-10">
    <div class="mx-auto p-4 darkpost rounded-lg shadow-md">
      <div id="postInfos" class="flex justify-between">
        <span class="my-blue font-bold text-sm">22 Janvier 2021</span>
        <span class="flex items-center">
          <p class="my-blue font-bold">Wade</p>
          <img
            src="../assets/images/deadpoolwallpaper.jpg"
            alt="avatar"
            class="mx-4 w-8 h-8 object-cover rounded-full hidden sm:block"
          />
        </span>
      </div>
      <div class="my-2 flex flex-col items-center">
        <h2 href="#" class="text-2xl text-white uppercase font-bold">
          ENFIN!!!!!!!!!
        </h2>

        <img
          src="https://pics.me.me/holy-sheet-itworks-sheeeeeett-it-works-quickmeme-53240740.png"
          alt="image de post"
          class=""
        />
      </div>
    </div>
  </article>
</template>
<script>
export default {
  name: "Post",
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
</style>