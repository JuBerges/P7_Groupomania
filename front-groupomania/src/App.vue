<template>
  <div id="app" class="darkbody bg-cover">
    <NavBar @scroll-top="scrollToTop"></NavBar>
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <the-footer></the-footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import TheFooter from "./components/TheFooter.vue";
export default {
  name: "App",
  components: { NavBar, TheFooter },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
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