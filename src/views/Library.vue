<!--<script setup>-->
<!--import { ref, onMounted, nextTick } from "vue";-->

<!--// -&#45;&#45; BOOKS STATE -&#45;&#45;-->
<!--const books = ref([]);-->
<!--const loading = ref(false);-->
<!--const error = ref("");-->

<!--// -&#45;&#45; CLUBS STATE (NEW) -&#45;&#45;-->
<!--const clubs = ref([]);-->
<!--const loadingClubs = ref(false);-->
<!--const errorClubs = ref("");-->

<!--// -&#45;&#45; SCROLLING & VISIBILITY LOGIC (Reused) -&#45;&#45;-->
<!--const bookScrollArea = ref(null);-->
<!--const clubScrollArea = ref(null); // NEW ref for club carousel-->
<!--const isBookScrollable = ref(false); // Renamed for clarity-->
<!--const isClubScrollable = ref(false); // NEW state for club scrollability-->
<!--const scrollDistance = 300;-->

<!--// Function to check if the content is scrollable (Updated to handle both)-->
<!--const checkScrollability = () => {-->
<!--  if (bookScrollArea.value) {-->
<!--    isBookScrollable.value = bookScrollArea.value.scrollWidth > bookScrollArea.value.clientWidth;-->
<!--  }-->
<!--  if (clubScrollArea.value) { // Check the club area-->
<!--    isClubScrollable.value = clubScrollArea.value.scrollWidth > clubScrollArea.value.clientWidth;-->
<!--  }-->
<!--};-->

<!--// Scrolling functions (Updated to take the target area)-->
<!--const scrollLeft = (areaRef) => {-->
<!--  if (areaRef && areaRef.value) {-->
<!--    areaRef.value.scrollBy({ left: -scrollDistance, behavior: 'smooth' });-->
<!--  }-->
<!--};-->

<!--const scrollRight = (areaRef) => {-->
<!--  if (areaRef && areaRef.value) {-->
<!--    areaRef.value.scrollBy({ left: scrollDistance, behavior: 'smooth' });-->
<!--  }-->
<!--};-->

<!--// -&#45;&#45; DATA FETCHING (Books) -&#45;&#45;-->
<!--async function fetchBooks() {-->
<!--  loading.value = true;-->
<!--  error.value = "";-->
<!--  try {-->
<!--    const res = await fetch("http://localhost:8080/api/books/getAll");-->
<!--    if (!res.ok) throw new Error(`HTTP ${res.status}`);-->
<!--    books.value = await res.json();-->
<!--  } catch (err) {-->
<!--    console.error(err);-->
<!--    error.value = "Failed to load books. Please try again later.";-->
<!--  } finally {-->
<!--    loading.value = false;-->
<!--  }-->
<!--}-->

<!--// -&#45;&#45; DATA FETCHING (Clubs) (NEW) -&#45;&#45;-->
<!--async function fetchClubs() {-->
<!--  loadingClubs.value = true;-->
<!--  errorClubs.value = "";-->
<!--  try {-->
<!--    // NOTE: Replace this with your actual club endpoint URL-->
<!--    const res = await fetch("http://localhost:8080/api/book-club/all");-->
<!--    if (!res.ok) throw new Error(`HTTP ${res.status}`);-->
<!--    clubs.value = await res.json();-->
<!--  } catch (err) {-->
<!--    console.error(err);-->
<!--    errorClubs.value = "Failed to load clubs. Please try again later.";-->
<!--  } finally {-->
<!--    loadingClubs.value = false;-->
<!--  }-->
<!--}-->

<!--// -&#45;&#45; LIFECYCLE -&#45;&#45;-->
<!--onMounted(async () => {-->
<!--  // Fetch both data sets concurrently-->
<!--  await Promise.all([fetchBooks(), fetchClubs()]);-->

<!--  // Wait for DOM to update and check scrollability for both carousels-->
<!--  await nextTick();-->
<!--  checkScrollability();-->

<!--  window.addEventListener('resize', checkScrollability);-->
<!--});-->

<!--// NOTE: You might want to define a joinClub function here that sends the userId and clubId to your backend.-->
<!--function joinClub(clubId) {-->
<!--  console.log(`Attempting to join club: ${clubId}`);-->
<!--  // Implement your fetch/axios POST request here to the join club endpoint-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <div class="library-container">-->
<!--    <div class="page-content-wrapper">-->
<!--      <h1 class="page-title">📚 Our Library</h1>-->

<!--      <h2 class="section-title">Book Collection</h2>-->

<!--      <div v-if="loading" class="text-center text-gray-600 text-lg">Loading books...</div>-->
<!--      <div v-if="error" class="text-center text-red-600">{{ error }}</div>-->

<!--      <div v-if="books.length === 0 && !loading && !error" class="text-center text-gray-500 mb-12">-->
<!--        No books available yet.-->
<!--      </div>-->

<!--      <div v-if="books.length > 0" class="carousel-wrapper mb-12">-->

<!--        <button-->
<!--            v-if="isBookScrollable"-->
<!--            @click="scrollLeft(bookScrollArea)"-->
<!--            class="scroll-button scroll-button-left"-->
<!--            aria-label="Scroll Books Left"-->
<!--        >-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />-->
<!--          </svg>-->
<!--        </button>-->

<!--        <div-->
<!--            ref="bookScrollArea"-->
<!--            class="book-scroll-area custom-scrollbar"-->
<!--        >-->
<!--          <a-->
<!--              v-for="book in books"-->
<!--              :key="book.bookId"-->
<!--              :href="book.link"-->
<!--              target="_blank"-->
<!--              rel="noopener noreferrer"-->
<!--              class="book-card"-->
<!--          >-->
<!--            <div class="card-image-area">-->
<!--              <img-->
<!--                  v-if="book.image"-->
<!--                  :src="`data:image/jpeg;base64,${book.image}`"-->
<!--                  :alt="`Cover of ${book.title}`"-->
<!--                  class="book-cover"-->
<!--              />-->
<!--              <div-->
<!--                  v-else-->
<!--                  class="book-cover no-image-placeholder"-->
<!--              >-->
<!--                No Image-->
<!--              </div>-->
<!--            </div>-->

<!--            <h2 class="card-title line-clamp-2">-->
<!--              {{ book.title }}-->
<!--            </h2>-->

<!--            <div class="book-info card-details-wrapper">-->
<!--              <p class="truncate">-->
<!--                <span class="detail-label">Author:</span> {{ book.author || "Unknown" }}-->
<!--              </p>-->
<!--            </div>-->
<!--          </a>-->
<!--        </div>-->

<!--        <button-->
<!--            v-if="isBookScrollable"-->
<!--            @click="scrollRight(bookScrollArea)"-->
<!--            class="scroll-button scroll-button-right"-->
<!--            aria-label="Scroll Books Right"-->
<!--        >-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />-->
<!--          </svg>-->
<!--        </button>-->
<!--      </div>-->

<!--      <div class="section-divider"></div>-->

<!--      <h2 class="section-title">Created Book Clubs</h2>-->

<!--      <div v-if="loadingClubs" class="text-center text-gray-600 text-lg">Loading book clubs...</div>-->
<!--      <div v-if="errorClubs" class="text-center text-red-600">{{ errorClubs }}</div>-->

<!--      <div v-if="clubs.length === 0 && !loadingClubs && !errorClubs" class="text-center text-gray-500">-->
<!--        No clubs available yet.-->
<!--      </div>-->

<!--      <div v-if="clubs.length > 0" class="carousel-wrapper">-->

<!--        <button-->
<!--            v-if="isClubScrollable"-->
<!--            @click="scrollLeft(clubScrollArea)"-->
<!--            class="scroll-button scroll-button-left"-->
<!--            aria-label="Scroll Clubs Left"-->
<!--        >-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />-->
<!--          </svg>-->
<!--        </button>-->

<!--        <div-->
<!--            ref="clubScrollArea"-->
<!--            class="book-scroll-area custom-scrollbar"-->
<!--        >-->
<!--          <div-->
<!--              v-for="club in clubs"-->
<!--              :key="club.clubId"-->
<!--              class="book-card club-card"-->
<!--          >-->
<!--            <div class="card-image-area">-->
<!--              <img-->
<!--                  v-if="club.image"-->
<!--                  :src="`data:image/jpeg;base64,${club.image}`"-->
<!--                  :alt="`Cover of ${club.title}`"-->
<!--                  class="club-cover"-->
<!--              />-->
<!--              <div-->
<!--                  v-else-->
<!--                  class="club-cover no-image-placeholder"-->
<!--              >-->
<!--                No Image-->
<!--              </div>-->
<!--            </div>-->

<!--            <h2 class="card-title line-clamp-2 club-title-margin">-->
<!--              {{ club.title }}-->
<!--            </h2>-->

<!--            <div class="club-description-wrapper">-->
<!--              <p class="line-clamp-3">{{ club.description || 'No description provided.' }}</p>-->
<!--            </div>-->

<!--            <button-->
<!--                @click.stop="joinClub(club.clubId)"-->
<!--                class="join-button"-->
<!--            >-->
<!--              Join Club-->
<!--            </button>-->
<!--          </div>-->
<!--        </div>-->

<!--        <button-->
<!--            v-if="isClubScrollable"-->
<!--            @click="scrollRight(clubScrollArea)"-->
<!--            class="scroll-button scroll-button-right"-->
<!--            aria-label="Scroll Clubs Right"-->
<!--        >-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />-->
<!--          </svg>-->
<!--        </button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->


<!--<style scoped>-->
<!--/* -&#45;&#45; Global Containers -&#45;&#45; */-->
<!--.library-container {-->
<!--  min-height: 100vh;-->
<!--  background-color: #f9fafb; /* bg-gray-50 */-->
<!--  padding-top: 2.5rem;-->
<!--  padding-bottom: 2.5rem;-->
<!--}-->

<!--.page-content-wrapper {-->
<!--  max-width: 80rem; /* max-w-7xl */-->
<!--  margin-left: auto;-->
<!--  margin-right: auto;-->
<!--  padding-left: 1rem;-->
<!--  padding-right: 1rem;-->
<!--}-->

<!--.page-title {-->
<!--  font-size: 1.875rem; /* text-3xl */-->
<!--  font-weight: 700; /* font-bold */-->
<!--  text-align: center;-->
<!--  margin-bottom: 2.5rem;-->
<!--  color: #1f2937; /* text-gray-800 */-->
<!--}-->

<!--.section-title {-->
<!--  font-size: 1.5rem; /* text-2xl */-->
<!--  font-weight: 600; /* font-semibold */-->
<!--  color: #374151; /* text-gray-700 */-->
<!--  margin-bottom: 1.5rem;-->
<!--  text-align: center;-->
<!--}-->

<!--/* -&#45;&#45; Divider (NEW) -&#45;&#45; */-->
<!--.section-divider {-->
<!--  max-width: 25rem; /* Width less than 100% */-->
<!--  height: 1px;-->
<!--  background-color: #d1d5db; /* bg-gray-300 */-->
<!--  margin: 3rem auto; /* Center the divider and add vertical space */-->
<!--}-->

<!--/* -&#45;&#45; Carousel Wrapper & Scroll Area -&#45;&#45; */-->
<!--.carousel-wrapper {-->
<!--  position: relative;-->
<!--  padding-right: 4rem;-->
<!--  padding-left: 4rem;-->
<!--}-->

<!--.book-scroll-area {-->
<!--  display: flex;-->
<!--  overflow-x: scroll;-->
<!--  -webkit-overflow-scrolling: touch;-->
<!--  scroll-snap-type: x mandatory;-->
<!--  padding-bottom: 1rem;-->
<!--  padding-top: 0.25rem;-->
<!--  padding-left: 0.5rem;-->
<!--  padding-right: 0.5rem;-->
<!--  gap: 1.5rem; /* space-x-6 */-->
<!--}-->

<!--/* Hide the default scrollbar */-->
<!--.custom-scrollbar::-webkit-scrollbar {-->
<!--  display: none;-->
<!--}-->
<!--.custom-scrollbar {-->
<!--  -ms-overflow-style: none; /* IE and Edge */-->
<!--  scrollbar-width: none; /* Firefox */-->
<!--}-->

<!--/* -&#45;&#45; Scroll Buttons -&#45;&#45; */-->
<!--.scroll-button {-->
<!--  position: absolute;-->
<!--  top: 50%;-->
<!--  transform: translateY(-50%);-->
<!--  z-index: 10;-->
<!--  padding: 0.75rem;-->
<!--  border-radius: 9999px; /* rounded-full */-->
<!--  background-color: #fff;-->
<!--  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); /* shadow-lg */-->
<!--  color: #374151; /* text-gray-700 */-->
<!--  transition: background-color 0.15s ease-in-out;-->
<!--  display: none;-->
<!--  opacity: 0.85;-->
<!--}-->
<!--.scroll-button:hover {-->
<!--  background-color: #e5e7eb;-->
<!--  opacity: 1;-->
<!--}-->
<!--@media (min-width: 768px) {-->
<!--  .scroll-button {-->
<!--    display: flex;-->
<!--    align-items: center;-->
<!--    justify-content: center;-->
<!--  }-->
<!--}-->
<!--.scroll-button-left {-->
<!--  left: 0;-->
<!--}-->
<!--.scroll-button-right {-->
<!--  right: 0;-->
<!--}-->

<!--/* -&#45;&#45; BOOK CARD STYLES (Reused Base) -&#45;&#45; */-->
<!--.book-card, .club-card {-->
<!--  flex-shrink: 0;-->
<!--  background-color: #fff;-->
<!--  border-radius: 0.75rem;-->
<!--  padding: 0.5rem;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  align-items: center;-->
<!--  text-align: center;-->
<!--  cursor: pointer;-->

<!--  width: 200px;-->
<!--  box-sizing: border-box;-->

<!--  border: 1px solid #9ca3af;-->

<!--  transition: transform 0.25s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out;-->
<!--}-->

<!--/* Specific heights to control vertical spacing */-->
<!--.book-card {-->
<!--  min-height: 280px;-->
<!--}-->
<!--.club-card {-->
<!--  min-height: 380px; /* Slightly taller to accommodate description and button */-->
<!--}-->

<!--/* Card hover effect */-->
<!--.book-card:hover, .club-card:hover {-->
<!--  transform: translateY(-5px);-->
<!--  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);-->
<!--  border-color: #000;-->
<!--}-->

<!--/* -&#45;&#45; Image and Details Alignment -&#45;&#45; */-->
<!--.card-image-area {-->
<!--  padding: 0.5rem;-->
<!--  background-color: #ffffff;-->
<!--  width: 100%;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--}-->

<!--/* Book Image Size */-->
<!--.book-cover {-->
<!--  width: 150px;-->
<!--  height: 180px;-->
<!--  object-fit: cover;-->
<!--  margin-bottom: 0;-->
<!--  border-radius: 0.375rem;-->
<!--  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);-->
<!--}-->
<!--/* Club Image Size (Slightly smaller to make room for description) */-->
<!--.club-cover {-->
<!--  width: 150px;-->
<!--  height: 120px; /* Reduced height for club image */-->
<!--  object-fit: cover;-->
<!--  margin-bottom: 0;-->
<!--  border-radius: 0.375rem;-->
<!--  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);-->
<!--}-->

<!--.no-image-placeholder {-->
<!--  background-color: #e5e7eb;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  color: #9ca3af;-->
<!--}-->

<!--/* Title Styling */-->
<!--.card-title {-->
<!--  font-size: 1rem;-->
<!--  font-weight: 700;-->
<!--  color: #1f2937;-->
<!--  margin-top: 0.5rem;-->
<!--  margin-bottom: 0.25rem;-->
<!--  line-height: 1.3;-->
<!--}-->

<!--/* Title margin specifically for clubs to separate from image */-->
<!--.club-title-margin {-->
<!--  margin-top: 0.75rem;-->
<!--}-->

<!--/* Line-clamp (Reused, added clamp-3 for description) */-->
<!--.line-clamp-2 {-->
<!--  display: -webkit-box;-->
<!--  -webkit-line-clamp: 2;-->
<!--  -webkit-box-orient: vertical;-->
<!--  overflow: hidden;-->
<!--  text-align: center;-->
<!--}-->
<!--.line-clamp-3 {-->
<!--  display: -webkit-box;-->
<!--  -webkit-line-clamp: 3;-->
<!--  -webkit-box-orient: vertical;-->
<!--  overflow: hidden;-->
<!--  text-align: center;-->
<!--}-->

<!--/* Book Details */-->
<!--.card-details-wrapper {-->
<!--  text-align: center;-->
<!--  font-size: 0.875rem;-->
<!--  color: #374151;-->
<!--  line-height: 1.3;-->
<!--  width: 100%;-->
<!--  padding-top: 0;-->
<!--  margin-bottom: 0;-->
<!--}-->

<!--.detail-label {-->
<!--  font-weight: 600;-->
<!--  color: #4b5563;-->
<!--}-->

<!--/* -&#45;&#45; CLUB SPECIFIC STYLES (NEW) -&#45;&#45; */-->
<!--.club-description-wrapper {-->
<!--  /* Ensures description takes up remaining space but doesn't overflow */-->
<!--  flex-grow: 1;-->
<!--  padding: 0 0.25rem; /* Small horizontal padding */-->
<!--  margin-bottom: 0.75rem; /* Space before button */-->
<!--  font-size: 0.875rem;-->
<!--  color: #4b5563;-->
<!--  line-height: 1.4;-->
<!--}-->

<!--.join-button {-->
<!--  /* Ensure button stays at the bottom of the card */-->
<!--  margin-top: auto;-->
<!--  width: 90%;-->
<!--  padding: 0.5rem 0;-->
<!--  background-color: #10b981; /* bg-emerald-500 or similar green */-->
<!--  color: white;-->
<!--  font-weight: 600;-->
<!--  border-radius: 0.375rem;-->
<!--  transition: background-color 0.2s ease;-->
<!--  text-align: center;-->
<!--  border: none;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.join-button:hover {-->
<!--  background-color: #059669; /* darker green on hover */-->
<!--}-->
<!--</style>-->

<script setup>
import { ref, onMounted, nextTick } from "vue";

// --- AUTHENTICATION MOCKS ---
// NOTE: In a real application, you would import these from a store (e.g., Vuex/Pinia)
// or check local storage/cookies for a valid token to determine the user's logged-in status.
const isLoggedIn = ref(true); // Mock: Assume user is logged in for testing join logic
const getUserId = () => 1; // Mock: Function to retrieve the current user's ID

// --- BOOKS STATE ---
const books = ref([]);
const loading = ref(false);
const error = ref("");

// --- CLUBS STATE ---
const clubs = ref([]);
const loadingClubs = ref(false);
const errorClubs = ref("");

// --- SCROLLING & VISIBILITY LOGIC ---
const bookScrollArea = ref(null);
const clubScrollArea = ref(null);
const scrollDistance = 300;

// NEW: Reactive states to track scroll position for responsive arrows
const isBookLeftVisible = ref(false);
const isBookRightVisible = ref(false);
const isClubLeftVisible = ref(false);
const isClubRightVisible = ref(false);

/**
 * Checks if more content is available to scroll left or right in a carousel.
 */
const checkScrollPosition = () => {
  // BOOKS
  if (bookScrollArea.value) {
    const { scrollLeft, scrollWidth, clientWidth } = bookScrollArea.value;
    const isScrollable = scrollWidth > clientWidth;

    isBookLeftVisible.value = isScrollable && scrollLeft > 0;
    // Tolerance of 1 to prevent issues with floating point arithmetic
    isBookRightVisible.value = isScrollable && scrollLeft < (scrollWidth - clientWidth - 1);
  }

  // CLUBS
  if (clubScrollArea.value) {
    const { scrollLeft, scrollWidth, clientWidth } = clubScrollArea.value;
    const isScrollable = scrollWidth > clientWidth;

    isClubLeftVisible.value = isScrollable && scrollLeft > 0;
    isClubRightVisible.value = isScrollable && scrollLeft < (scrollWidth - clientWidth - 1);
  }
};

/**
 * Attaches scroll listener to a carousel area.
 */
const attachScrollListener = (areaRef) => {
  if (areaRef.value) {
    areaRef.value.addEventListener('scroll', checkScrollPosition);
  }
};

// Scrolling function (Reused)
const scrollLeft = (areaRef) => {
  if (areaRef && areaRef.value) {
    areaRef.value.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
  }
};

const scrollRight = (areaRef) => {
  if (areaRef && areaRef.value) {
    areaRef.value.scrollBy({ left: scrollDistance, behavior: 'smooth' });
  }
};

// --- DATA FETCHING (Books) ---
async function fetchBooks() {
  loading.value = true;
  error.value = "";
  try {
    const res = await fetch("http://localhost:8080/api/books/getAll");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    books.value = await res.json();
  } catch (err) {
    console.error(err);
    error.value = "Failed to load books. Please try again later.";
  } finally {
    loading.value = false;
  }
}

// --- DATA FETCHING (Clubs) ---
async function fetchClubs() {
  loadingClubs.value = true;
  errorClubs.value = "";
  try {
    const res = await fetch("http://localhost:8080/api/book-club/all");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    clubs.value = await res.json();
  } catch (err) {
    console.error(err);
    errorClubs.value = "Failed to load clubs. Please try again later.";
  } finally {
    loadingClubs.value = false;
  }
}

// --- CLUB JOIN FUNCTIONALITY (IMPORTANT) ---

/**
 * Attempts to join a club by sending the clubId and userId to the backend.
 * @param {number} clubId The ID of the club to join.
 */
async function joinClub(clubId) {
  if (!isLoggedIn.value) {
    alert("You must be logged in to join a club.");
    // NOTE: In a real app, redirect to login page here.
    return;
  }

  const userId = getUserId();

  try {
    const response = await fetch(`http://localhost:8080/api/join-club/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization header here if using tokens: 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ clubId, userId }) // Send both IDs
    });

    if (response.ok) {
      alert(`Successfully joined club ${clubId}!`);
      // Optional: Update the club data if needed, e.g., to show "Joined" status.
    } else if (response.status === 409) {
      alert("You are already a member of this club.");
    } else {
      // Handle other server errors
      const errorData = await response.json();
      alert(`Failed to join club: ${errorData.message || 'Server error.'}`);
    }
  } catch (e) {
    console.error("Error joining club:", e);
    alert("An unexpected error occurred while trying to join the club.");
  }
}

// --- LIFECYCLE ---
onMounted(async () => {
  await Promise.all([fetchBooks(), fetchClubs()]);

  await nextTick();

  // Attach scroll listeners after elements are guaranteed to be in the DOM
  attachScrollListener(bookScrollArea);
  attachScrollListener(clubScrollArea);

  // Initial check
  checkScrollPosition();

  // Recheck on window resize (to handle layout changes)
  window.addEventListener('resize', checkScrollPosition);
});
</script>

<template>
  <div class="library-container">
    <div class="page-content-wrapper">
      <h1 class="page-title">📚 Our Library</h1>

      <h2 class="section-title">Book Collection</h2>

      <div v-if="loading" class="text-center text-gray-600 text-lg">Loading books...</div>
      <div v-if="error" class="text-center text-red-600">{{ error }}</div>

      <div v-if="books.length === 0 && !loading && !error" class="text-center text-gray-500 mb-12">
        No books available yet.
      </div>

      <div v-if="books.length > 0" class="carousel-wrapper mb-12">

        <button
            v-if="isBookLeftVisible"
            @click="scrollLeft(bookScrollArea)"
            class="scroll-button scroll-button-left"
            aria-label="Scroll Books Left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
            ref="bookScrollArea"
            class="book-scroll-area custom-scrollbar"
        >
          <a
              v-for="book in books"
              :key="book.bookId"
              :href="book.link"
              target="_blank"
              rel="noopener noreferrer"
              class="book-card"
          >
            <div class="card-image-area">
              <img
                  v-if="book.image"
                  :src="`data:image/jpeg;base64,${book.image}`"
                  :alt="`Cover of ${book.title}`"
                  class="book-cover"
              />
              <div
                  v-else
                  class="book-cover no-image-placeholder"
              >
                No Image
              </div>
            </div>

            <h2 class="card-title line-clamp-2">
              {{ book.title }}
            </h2>

            <div class="book-info card-details-wrapper">
              <p class="truncate">
                <span class="detail-label">Author:</span> {{ book.author || "Unknown" }}
              </p>
            </div>
          </a>
        </div>

        <button
            v-if="isBookRightVisible"
            @click="scrollRight(bookScrollArea)"
            class="scroll-button scroll-button-right"
            aria-label="Scroll Books Right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div class="section-divider"></div>

      <h2 class="section-title">Created Book Clubs</h2>

      <div v-if="loadingClubs" class="text-center text-gray-600 text-lg">Loading book clubs...</div>
      <div v-if="errorClubs" class="text-center text-red-600">{{ errorClubs }}</div>

      <div v-if="clubs.length === 0 && !loadingClubs && !errorClubs" class="text-center text-gray-500">
        No clubs available yet.
      </div>

      <div v-if="clubs.length > 0" class="carousel-wrapper">

        <button
            v-if="isClubLeftVisible"
            @click="scrollLeft(clubScrollArea)"
            class="scroll-button scroll-button-left"
            aria-label="Scroll Clubs Left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
            ref="clubScrollArea"
            class="book-scroll-area custom-scrollbar"
        >
          <div
              v-for="club in clubs"
              :key="club.clubId"
              class="book-card club-card"
          >
            <div class="card-image-area">
              <img
                  v-if="club.image"
                  :src="`data:image/jpeg;base64,${club.image}`"
                  :alt="`Cover of ${club.title}`"
                  class="club-cover"
              />
              <div
                  v-else
                  class="club-cover no-image-placeholder"
              >
                No Image
              </div>
            </div>

            <h2 class="card-title line-clamp-2 club-title-margin">
              {{ club.title }}
            </h2>

            <div class="club-description-wrapper">
              <p class="line-clamp-3">{{ club.description || 'No description provided.' }}</p>
            </div>

            <button
                @click.stop="joinClub(club.clubId)"
                class="join-button"
            >
              Join Club
            </button>
          </div>
        </div>

        <button
            v-if="isClubRightVisible"
            @click="scrollRight(clubScrollArea)"
            class="scroll-button scroll-button-right"
            aria-label="Scroll Clubs Right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- Global Containers --- */
.library-container {
  min-height: 100vh;
  background-color: #f9fafb; /* bg-gray-50 */
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
}

.page-content-wrapper {
  max-width: 80rem; /* max-w-7xl */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

.page-title {
  font-size: 1.875rem; /* text-3xl */
  font-weight: 700; /* font-bold */
  text-align: center;
  margin-bottom: 2.5rem;
  color: #1f2937; /* text-gray-800 */
}

.section-title {
  font-size: 1.5rem; /* text-2xl */
  font-weight: 600; /* font-semibold */
  color: #374151; /* text-gray-700 */
  margin-bottom: 1.5rem;
  text-align: center;
}

/* --- Divider --- */
.section-divider {
  max-width: 25rem;
  height: 1px;
  background-color: #d1d5db;
  margin: 3rem auto;
}

/* --- Carousel Wrapper & Scroll Area --- */
.carousel-wrapper {
  position: relative;
  padding-right: 4rem;
  padding-left: 4rem;
}

.book-scroll-area {
  display: flex;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  padding-bottom: 1rem;
  padding-top: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  gap: 1.5rem; /* space-x-6 */
  /* Scroll behavior is now monitored in script for button visibility */
  scroll-behavior: smooth;
}

/* Hide the default scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  display: none;
}
.custom-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* --- Scroll Buttons (Logic handled by v-if in template) --- */
.scroll-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  padding: 0.75rem;
  border-radius: 9999px;
  background-color: #fff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  color: #374151;
  transition: background-color 0.15s ease-in-out;
  /* Removed display: none; - visibility is now controlled by Vue's v-if */
  opacity: 0.85;
}
.scroll-button:hover {
  background-color: #e5e7eb;
  opacity: 1;
}
@media (min-width: 768px) {
  /* No need for a separate media query since v-if handles all logic */
}
.scroll-button-left {
  left: 0;
}
.scroll-button-right {
  right: 0;
}

/* --- CARD STYLES (Uniform Size) --- */
.book-card, .club-card {
  flex-shrink: 0;
  background-color: #fff;
  border-radius: 0.75rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;

  width: 200px;
  min-height: 280px; /* Base height for Book cards */
  box-sizing: border-box;

  border: 1px solid #9ca3af;

  transition: transform 0.25s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out;
}

/* Make Club cards the same size as Book cards */
.club-card {
  min-height: 280px;
}

/* Card hover effect */
.book-card:hover, .club-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  border-color: #000;
}

/* --- Image and Details Alignment --- */
.card-image-area {
  padding: 0.5rem;
  background-color: #ffffff;
  width: 100%;
  display: flex;
  justify-content: center;
}

/* Book Image Size (150x180) */
.book-cover {
  width: 150px;
  height: 180px;
  object-fit: cover;
  margin-bottom: 0;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

/* Club Image Size (Made the same as book cover) */
.club-cover {
  width: 150px;
  height: 180px;
  object-fit: cover;
  margin-bottom: 0;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.no-image-placeholder {
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
}

/* Title Styling */
.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1f2937;
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

/* Remove separate margin for clubs since card size is now uniform */
.club-title-margin {
  margin-top: 0.5rem; /* Revert to standard margin */
}

/* Line-clamp (Description is now tighter, so clamp-3 might not be hit) */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: center;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: center;
}

/* Book Details */
.card-details-wrapper {
  text-align: center;
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.3;
  width: 100%;
  padding-top: 0;
  margin-bottom: 0;
}

.detail-label {
  font-weight: 600;
  color: #4b5563;
}

/* --- CLUB SPECIFIC STYLES --- */
.club-description-wrapper {
  /* Must be smaller now that the image is larger. Restrict height or allow flex to squeeze it. */
  flex-grow: 0; /* Important: prevents description from consuming too much space */
  padding: 0 0.25rem;
  margin-bottom: 0.5rem; /* Reduced space before button */
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.3; /* Tighter line height */
}

.join-button {
  margin-top: auto;
  width: 90%;
  padding: 0.5rem 0;
  background-color: #10b981;
  color: white;
  font-weight: 600;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
  text-align: center;
  border: none;
  cursor: pointer;
}

.join-button:hover {
  background-color: #059669;
}
</style>