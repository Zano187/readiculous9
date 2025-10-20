n<script setup>
import { ref, computed, defineEmits } from 'vue'

const emit = defineEmits(['back'])

const email = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const isPasswordStrong = computed(() =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(newPassword.value)
)

const doPasswordsMatch = computed(() =>
    newPassword.value === confirmPassword.value
)

const submitReset = () => {
  if (!email.value || !newPassword.value || !confirmPassword.value) {
    alert('Please fill in all fields.')
    return
  }

  if (!isPasswordStrong.value) {
    alert('Password must be at least 8 characters long and include a number, an uppercase, and a lowercase letter.')
    return
  }

  if (!doPasswordsMatch.value) {
    alert('Passwords do not match.')
    return
  }

  alert(`Password for ${email.value} has been successfully reset.`)
}
</script>

<template>
  <div class="auth-box">
    <h2>Reset Password</h2>
    <form @submit.prevent="submitReset">
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>

      <div class="form-group">
        <label>New Password</label>
        <input v-model="newPassword" type="password" required />
        <small v-if="newPassword && !isPasswordStrong" class="error">
          Must be 8+ characters with at least one number, one uppercase and one lowercase letter.
        </small>
      </div>

      <div class="form-group">
        <label>Confirm Password</label>
        <input v-model="confirmPassword" type="password" required />
        <small v-if="confirmPassword && !doPasswordsMatch" class="error">
          Passwords do not match.
        </small>
      </div>

      <button type="submit" class="submit-btn">Reset Password</button>
    </form>

    <p class="toggle-text" @click="emit('back')">
      Back to Login
    </p>
  </div>
</template>

<style scoped>
.auth-box {
  background-color: #f9f9f9;
  padding: 3rem 4rem;
  border-radius: 16px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
  width: 500px;
  max-width: 95%;
  text-align: center;
  margin-top: 4rem;
}

h2 {
  color: #111;
  font-size: 1.8rem;
  margin-bottom: 2rem;
}

.form-group {
  text-align: left;
  margin-bottom: 1.5rem;
}

label {
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
  color: #333;
  display: block;
}

input {
  width: 100%;
  padding: 0.7rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f0f0f0;
  font-size: 1rem;
  color: #000000;
}

small.error {
  color: #cc0000;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  display: block;
}

.submit-btn {
  margin-top: 1.5rem;
  padding: 0.8rem;
  background-color: #000000;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
}

.submit-btn:hover {
  background-color: #333333;
}

.toggle-text {
  font-size: 0.9rem;
  color: #555;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 1rem;
}
</style>