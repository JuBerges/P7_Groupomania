<template>
  <div>
    <div v-if="!signedIn">
      <signup-login @logged-in="signedIn = true"></signup-login>
    </div>
    <div v-else>
      <NavBar
        @scroll-top="scrollToTop"
        @valid-signout="signedIn = false"
      ></NavBar>
      <router-view v-slot="{ Component }">
        <transition name="slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <the-footer></the-footer>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import TheFooter from "./components/TheFooter.vue";
import SignupLogin from "./components/SignupLogin.vue";
export default {
  name: "App",
  components: { NavBar, TheFooter, SignupLogin },
  data() {
    return {
      signedIn: false,
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>
<!--Style du darkmode-->
<style>
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