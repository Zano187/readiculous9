<template>
  <div class="layout">
<nav class="navbar">
<!-- Left side: Dropdown -->
<div class="dropdown">
  <button class="dropbtn">☰ Menu</button>
  <div class="dropdown-content">
    <router-link v-if="!user" to="/login">Login</router-link>
    <a v-if="user" @click="logout">Logout</a>
    <router-link v-if="user" to="/profile">Profile</router-link>
    <router-link
        v-if="user && myClubId"
        :to="`/club/${myClubId}/admin`"
    >
      Admin
    </router-link>
  </div>
</div>

<!-- Right side: Links + Logo -->
<div class="right-section">
  <div class="nav-links">
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link to="/book" class="nav-link">Book</router-link>
    <router-link to="/adminBook" class="nav-link">Admin book</router-link>
    <router-link to="/library" class="nav-link">Library</router-link>
    <router-link to="/contact" class="nav-link">Contact</router-link>
    <router-link to="/about" class="nav-link">About</router-link>
    <router-link v-if="user" to="/create-club" class="nav-link">Create Club</router-link>
  </div>
  <div class="logo-container">
    <img src="@/assets/logo.jpeg" alt="Logo" class="logo" />
  </div>
</div>
</nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const user = JSON.parse(localStorage.getItem("user"));
const myClubId = ref(null);

onMounted(async () => {
  if (user) {
    try {
      // Fetch clubs and check if this user is a creator
      const res = await axios.get("http://localhost:3000/api/book-club/all");
      const myClub = res.data.find(club => club.userId === user.userId);
      if (myClub) {
        myClubId.value = myClub.clubId;
      }
    } catch (err) {
      console.error("Error loading clubs:", err);
    }
  }
});

function logout() {
  localStorage.removeItem("user");
  router.push("/login");
  window.location.reload(); // optional: force refresh navbar state
}
</script>

<style scoped>
/* Navbar container */
.navbar {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 1rem 1.5rem;
  border-bottom: 3px solid #00cc66;
  z-index: 1000;
}

/* Right section groups links + logo */
.right-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* Logo styles */
.logo-container .logo {
  max-width: 120px;
  height: auto;
  display: block;
  border: 2px solid #00cc66;
  border-radius: 8px;
  background-color: white;
}

/* Navbar links */
.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: black;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid #00cc66;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #00cc66;
  color: white;
}

/* Dropdown */
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

.dropdown-content a,
.dropdown-content router-link {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-weight: 500;
}

.dropdown-content a:hover,
.dropdown-content router-link:hover {
  background-color: #00cc66;
  color: white;
  font-weight: bold;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>