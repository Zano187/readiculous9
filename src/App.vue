<template>
  <div>
  <Navbar/>
<!--  <MainLayout />-->
  <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import MainLayout from './layout/MainLayout.vue'

export default {
  components: {
    Navbar,
    // MainLayout
  }
}
</script>

