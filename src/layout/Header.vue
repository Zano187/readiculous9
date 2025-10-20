<template>
  <header class="custom-header">
    <!-- Dropdown Menu -->
    <div class="dropdown" v-if="$route.path !== '/' && $route.path !== '/login'">
      <button class="dropbtn">☰ Account</button>
      <div class="dropdown-content">
        <ul>
          <li><router-link to="/book">Book</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/" @click.prevent="logout">Logout</router-link></li>
          <li><router-link to="/preference">Preference</router-link></li>
          <li><router-link to="/library">Library</router-link></li>
          <li><router-link to="/create-club">Create Club</router-link></li>
          <li><router-link to="/Profile">Profile</router-link></li>
          <li><router-link to="/club/1/admin">Admin Page</router-link></li>
          <li><router-link to="/UserBook">User Book</router-link></li>
          <li><router-link to="/Discussion">Discussion</router-link></li>
        </ul>
      </div>
    </div>

    <!-- Right: Logo -->
    <div class="logo-container">
      <img src="@/assets/logo.jpeg" alt="Logo" class="logo" />
    </div>

    <!-- Floating Contact Info Component -->
    <ContactInfo />
  </header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push({ name: "Login" });
}
</script>

<style scoped>
/* Header container */
.custom-header {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 16px 24px;
  border-bottom: 3px solid #00cc66;
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
  background-color: white;
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
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
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
</style>
