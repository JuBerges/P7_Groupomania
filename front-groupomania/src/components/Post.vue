<template>
  <div class="mt-6">
    <div class="max-w-4xl mx-auto p-4 darkpost rounded-lg shadow-md">
      <div class="flex justify-between items-center">
        <span class="font-light text-gray-200">Jun 1, 2020</span>
      </div>
      <div class="mt-2">
        <a href="#" class="text-2xl text-white font-bold hover:underline"
          >Océane est un peu casse bonbon.</a
        >
        <p class="mt-2 text-gray-200">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
          expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos
          enim reprehenderit nisi, accusamus delectus nihil quis facere in modi
          ratione libero!
        </p>
        <img src="" alt="" />
      </div>
      <div class="flex justify-between items-center mt-4">
        <a href="#" class="text-blue-500 hover:underline">Voir plus</a>
        <div>
          <a href="#" class="flex items-center"
            ><img
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80"
              alt="avatar"
              class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            />
            <h1 class="text-gray-200 font-bold hover:underline">Alex John</h1>
          </a>
        </div>
      </div>
    </div>
  </div>
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
</style>