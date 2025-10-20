<!--<template>-->
<!--  <header class="custom-header">-->

<!--    <div class="dropdown" v-if="$route.path !== '/' && $route.path !== '/login'">-->
<!--      <button class="dropbtn">☰ Account</button>-->
<!--      <div class="dropdown-content">-->
<!--        <ul>-->
<!--          <li><router-link to="/book">Book</router-link></li>-->
<!--          <li><router-link to="/login">Login</router-link></li>-->
<!--          <li><router-link to="/" @click.prevent="logout">Logout</router-link></li>-->
<!--          <li><router-link to="/preference">Preference</router-link></li>-->
<!--          <li><router-link to="/library">Library</router-link></li>-->
<!--          <li><router-link to="/create-club">Create Club</router-link></li>-->
<!--          <li><router-link to="/Profile">Profile</router-link></li>-->
<!--          <li><router-link to="/club/1/admin">Admin Page</router-link></li>-->
<!--          <li><router-link to="/adminBook">Admin book</router-link></li>-->

<!--        </ul>-->
<!--      </div>-->
<!--    </div>-->


<!--    &lt;!&ndash; Right: Logo &ndash;&gt;-->
<!--    <div class="logo-container">-->
<!--      <img src="@/assets/logo.jpeg" alt="Logo" class="logo" />-->
<!--    </div>-->
<!--  </header>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { useRouter } from "vue-router";-->

<!--const router = useRouter();-->

<!--function logout() {-->
<!--  // Clear user session or tokens-->
<!--  localStorage.removeItem("token");-->
<!--  localStorage.removeItem("user");-->

<!--  // Redirect to login page-->
<!--  router.push({ name: "Login" });-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--/* Header container */-->
<!--.custom-header {-->
<!--  position: sticky;-->
<!--  top: 0;-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  background-color: white;-->
<!--  padding: 16px 24px;-->
<!--  border-bottom: 3px solid #00cc66;-->
<!--  z-index: 1000;-->
<!--}-->

<!--/* Logo styles */-->
<!--.logo-container .logo {-->
<!--  max-width: 160px;-->
<!--  height: auto;-->
<!--  display: block;-->
<!--  border: 2px solid #00cc66;-->
<!--  border-radius: 8px;-->
<!--  background-color: white;-->
<!--}-->

<!--/* Dropdown Menu */-->
<!--.dropdown {-->
<!--  position: relative;-->
<!--}-->

<!--.dropbtn {-->
<!--  background-color: white;-->
<!--  color: black;-->
<!--  padding: 10px 16px;-->
<!--  font-size: 16px;-->
<!--  border: 2px solid #00cc66;-->
<!--  border-radius: 6px;-->
<!--  cursor: pointer;-->
<!--  font-weight: bold;-->
<!--  transition: all 0.2s ease-in-out;-->
<!--}-->

<!--.dropbtn:hover {-->
<!--  background-color: #00cc66;-->
<!--  color: white;-->
<!--}-->

<!--/* Dropdown content hidden by default */-->
<!--.dropdown-content {-->
<!--  display: none;-->
<!--  position: absolute;-->
<!--  top: 45px;-->
<!--  left: 0;-->
<!--  background-color: white;-->
<!--  min-width: 180px;-->
<!--  border-radius: 6px;-->
<!--  box-shadow: 0 8px 16px rgba(0,0,0,0.3);-->
<!--  z-index: 1;-->
<!--}-->

<!--/* Dropdown links */-->
<!--.dropdown-content a {-->
<!--  color: black;-->
<!--  padding: 12px 16px;-->
<!--  text-decoration: none;-->
<!--  display: block;-->
<!--  font-weight: 500;-->
<!--}-->

<!--.dropdown-content a:hover {-->
<!--  background-color: #00cc66;-->
<!--  color: white;-->
<!--  font-weight: bold;-->
<!--}-->

<!--/* Show dropdown on hover */-->
<!--.dropdown:hover .dropdown-content {-->
<!--  display: block;-->
<!--}-->
<!--</style>-->


<template>
  <header class="custom-header">
    <!-- Left: Dropdown Button -->
    <div class="dropdown">
      <button class="dropbtn">☰ Account</button>
      <div class="dropdown-content">
        <ul> <router-link to="/book">Book</router-link>
          <li><router-link to="/login">login</router-link></li>
          <li><router-link to="/Home">Home</router-link></li>
          <li><router-link to="/signup">signup</router-link></li>
          <li><RouterLink to="preference">preference</RouterLink></li>
          <li><router-link to="/library">Library</router-link></li>
          <li><router-link to="/join">Join</router-link></li>
          <li><router-link to="/profile">Profile</router-link></li>
          <li><router-link to="/logout">Logout</router-link></li>
        </ul>

      </div>
    </div>

    <div class="nav-links">
      <router-link to="/create-club" class="nav-link">Create Club</router-link>
      <router-link to="/club/1/admin" class="nav-link">Admin Page</router-link>
    </div>

    <!-- Right: Logo -->
    <div class="logo-container">
      <img src="@/assets/logo.jpeg" alt="Logo" class="logo" />
    </div>
  </header>
</template>

<style scoped>
/* Header container */
.custom-header {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white; /* light background */
  padding: 16px 24px;
  border-bottom: 3px solid #00cc66; /* green accent */
  z-index: 1000;
}

/* Logo styles */
.logo-container .logo {
  max-width: 160px;
  height: auto;
  display: block;
  border: 2px solid #00cc66;
  border-radius: 8px;
  background-color: white;
}

/* Dropdown Menu */
.dropdown {
  position: relative;
}

.dropbtn {
  background-color: white; /* white button */
  color: black;
  padding: 10px 16px;
  font-size: 16px;
  border: 2px solid #00cc66;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
}

.dropbtn:hover {
  background-color: #00cc66;
  color: white;
}

/* Dropdown content hidden by default */
.dropdown-content {
  display: none;
  position: absolute;
  top: 45px;
  left: 0;
  background-color: white;
  min-width: 180px;
  border-radius: 6px;
  box-shadow: 0px 8px 16px rgba(0,0,0,0.3);
  z-index: 1;
}

/* Dropdown links */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-weight: 500;
}

.dropdown-content a:hover {
  background-color: #00cc66;
  color: white;
  font-weight: bold;
}

/* Show dropdown on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white; /* Text color changed to white */
  text-decoration: none;
  font-weight: bold;
  border: 1px solid green;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #00cc66;
  color: black; /* Keep hover text black */
}
</style>
<script setup lang="ts">
</script>