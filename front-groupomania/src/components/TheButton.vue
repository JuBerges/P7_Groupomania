<template>
  <button
    class="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue btn-blue active:bg-blue-600 hover:bg-blue-700"
  >
    <slot name="label"><span>Envoyer</span></slot>
    <slot name="icon"></slot>
  </button>
</template>
<script>
export default {
  name: "TheButton",
};
</script>

<style scoped>
.btn-blue {
  background-color: rgb(0, 108, 250);
}
</style>