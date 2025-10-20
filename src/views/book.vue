<template>
  <div class="book-page">
    <header class="book-header">
      <h2>📚 Available Books</h2>
      <router-link to="/" class="back-link">← Back to Profile</router-link>
    </header>

    <section class="book-list">
      <div v-for="book in books" :key="book.id" class="book-card">
        <h3>{{ book.title }}</h3>
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p>{{ book.description }}</p>
        <p><strong>Genre:</strong> {{ book.genre }}</p>
        <p><strong>Year Published:</strong> {{ book.year }}</p>

        <!-- ✅ Book Cover Image -->
        <div v-if="book.image" class="book-image">
          <img
              :src="'data:image/jpeg;base64,' + book.image"
              alt="Book Cover"
          />
        </div>

        <!-- ✅ Like Button & Counter -->
        <div class="like-section">
          <button @click="likeBook(book)">👍 Like</button>
          <span>{{ book.likes }} Likes</span>
        </div>

        <!-- Comments -->
        <div class="comment-section">
          <textarea
              v-model="book.newComment"
              placeholder="Write your comment..."
          ></textarea>
          <button @click="addComment(book)">Submit Comment</button>

          <div v-if="book.comments.length" class="comments-list">
            <h4>💬 Comments</h4>
            <ul>
              <li v-for="(comment, index) in book.comments" :key="index">
                {{ comment.comment }} — <em>{{ comment.authorName }}</em>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "BookPage",
  data() {
    return {
      books: [],
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const res = await fetch("http://localhost:8080/api/books/getAll");
        const data = await res.json();
        this.books = data.map((b) => ({
          id: b.bookId,
          title: b.title,
          author: b.author,
          description: b.description,
          genre: b.genre,
          year: b.yearPublished,
          image: b.image || null,
          likes: b.likes || 0,
          comments: b.comments || [],
          newComment: "",
        }));
      } catch (err) {
        console.error(err);
      }
    },

    // ✅ Fixed Like Button Endpoint
    async likeBook(book) {
      try {
        const res = await fetch(
            `http://localhost:8080/api/Discussion/${book.id}/like`,
            { method: "POST" }
        );

        if (!res.ok) throw new Error("Failed to like book");

        // Optional: get updated like count from backend
        const updated = await res.json();
        book.likes = updated.likes ?? book.likes + 1;
      } catch (err) {
        console.error("Error liking book:", err);
      }

    },

    // ✅ Fixed Comment Endpoint
    async addComment(book) {
      if (!book.newComment.trim()) {
        alert("Please write a comment before submitting.");
        return;
      }

      try {
        const payload = {
          comment: book.newComment.trim(),
          author: { userId: 1, name: "Demo User" },
        };
        const res = await fetch(
            `http://localhost:8080/api/Discussion/${book.id}/comment`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
        );

        const savedComment = await res.json();
        book.comments.push({
          comment: savedComment.comment,
          authorName: savedComment.author?.name || "Unknown",
        });
        book.newComment = "";
      } catch (err) {
        console.error("Error adding comment:", err);
      }
    },
  },
  mounted() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
.book-page {
  padding: 20px;
  font-family: "Segoe UI", Arial, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.book-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.back-link {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.book-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.book-card {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.book-image {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.book-image img {
  width: 120px;
  height: 160px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.like-section {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.like-section button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.like-section button:hover {
  background-color: #0056b3;
}

.comment-section {
  margin-top: 15px;
}

.comment-section textarea {
  width: 100%;
  height: 60px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: none;
}

.comment-section button {
  margin-top: 5px;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.comment-section button:hover {
  background-color: #218838;
}

.comments-list {
  margin-top: 10px;
}

.comments-list li {
  background-color: #f1f1f1;
  margin-bottom: 5px;
  padding: 8px;
  border-radius: 5px;
}
</style>
