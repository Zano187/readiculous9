<template>
  <div class="layout">
<!--    <Header />-->


    <main class="main-content">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'

</script>

<style scoped>
.layout {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #111;
  overflow: hidden;
}

/* Background image with blur */
.layout::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/background.jpeg"); /* Your image */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  filter: blur(8px); /* Apply blur */
  z-index: -1; /* Push behind content */
}

.main-content {
  flex: 1;
  padding: 30px 20px;
  max-width: 1600px; /* was 1200px */
  margin: 0 auto;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  margin-top: 90px;
}


</style>
