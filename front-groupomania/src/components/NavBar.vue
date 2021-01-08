<template>
  <header id="nav" class="grid grid-cols-3 gap-1 bg-gray-800 h-20">
    <img
      class="w-40 mt-7"
      src="../assets/images/icon-left-font-monochrome-white.svg"
      alt="logo groupomania"
    />
    <router-link class="text-white h-8 mt-5 w-8" to="/"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>Accueil</title>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        /></svg
    ></router-link>
    <router-link class="text-white mt-7" to="/about">FAQ</router-link>
  </header>
</template>

<script>
export default {
  name: "NavBar",
  props: {},
};
</script>
