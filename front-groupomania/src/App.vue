<template>
  <div id="app" class="darkbody bg-cover">
    <NavBar></NavBar>
    <transition name="slide" mode="out-in">
      <router-view :key="$route.path" />
    </transition>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: { NavBar },
};
</script>
<!--Style du darkmode-->
<style>
.darkbody {
  background-color: rgb(24, 25, 26);
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 200ms, transform 200ms;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>