<template>
  <div class="book-page">
    <header class="book-header">
      <h2>📚 Available Books</h2>
      <router-link to="/" class="back-link">← Back to Profile</router-link>
    </header>

    <section class="book-list">
      <div v-if="loading" class="loading">Loading books...</div>

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
          <span>{{ book.likes || 0 }} Likes</span>
        </div>

        <!-- Comments -->
        <div class="comment-section">
          <textarea
              v-model="book.newComment"
              placeholder="Write your comment..."
          ></textarea>
          <button @click="addComment(book)">Submit Comment</button>

          <div v-if="book.comments && book.comments.length" class="comments-list">
            <h4>💬 Comments</h4>
            <ul>
              <li v-for="(comment, index) in book.comments" :key="index">
                {{ comment }} — <em>User</em>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Notification -->
    <div v-if="notification.show" class="notification" :class="{ error: notification.error }">
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "BookPage",
  data() {
    return {
      books: [],
      loading: false,
      notification: {
        show: false,
        message: '',
        error: false
      }
    };
  },
  methods: {
    async fetchBooks() {
      this.loading = true;
      try {
        // Fetch books from your books API
        const booksRes = await fetch("http://localhost:8080/api/books/getAll");
        if (!booksRes.ok) throw new Error(`HTTP ${booksRes.status}`);

        const booksData = await booksRes.json();

        // Fetch discussions to get likes and comments
        const discussionsRes = await fetch("http://localhost:8080/api/Discussion");
        let discussionsData = [];

        if (discussionsRes.ok) {
          discussionsData = await discussionsRes.json();
        }

        // Combine book data with discussion data
        this.books = booksData.map((book) => {
          // Find discussion for this book (assuming discussion title matches book title)
          const discussion = discussionsData.find(d => d.title === book.title);

          return {
            id: book.bookId,
            title: book.title,
            author: book.author,
            description: book.description,
            genre: book.genre,
            year: book.yearPublished,
            image: book.image || null,
            likes: discussion ? discussion.likes : 0,
            comments: discussion ? discussion.comments : [],
            discussionId: discussion ? discussion.discussionId : null,
            newComment: "",
          };
        });
      } catch (err) {
        console.error(err);
        this.showNotification("Failed to load books. Please try again later.", true);
      } finally {
        this.loading = false;
      }
    },

    showNotification(message, isError = false) {
      this.notification = {
        show: true,
        message: message,
        error: isError
      };

      setTimeout(() => {
        this.notification.show = false;
      }, 3000);
    },

    async likeBook(book) {
      try {
        // If book doesn't have a discussion yet, create one first
        if (!book.discussionId) {
          await this.createDiscussion(book);
          // Refresh books to get the new discussion ID
          await this.fetchBooks();
          return;
        }

        const res = await fetch(
            `http://localhost:8080/api/Discussion/${book.discussionId}/like`,
            { method: "POST" }
        );

        if (!res.ok) throw new Error("Failed to like book");

        const updated = await res.json();
        book.likes = updated.likes;

        this.showNotification(`You liked "${book.title}"!`);
      } catch (err) {
        console.error("Error liking book:", err);
        this.showNotification("Failed to like book. Please try again.", true);
      }
    },

    async createDiscussion(book) {
      try {
        const discussion = {
          title: book.title,
          description: `Discussion for ${book.title}`,
          likes: 0,
          comments: []
        };

        const res = await fetch("http://localhost:8080/api/Discussion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(discussion)
        });

        if (!res.ok) throw new Error("Failed to create discussion");

        return await res.json();
      } catch (err) {
        console.error("Error creating discussion:", err);
        throw err;
      }
    },

    async addComment(book) {
      if (!book.newComment.trim()) {
        this.showNotification("Please write a comment before submitting.", true);
        return;
      }

      try {
        // If book doesn't have a discussion yet, create one first
        if (!book.discussionId) {
          await this.createDiscussion(book);
          // Refresh books to get the new discussion ID
          await this.fetchBooks();
          return;
        }

        const payload = {
          comment: book.newComment.trim()
        };

        const res = await fetch(
            `http://localhost:8080/api/Discussion/${book.discussionId}/comment`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
        );

        if (!res.ok) throw new Error("Failed to add comment");

        const updatedDiscussion = await res.json();

        // Update the book's comments with the new comments from discussion
        book.comments = updatedDiscussion.comments || [];
        book.newComment = "";

        this.showNotification(`Comment added to "${book.title}"!`);
      } catch (err) {
        console.error("Error adding comment:", err);
        this.showNotification("Failed to add comment. Please try again.", true);
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

.loading {
  text-align: center;
  padding: 20px;
  color: #6c757d;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.notification.error {
  background-color: #dc3545;
}
</style>