<!--<template>-->
<!--  <div class="page">-->
<!--    &lt;!&ndash; Background overlay &ndash;&gt;-->
<!--    <div class="background"></div>-->

<!--    &lt;!&ndash; Form (only shows before club is created) &ndash;&gt;-->
<!--    <div v-if="!clubCreated" class="form-box">-->
<!--      <h1>Create Book Club</h1>-->
<!--      <form @submit.prevent="createClub">-->
<!--        <label>Club Name:</label>-->
<!--        <input v-model="clubName" type="text" required />-->

<!--        <label>Description:</label>-->
<!--        <textarea v-model="description" required></textarea>-->

<!--        <button type="submit">Create Club</button>-->
<!--      </form>-->
<!--    </div>-->

<!--    &lt;!&ndash; Popup Modal (shows after club is created) &ndash;&gt;-->
<!--    <div v-else class="popup">-->
<!--      <h2>🎉 Club Created Successfully!</h2>-->
<!--      <p><strong>{{ clubName }}</strong> has been created.</p>-->
<!--      <p>Your invite link:</p>-->
<!--      <input type="text" readonly :value="inviteLink" />-->
<!--      <br />-->
<!--      <button @click="goHome">Go to Home</button>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "CreateClub",-->
<!--  data() {-->
<!--    return {-->
<!--      clubName: "",-->
<!--      description: "",-->
<!--      clubCreated: false,-->
<!--      inviteLink: ""-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    createClub() {-->
<!--      // Normally you'd get the link from backend.-->
<!--      this.clubCreated = true-->
<!--      this.inviteLink = "https://bookclubapp.com/join/ABC123"-->
<!--    },-->
<!--    goHome() {-->
<!--      this.$router.push("/") // go back home-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.page {-->
<!--  position: relative;-->
<!--  min-height: 100vh;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  color: green;-->
<!--}-->

<!--/* Background blurred image */-->
<!--.background {-->
<!--  position: absolute;-->
<!--  top: 0; left: 0;-->
<!--  width: 100%; height: 100%;-->
<!--  background: url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f') no-repeat center center/cover;-->
<!--  filter: blur(6px) brightness(0.6);-->
<!--  z-index: -1;-->
<!--}-->

<!--/* Form box */-->
<!--.form-box {-->
<!--  background: rgba(28, 26, 26, 0.85);-->
<!--  border: 2px solid green;-->
<!--  border-radius: 8px;-->
<!--  padding: 2rem;-->
<!--  width: 400px;-->
<!--  box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);-->
<!--}-->

<!--.form-box h1 {-->
<!--  margin-bottom: 1rem;-->
<!--  text-align: center;-->
<!--}-->

<!--textarea, input {-->
<!--  width: 100%;-->
<!--  padding: 0.5rem;-->
<!--  margin-top: 0.4rem;-->
<!--  border: 1px solid green;-->
<!--  border-radius: 10px;-->
<!--  background: black;-->
<!--  color: white;-->
<!--}-->

<!--button {-->
<!--  margin: 1rem auto 0;-->
<!--  display: block;-->
<!--  width: 50%;-->
<!--  background: black;-->
<!--  border: 2px solid green;-->
<!--  border-radius: 10px;-->
<!--  color: green;-->
<!--  padding: 0.6rem;-->
<!--  font-weight: bold;-->
<!--  cursor: pointer;-->
<!--  transition: 0.3s;-->
<!--}-->

<!--button:hover {-->
<!--  background: green;-->
<!--  color: black;-->
<!--}-->

<!--/* Popup modal */-->
<!--.popup {-->
<!--  background: rgba(0, 0, 0, 0.95);-->
<!--  border: 2px solid green;-->
<!--  border-radius: 8px;-->
<!--  padding: 2rem;-->
<!--  width: 400px;-->
<!--  text-align: center;-->
<!--  box-shadow: 0 0 20px rgba(0, 255, 0, 0.6);-->
<!--}-->

<!--.popup input {-->
<!--  margin-top: 1rem;-->
<!--  width: 100%;-->
<!--  padding: 0.5rem;-->
<!--  border: 1px solid green;-->
<!--  background: black;-->
<!--  color: white;-->
<!--}-->
<!--</style>-->


<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;  <div class="page">&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash; Background overlay &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="background"></div>&ndash;&gt;-->

<!--&lt;!&ndash;    &lt;!&ndash; Form (only shows before club is created) &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-if="!clubCreated" class="form-box">&ndash;&gt;-->
<!--&lt;!&ndash;      <h1>Create Book Club</h1>&ndash;&gt;-->
<!--&lt;!&ndash;      <form @submit.prevent="createClub">&ndash;&gt;-->
<!--&lt;!&ndash;        <label>Club Name:</label>&ndash;&gt;-->
<!--&lt;!&ndash;        <input v-model="clubName" type="text" required />&ndash;&gt;-->

<!--&lt;!&ndash;        <label>Description:</label>&ndash;&gt;-->
<!--&lt;!&ndash;        <textarea v-model="description" required></textarea>&ndash;&gt;-->

<!--&lt;!&ndash;        <button type="submit">Create Club</button>&ndash;&gt;-->
<!--&lt;!&ndash;      </form>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->

<!--&lt;!&ndash;    &lt;!&ndash; Popup Modal (shows after club is created) &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else class="popup">&ndash;&gt;-->
<!--&lt;!&ndash;      <h2>🎉 Club Created Successfully!</h2>&ndash;&gt;-->
<!--&lt;!&ndash;      <p><strong>{{ clubName }}</strong> has been created.</p>&ndash;&gt;-->
<!--&lt;!&ndash;      <p>Your invite link:</p>&ndash;&gt;-->
<!--&lt;!&ndash;      <input type="text" readonly :value="inviteLink" />&ndash;&gt;-->
<!--&lt;!&ndash;      <br />&ndash;&gt;-->
<!--&lt;!&ndash;      <button @click="goHome">Go to Home</button>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->

<!--<template>-->
<!--      <div class="page">-->
<!--      &lt;!&ndash; Background overlay &ndash;&gt;-->
<!--      <div class="background"></div>-->

<!--  <div>-->
<!--    <h1>Create Club</h1>-->
<!--    <form @submit.prevent="createClub">-->
<!--      <input v-model="clubName" type="text" placeholder="Club name" />-->
<!--      <textarea v-model="clubDescription" placeholder="Club description"></textarea>-->
<!--      <button type="submit">Create</button>-->
<!--    </form>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->

<!--  import { ref } from "vue";-->
<!--  import axios from "axios";-->
<!--  import { useRouter } from "vue-router";-->

<!--  const clubName = ref("");-->
<!--  const clubDescription = ref("");-->
<!--  const router = useRouter();-->

<!--  function createClub() {-->
<!--  const user = JSON.parse(localStorage.getItem("user"));-->
<!--  if (!user) {-->
<!--    alert("You must be logged in");-->
<!--    return;-->
<!--  }-->

<!--  axios.post("http://localhost:8080/club/create", {-->
<!--    clubName: clubName.value,-->
<!--    clubDescription: clubDescription.value,-->
<!--    userId: user.userId-->
<!--  })-->
<!--      .then(() => {-->
<!--        alert("Club created!");-->
<!--        router.push("/admin");-->
<!--      })-->
<!--      .catch(err => console.error("Error creating club", err));-->
<!--}-->

<!--    // name: "CreateClub",-->
<!--    // data() {-->
<!--    //   return {-->
<!--    //     clubName: "",-->
<!--    //     description: "",-->
<!--    //     clubCreated: false,-->
<!--    //     inviteLink: ""-->
<!--    //   }-->
<!--    // },-->
<!--    // methods: {-->
<!--    //   async createClub() {-->
<!--    //     try {-->
<!--    //       const response = await fetch("http://localhost:3000/backend-readiculous/book-club/create", {-->
<!--    //         method: "POST",-->
<!--    //         headers: {-->
<!--    //           "Content-Type": "application/json"-->
<!--    //         },-->
<!--    //         body: JSON.stringify({-->
<!--    //           clubName: this.clubName,-->
<!--    //           description: this.description-->
<!--    //         })-->
<!--    //       });-->
<!--    //-->
<!--    //       if (!response.ok) {-->
<!--    //         throw new Error("Failed to create club");-->
<!--    //       }-->
<!--    //-->
<!--    //       const data = await response.json();-->
<!--    //       console.log("✅ Club created:", data);-->
<!--    //-->
<!--    //       this.clubCreated = true;-->
<!--    //       // For demo: generate invite link with the clubId returned-->
<!--    //       this.inviteLink = `http://localhost:8080/bookclub/read/${data.clubId}`;-->
<!--    //     } catch (error) {-->
<!--    //       console.error("❌ Error creating club:", error);-->
<!--    //     }-->
<!--    //   },-->
<!--    //   goHome() {-->
<!--    //     this.$router.push("/")-->
<!--    //   }-->
<!--    // }-->


<!--</script>-->

<!--<style scoped>-->
<!--.page {-->
<!--  position: relative;-->
<!--  min-height: 100vh;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  color: green;-->
<!--}-->

<!--/* Background blurred image */-->
<!--.background {-->
<!--  position: absolute;-->
<!--  top: 0; left: 0;-->
<!--  width: 100%; height: 100%;-->
<!--  background: url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f') no-repeat center center/cover;-->
<!--  filter: blur(6px) brightness(0.6);-->
<!--  z-index: -1;-->
<!--}-->

<!--/* Form box */-->
<!--.form-box {-->
<!--  background: rgba(28, 26, 26, 0.85);-->
<!--  border: 2px solid green;-->
<!--  border-radius: 8px;-->
<!--  padding: 2rem;-->
<!--  width: 400px;-->
<!--  box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);-->
<!--}-->

<!--.form-box h1 {-->
<!--  margin-bottom: 1rem;-->
<!--  text-align: center;-->
<!--}-->

<!--textarea, input {-->
<!--  width: 100%;-->
<!--  padding: 0.5rem;-->
<!--  margin-top: 0.4rem;-->
<!--  border: 1px solid green;-->
<!--  border-radius: 10px;-->
<!--  background: black;-->
<!--  color: white;-->
<!--}-->

<!--button {-->
<!--  margin: 1rem auto 0;-->
<!--  display: block;-->
<!--  width: 50%;-->
<!--  background: black;-->
<!--  border: 2px solid green;-->
<!--  border-radius: 10px;-->
<!--  color: green;-->
<!--  padding: 0.6rem;-->
<!--  font-weight: bold;-->
<!--  cursor: pointer;-->
<!--  transition: 0.3s;-->
<!--}-->

<!--button:hover {-->
<!--  background: green;-->
<!--  color: black;-->
<!--}-->

<!--/* Popup modal */-->
<!--.popup {-->
<!--  background: rgba(0, 0, 0, 0.95);-->
<!--  border: 2px solid green;-->
<!--  border-radius: 8px;-->
<!--  padding: 2rem;-->
<!--  width: 400px;-->
<!--  text-align: center;-->
<!--  box-shadow: 0 0 20px rgba(0, 255, 0, 0.6);-->
<!--}-->

<!--.popup input {-->
<!--  margin-top: 1rem;-->
<!--  width: 100%;-->
<!--  padding: 0.5rem;-->
<!--  border: 1px solid green;-->
<!--  background: black;-->
<!--  color: white;-->
<!--}-->
<!--</style>-->


<template>
  <div class="page">
    <!-- Background overlay -->
    <div class="background"></div>

    <!-- Form (only shows before club is created) -->
    <div v-if="!clubCreated" class="form-box">
      <h1>Create Book Club</h1>
      <form @submit.prevent="createClub">
        <label>Club Name:</label>
        <input v-model="clubName" type="text" required />

        <label>Description:</label>
        <textarea v-model="clubDescription" required></textarea>

        <button type="submit">Create Club</button>
      </form>
    </div>

    <!-- Popup Modal (shows after club is created) -->
    <div v-else class="popup">
      <h2>🎉 Club Created Successfully!</h2>
      <p><strong>{{ clubName }}</strong> has been created.</p>
      <p>Your invite link:</p>
      <input type="text" readonly :value="inviteLink" />
      <br />
      <button @click="goToAdmin">Go to Admin Page</button>
    </div>
  </div>
</template>

<!--<script setup>-->
<!--import { ref } from "vue";-->
<!--import axios from "axios";-->
<!--import { useRouter } from "vue-router";-->



<!--const clubName = ref("");-->
<!--const clubDescription = ref("");-->
<!--const clubCreated = ref(false);-->
<!--const inviteLink = ref("");-->
<!--const loading = ref(false);-->

<!--const router = useRouter();-->

<!--async function createClub() {-->
<!--  const user = JSON.parse(localStorage.getItem("user"));-->

<!--  if (!user) {-->
<!--    alert("You must be logged in");-->
<!--    return;-->
<!--  }-->

<!--  console.log("User object before creating club:", user);-->
<!--  const payload = {-->
<!--    clubName: clubName.value,-->
<!--    clubDescription: clubDescription.value,-->
<!--    ownerId: user.id || user.userId, // must match DTO-->
<!--  };-->

<!--  try {-->
<!--    const res = await fetch("http://localhost:8080/api/book-club/create", {-->
<!--      method: "POST",-->
<!--      headers: { "Content-Type": "application/json" },-->
<!--      body: JSON.stringify(payload),-->
<!--    });-->

<!--    if (!res.ok) throw new Error(await res.text());-->
<!--    const created = await res.json();-->

<!--    inviteLink.value = `http://localhost:8080/join/${created.clubId}`;-->
<!--    message.value = `✅ Book club created successfully (ID: ${created.clubId})`;-->
<!--    clubCreated.value = true;-->

<!--    //resetForm?.(); // optional, if you have a reset function-->

<!--  } catch (err) {-->
<!--    console.error(err);-->
<!--    message.value = `❌ Error: ${err.message}`;-->
<!--  } finally {-->
<!--    loading.value = false;-->
<!--  }-->

<!--  // try {-->
<!--  //   const response = await axios.post('http://localhost:8080/api/book-club/create', {-->
<!--  //     clubName: clubName.value,-->
<!--  //     clubDescription: clubDescription.value,-->
<!--  //     owner: user.userId // must match DTO-->
<!--  //   });-->
<!--  //-->
<!--  //   inviteLink.value = `http://localhost:8080/join/${response.data.clubId}`;-->
<!--  //   clubCreated.value = true;-->
<!--  //-->
<!--  // } catch (error) {-->
<!--  //   console.error("Error creating club:", error);-->
<!--  //   alert("Something went wrong. Please try again.");-->
<!--  // }-->
<!--}-->

<!--function goToAdmin() {-->
<!--  router.push("/admin"); // redirects to AdminPage-->
<!--}-->
<!--</script>-->

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const clubName = ref("");
const clubDescription = ref("");
const clubCreated = ref(false);
const inviteLink = ref("");
const message = ref("");
const loading = ref(false);

const router = useRouter();

async function createClub() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("You must be logged in");
    return;
  }

  console.log("User object before creating club:", user);

  const payload = {
    clubName: clubName.value,
    clubDescription: clubDescription.value,
    ownerId: user.id || user.userId, // ✅ must match backend DTO
  };

  loading.value = true;

  try {
    console.log("Payload being sent to backend:", payload);

    const res = await fetch("http://localhost:8080/api/book-club/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(await res.text());
    const created = await res.json();

    inviteLink.value = `http://localhost:8080/join/${created.clubId}`;
    //inviteLink.value = `http://localhost:3000/join/${response.data.clubId}`;
    message.value = `✅ Book club created successfully (ID: ${created.clubId})`;
    clubCreated.value = true;

    resetForm();
  } catch (err) {
    console.error(err);
    message.value = `❌ Error: ${err.message}`;
  } finally {
    loading.value = false;
  }
}

function resetForm() {
  clubName.value = "";
  clubDescription.value = "";
  inviteLink.value = "";
}

function goToAdmin() {
  router.push("/admin");
}
</script>

<style scoped>
.page {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: green;
}

/* Background blurred image */
.background {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f') no-repeat center center/cover;
  filter: blur(6px) brightness(0.6);
  z-index: -1;
}

/* Form box */
.form-box {
  background: rgba(28, 26, 26, 0.85);
  border: 2px solid green;
  border-radius: 8px;
  padding: 2rem;
  width: 400px;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
}

.form-box h1 {
  margin-bottom: 1rem;
  text-align: center;
}

textarea, input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.4rem;
  border: 1px solid green;
  border-radius: 10px;
  background: black;
  color: white;
}

button {
  margin: 1rem auto 0;
  display: block;
  width: 50%;
  background: black;
  border: 2px solid green;
  border-radius: 10px;
  color: green;
  padding: 0.6rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: green;
  color: black;
}

/* Popup modal */
.popup {
  background: rgba(0, 0, 0, 0.95);
  border: 2px solid green;
  border-radius: 8px;
  padding: 2rem;
  width: 400px;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.6);
}

.popup input {
  margin-top: 1rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid green;
  background: black;
  color: white;
}
</style>
