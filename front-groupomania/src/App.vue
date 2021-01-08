<template>
  <div id="app" class="darkbody bg-cover">
    <NavBar></NavBar>
    <router-view />
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
</style>