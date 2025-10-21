<template>
  <div class="profile-page" v-if="user">
    <!-- User Account Info -->
    <section class="profile-card">
      <div class="avatar-container">
        <img
            v-if="previewImage || user.avatar"
            :src="previewImage || user.avatar"
            alt="Profile Picture"
            class="avatar"
        />
        <input type="file" accept="image/*" @change="handleFileUpload" />
      </div>

      <div class="info">
        <input v-model="user.name" placeholder="First Name" />
        <input v-model="user.lastName" placeholder="Last Name" />
        <input v-model="user.email" placeholder="Email" />
      </div>
    </section>

    <!-- Preferences (Read-Only) -->
    <section class="preferences-card">
      <h2>📚 My Reading Preferences</h2>
      <p><strong>Favorite Genre:</strong> {{ preferences.genre }}</p>
      <p><strong>Reading Frequency:</strong> {{ preferences.frequency }}</p>
      <p><strong>Preferred Format:</strong> {{ preferences.format }}</p>
    </section>

    <!-- Actions -->
    <div class="actions">
      <button @click="saveProfile">💾 Save Profile</button>

    </div>
  </div>

  <div v-else class="loading">
    <p>Loading profile...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const user = ref(null);
const preferences = ref({ genre: "", frequency: "", format: "" });
const previewImage = ref(null);

// Load preferences from localStorage
const localPreferences = JSON.parse(localStorage.getItem("preferences"));
if (localPreferences) {
  preferences.value = localPreferences;
}

// Get logged-in user info from localStorage (for auth only, no profile data)
const loggedInUser = JSON.parse(localStorage.getItem("user"));
if (!loggedInUser) {
  alert("You must be logged in to view your profile.");
  router.push("/login");
}

// Fetch user data from database
onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/User/read/${loggedInUser.userId}`);
    user.value = response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    alert("Failed to load profile.");
  }
});

// Handle avatar upload and preview
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    previewImage.value = URL.createObjectURL(file);
    const reader = new FileReader();
    reader.onload = () => {
      user.value.avatar = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

// Save profile (name, lastName, email, avatar)
async function saveProfile() {
  try {
    const payload = {
      userId: user.value.userId,
      name: user.value.name,
      lastName: user.value.lastName,
      email: user.value.email,
      password: user.value.password,
      avatar: user.value.avatar
    };

    await axios.put("http://localhost:8080/api/User/update", payload);
    alert("✅ Profile updated successfully!");
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("❌ Failed to update profile.");
  }
}

// Navigate to preference page
function goToPreferences() {
  router.push({ name: "preference" });
}
</script>

<style scoped>
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.profile-page {
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

.profile-card, .preferences-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
}

input {
  display: block;
  margin: 0.5rem auto;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  width: 90%;
}

.preferences-card p {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.actions button {
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  background: #42b883;
  color: white;
  font-weight: bold;
  transition: background 0.3s;
}

.actions button:hover {
  background: #2c8a68;
}
</style>
