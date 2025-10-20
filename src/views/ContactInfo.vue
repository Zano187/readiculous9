<template>
  <div>
    <!-- Floating Contact Icon -->
    <div
        class="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition"
        @click="toggleContact"
        style="z-index: 9999;"
    >
      <i class="fas fa-address-book text-2xl"></i>
    </div>

    <!-- Contact Popup -->
    <transition name="fade">
      <div
          v-if="showContact"
          class="fixed bottom-20 right-6 bg-white shadow-2xl rounded-xl w-80 p-5 border border-gray-200"
          style="z-index: 10000;"
      >
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-lg font-semibold text-gray-800">
            📚 Readiculous Book Club
          </h2>
          <button
              @click="toggleContact"
              class="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>

        <div class="mb-3">
          <p class="text-sm text-gray-700 mb-1">
            <strong>Email:</strong> contact@readiculousclub.com
          </p>
          <p class="text-sm text-gray-700 mb-1">
            <strong>Phone:</strong> +27 21 555 1234
          </p>
          <p class="text-sm text-gray-700 mb-1">
            <strong>Address:</strong> 15 District Six Rd, Cape Town, South Africa
          </p>
        </div>

        <form @submit.prevent="submitComplaint" class="mt-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Your Complaint:
          </label>
          <textarea
              v-model="complaint"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
              placeholder="Type your complaint or feedback here..."
          ></textarea>

          <button
              type="submit"
              class="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>

        <p v-if="submitted" class="text-green-600 text-sm mt-2 font-medium">
          ✅ Thank you! Your complaint has been submitted.
        </p>

        <div class="flex justify-start mt-4 space-x-4">
          <a
              href="https://facebook.com/readiculous"
              target="_blank"
              class="text-blue-600 hover:text-blue-800"
          >
            <i class="fab fa-facebook-f"></i>
          </a>
          <a
              href="https://instagram.com/readiculous"
              target="_blank"
              class="text-pink-500 hover:text-pink-700"
          >
            <i class="fab fa-instagram"></i>
          </a>
          <a
              href="https://twitter.com/readiculous"
              target="_blank"
              class="text-blue-400 hover:text-blue-600"
          >
            <i class="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ContactInfo",
  data() {
    return {
      showContact: false,
      complaint: "",
      submitted: false,
    };
  },
  methods: {
    toggleContact() {
      this.showContact = !this.showContact;
      this.submitted = false;
    },
    submitComplaint() {
      if (!this.complaint.trim()) {
        alert("Please type your complaint before submitting.");
        return;
      }
      console.log("Complaint submitted:", this.complaint);
      this.submitted = true;
      this.complaint = "";
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
