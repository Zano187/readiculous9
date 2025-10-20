<template>
  <div id="app">
    <!-- Simple User Selection -->
    <div v-if="!currentUser" class="user-selection">
      <div class="selection-box">
        <h2>Book Club Discussion</h2>
        <p>Choose a user to start chatting</p>

        <!-- Users List -->
        <div class="user-options">
          <div
              v-for="user in availableUsers"
              :key="user.userId"
              class="user-option"
              @click="selectUser(user)"
          >
            <div class="user-avatar">{{ getInitials(user.displayName || user.username) }}</div>
            <div class="user-info">
              <div class="user-name">{{ user.displayName || user.username }}</div>
              <div class="user-email">{{ user.email }}</div>
            </div>
          </div>
        </div>

        <button @click="createDemoUser" class="demo-btn">Create Demo User</button>
      </div>
    </div>

    <!-- Main App -->
    <div v-else class="app-container">
      <!-- Top Bar -->
      <div class="top-bar">
        <div class="user-info-top">
          👋 Welcome, {{ currentUser.displayName || currentUser.username }}
          <button @click="currentUser = null" class="logout-btn">Switch User</button>
        </div>
      </div>

      <!-- Rest of your existing app -->
      <div class="app-content">
        <!-- Sidebar -->
        <div class="sidebar">
          <div class="logo-area">
            <div class="logo">BC</div>
            <div class="app-name">Book Club</div>
          </div>

          <div class="nav-section">
            <div class="nav-title">Your Clubs</div>
            <div
                v-for="club in userClubs"
                :key="club.clubId"
                class="nav-item"
                :class="{ active: activeClubId === club.clubId }"
                @click="switchClub(club.clubId)"
            >
              <div class="nav-icon"><i class="fas fa-circle" :style="{ color: getClubColor(club.clubId) }"></i></div>
              <div class="nav-text">{{ club.clubName }}</div>
            </div>

            <!-- Create New Club Button -->
            <div class="nav-item create-club" @click="showCreateClub = true">
              <div class="nav-icon"><i class="fas fa-plus"></i></div>
              <div class="nav-text">Create New Club</div>
            </div>
          </div>

          <div class="current-book" v-if="currentBook">
            <div class="book-cover-small">{{ currentBook.title }}</div>
            <div class="book-title-small">{{ currentBook.title }}</div>
            <div class="book-author-small">{{ currentBook.author }}</div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="main-content" v-if="activeClub">
          <div class="channel-top-bar">
            <div class="channel-info">
              <div class="channel-name">{{ activeClub.clubName }}</div>
              <div class="member-count">{{ members.length }} members</div>
            </div>
            <div class="top-bar-actions">
              <div class="action-icon" @click="togglePanel('members')">
                <i class="fas fa-users"></i>
              </div>
              <div class="action-icon" @click="togglePanel('book')">
                <i class="fas fa-book-open"></i>
              </div>
              <div class="action-icon" @click="refreshData">
                <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
              </div>
            </div>
          </div>

          <div class="discussion-area">
            <div class="chat-container">
              <!-- Loading State -->
              <div v-if="loading" class="loading">
                <i class="fas fa-spinner fa-spin"></i> Loading messages...
              </div>

              <!-- Error State -->
              <div v-if="error" class="error">
                {{ error }}
                <button @click="refreshData" class="retry-btn">Retry</button>
              </div>

              <!-- Messages -->
              <div class="messages" v-else-if="messages.length > 0">
                <div class="message" v-for="message in messages" :key="message.id">
                  <div class="avatar" :style="{ backgroundColor: getAvatarColor(message.userId) }">
                    {{ getInitials(message.userName) }}
                  </div>
                  <div class="message-content">
                    <div class="message-header">
                      <div class="message-author">{{ message.userName }}</div>
                      <div class="message-time">{{ formatTime(message.timestamp) }}</div>
                    </div>
                    <div class="message-text">{{ message.content }}</div>
                    <div class="message-actions">
                      <div class="message-action" @click="likeMessage(message.id)">
                        <i class="far fa-thumbs-up"></i>
                        <span>{{ message.likes }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div v-else class="empty-state">
                <i class="fas fa-comments"></i>
                <h3>No messages yet</h3>
                <p>Start the discussion by sending the first message!</p>
              </div>

              <!-- Message Input -->
              <div class="message-input-container">
                <textarea
                    class="message-input"
                    placeholder="Type your message here..."
                    v-model="newMessage"
                    @keydown.enter.exact.prevent="sendMessage"
                ></textarea>
                <div class="input-actions">
                  <button
                      class="send-button"
                      @click="sendMessage"
                      :disabled="newMessage.trim() === '' || sending"
                  >
                    <i class="fas fa-paper-plane" v-if="!sending"></i>
                    <i class="fas fa-spinner fa-spin" v-else></i>
                    {{ sending ? 'Sending...' : 'Send' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Members Panel -->
            <div class="members-panel" v-if="activePanel === 'members'">
              <div class="panel-title">Members ({{ members.length }})</div>
              <div class="member" v-for="member in members" :key="member.userId">
                <div class="member-avatar" :style="{ backgroundColor: getAvatarColor(member.userId) }">
                  {{ getInitials(member.displayName || member.username) }}
                </div>
                <div>
                  <div class="member-name">{{ member.displayName || member.username }}</div>
                  <div class="member-role">{{ member.role }}</div>
                </div>
              </div>
            </div>

            <!-- Book Details Panel -->
            <div class="book-panel" v-if="activePanel === 'book' && currentBook">
              <div class="book-cover-large">{{ currentBook.title }}</div>
              <div class="book-title-large">{{ currentBook.title }}</div>
              <div class="book-author-large">by {{ currentBook.author }}</div>

              <div class="book-meta">
                <div class="meta-item">
                  <div class="meta-label">Genre</div>
                  <div class="meta-value">{{ currentBook.genre }}</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Pages</div>
                  <div class="meta-value">{{ currentBook.pages }}</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Published</div>
                  <div class="meta-value">{{ currentBook.yearPublished }}</div>
                </div>
              </div>

              <div class="book-description" v-if="currentBook.description">
                {{ currentBook.description }}
              </div>
            </div>
          </div>
        </div>

        <!-- No Club Selected -->
        <div v-else class="no-club">
          <div class="no-club-content">
            <i class="fas fa-users"></i>
            <h3>No Club Selected</h3>
            <p>Select a club from the sidebar or create a new one to start discussing!</p>
            <button @click="showCreateClub = true" class="create-club-btn">Create Your First Club</button>
          </div>
        </div>
      </div>

      <!-- Create Club Modal -->
      <div v-if="showCreateClub" class="modal-overlay">
        <div class="modal">
          <h2>Create New Book Club</h2>
          <form @submit.prevent="createNewClub">
            <div class="form-group">
              <label>Club Name:</label>
              <input v-model="newClub.clubName" type="text" required />
            </div>
            <div class="form-group">
              <label>Description:</label>
              <textarea v-model="newClub.clubDescription" required></textarea>
            </div>
            <div class="modal-actions">
              <button type="button" @click="showCreateClub = false" class="cancel-btn">Cancel</button>
              <button type="submit" :disabled="creatingClub" class="create-btn">
                <i class="fas fa-spinner fa-spin" v-if="creatingClub"></i>
                {{ creatingClub ? 'Creating...' : 'Create Club' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const API_BASE = 'http://localhost:8080';

// Super simple API - no security, no tokens
const apiService = {
  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  bookClub: {
    async create(clubData) {
      return await apiService.request('/book-club/create', {
        method: 'POST',
        body: JSON.stringify(clubData),
      });
    },

    async getAll() {
      return await apiService.request('/book-club/all');
    },
  },
};

export default {
  name: 'BookClubDiscussion',
  data() {
    return {
      // Hardcoded users
      currentUser: null,
      availableUsers: [
        {
          userId: 1,
          username: 'john_reader',
          displayName: 'John Reader',
          email: 'john@example.com',
          role: 'Owner'
        },
        {
          userId: 2,
          username: 'sarah_books',
          displayName: 'Sarah Books',
          email: 'sarah@example.com',
          role: 'Member'
        },
        {
          userId: 3,
          username: 'mike_literature',
          displayName: 'Mike Literature',
          email: 'mike@example.com',
          role: 'Member'
        },
        {
          userId: 4,
          username: 'emily_novels',
          displayName: 'Emily Novels',
          email: 'emily@example.com',
          role: 'Member'
        },
        {
          userId: 5,
          username: 'david_pages',
          displayName: 'David Pages',
          email: 'david@example.com',
          role: 'Member'
        }
      ],

      // Clubs and navigation
      userClubs: [],
      activeClubId: null,
      activeClub: null,
      activePanel: 'members',

      // Data
      members: [],
      messages: [],
      currentBook: null,
      newMessage: '',

      // UI states
      loading: false,
      sending: false,
      creatingClub: false,
      error: null,
      showCreateClub: false,

      // New club form
      newClub: {
        clubName: '',
        clubDescription: '',
        ownerId: null
      }
    }
  },
  async created() {
    // No initialization needed - users are hardcoded
  },
  methods: {
    // Simple user selection - no login required
    selectUser(user) {
      this.currentUser = user;
      this.newClub.ownerId = user.userId;
      this.loadUserClubs();
    },

    createDemoUser() {
      const demoUser = {
        userId: Date.now(),
        username: 'demo_user',
        displayName: 'Demo User',
        email: 'demo@example.com',
        role: 'Member'
      };
      this.availableUsers.push(demoUser);
      this.selectUser(demoUser);
    },

    async loadUserClubs() {
      try {
        this.loading = true;
        const allClubs = await apiService.bookClub.getAll();

        // Show all clubs for demo (no filtering by owner)
        this.userClubs = allClubs;

        // Set first club as active if available
        if (this.userClubs.length > 0 && !this.activeClubId) {
          this.activeClubId = this.userClubs[0].clubId;
          await this.loadClubData(this.activeClubId);
        }
      } catch (error) {
        this.error = 'Failed to load clubs: ' + error.message;
      } finally {
        this.loading = false;
      }
    },

    async loadClubData(clubId) {
      this.loading = true;
      try {
        // For demo, just use the first club from the list
        this.activeClub = this.userClubs.find(club => club.clubId === clubId);

        // Load mock data using hardcoded users
        await this.loadClubMembers(clubId);
        await this.loadCurrentBook(clubId);
        await this.loadMessages(clubId);

      } catch (error) {
        this.error = 'Failed to load club data: ' + error.message;
      } finally {
        this.loading = false;
      }
    },

    async loadClubMembers(clubId) {
      // Use hardcoded users for members
      this.members = this.availableUsers.slice(0, 4).map((user, index) => ({
        ...user,
        role: index === 0 ? 'Owner' : 'Member'
      }));
    },

    async loadCurrentBook(clubId) {
      // Mock book data
      this.currentBook = {
        bookId: 1,
        title: 'The Midnight Library',
        author: 'Matt Haig',
        genre: 'Fiction',
        pages: 304,
        yearPublished: 2020,
        description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.'
      };
    },

    async loadMessages(clubId) {
      // Mock messages using hardcoded users
      this.messages = [
        {
          id: 1,
          userId: 1,
          userName: 'John Reader',
          content: "Welcome to our book club! I'm excited to discuss great books with everyone.",
          timestamp: new Date(Date.now() - 3600000),
          likes: 2
        },
        {
          id: 2,
          userId: 2,
          userName: 'Sarah Books',
          content: "Thanks for creating this club! I just finished our current book and can't wait to discuss it.",
          timestamp: new Date(Date.now() - 1800000),
          likes: 5
        },
        {
          id: 3,
          userId: 3,
          userName: 'Mike Literature',
          content: "The character development in this book was incredible. What did everyone think about Nora's journey?",
          timestamp: new Date(Date.now() - 900000),
          likes: 3
        },
        {
          id: 4,
          userId: 4,
          userName: 'Emily Novels',
          content: "I loved the concept of the midnight library! It really made me think about the choices I've made in life.",
          timestamp: new Date(Date.now() - 600000),
          likes: 4
        }
      ];
    },

    async switchClub(clubId) {
      this.activeClubId = clubId;
      await this.loadClubData(clubId);
    },

    async sendMessage() {
      if (!this.newMessage.trim()) return;

      this.sending = true;
      try {
        // Add message directly to the list
        const newMessage = {
          id: Date.now(),
          userId: this.currentUser.userId,
          userName: this.currentUser.displayName || this.currentUser.username,
          content: this.newMessage.trim(),
          timestamp: new Date(),
          likes: 0
        };

        this.messages.push(newMessage);
        this.newMessage = '';

        // Scroll to bottom
        this.$nextTick(() => {
          this.scrollToBottom();
        });

      } catch (error) {
        this.error = 'Failed to send message: ' + error.message;
      } finally {
        this.sending = false;
      }
    },

    async likeMessage(messageId) {
      const message = this.messages.find(m => m.id === messageId);
      if (message) {
        message.likes++;
      }
    },

    async createNewClub() {
      if (!this.newClub.clubName.trim() || !this.newClub.clubDescription.trim()) return;

      this.creatingClub = true;
      try {
        const newClub = await apiService.bookClub.create(this.newClub);
        this.userClubs.push(newClub);
        this.showCreateClub = false;
        this.newClub = { clubName: '', clubDescription: '', ownerId: this.currentUser.userId };

        // Switch to the new club
        this.activeClubId = newClub.clubId;
        await this.loadClubData(newClub.clubId);

      } catch (error) {
        this.error = 'Failed to create club: ' + error.message;
      } finally {
        this.creatingClub = false;
      }
    },

    async refreshData() {
      if (this.activeClubId) {
        await this.loadClubData(this.activeClubId);
      }
    },

    scrollToBottom() {
      const messagesContainer = this.$el.querySelector('.messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    },

    getInitials(name) {
      return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '?';
    },

    getAvatarColor(userId) {
      const colors = ['#6264a7', '#7fba00', '#ffb900', '#f25022', '#00a4ef', '#804d7a', '#0099bc'];
      return colors[userId % colors.length];
    },

    getClubColor(clubId) {
      const colors = ['#7fba00', '#ffb900', '#f25022', '#00a4ef', '#804d7a'];
      return colors[clubId % colors.length];
    },

    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString([], {
        hour: '2-digit', minute: '2-digit'
      });
    },

    togglePanel(panel) {
      this.activePanel = this.activePanel === panel ? null : panel;
    }
  }
}
</script>

<style scoped>
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', SegoeUI, "Helvetica Neue", Helvetica, Arial, sans-serif;
  background-color: #f8f8f8;
  color: #323130;
  height: 100vh;
  overflow: hidden;
}

#app {
  height: 100vh;
  display: flex;
}

/* User Selection Styles */
.user-selection {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.selection-box {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 500px;
  width: 90%;
}

.selection-box h2 {
  color: #323130;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
}

.selection-box p {
  color: #605e5c;
  margin-bottom: 2rem;
}

.user-options {
  margin: 1.5rem 0;
}

.user-option {
  display: flex;
  align-items: center;
  padding: 1.25rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.user-option:hover {
  border-color: #6264a7;
  background: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(98, 100, 167, 0.1);
}

.user-option:active {
  transform: translateY(0);
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #6264a7;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.user-info {
  text-align: left;
  flex: 1;
}

.user-name {
  font-weight: 600;
  color: #323130;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.user-email {
  font-size: 0.9rem;
  color: #605e5c;
}

.demo-btn {
  background: #f3f2f1;
  color: #323130;
  border: 2px solid transparent;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
}

.demo-btn:hover {
  background: #e1dfdd;
  border-color: #d0d0d0;
}

/* App Container */
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;
}

/* Top Bar */
.top-bar {
  background: white;
  border-bottom: 1px solid #edebe9;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  z-index: 100;
}

.user-info-top {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
  color: #323130;
}

.logout-btn {
  background: #6264a7;
  color: white;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background: #55578c;
}

/* App Content */
.app-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background-color: #f3f2f1;
  border-right: 1px solid #edebe9;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.logo-area {
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid #edebe9;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: white;
}

.logo {
  width: 40px;
  height: 40px;
  background: #6264a7;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
}

.app-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #323130;
}

.nav-section {
  padding: 1rem 0;
  border-bottom: 1px solid #edebe9;
}

.nav-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #605e5c;
  padding: 0 1.25rem 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-item {
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background-color: #edebe9;
}

.nav-item.active {
  background-color: #e1dfdd;
  border-left-color: #6264a7;
}

.nav-icon {
  width: 20px;
  text-align: center;
  color: #605e5c;
  font-size: 0.9rem;
}

.nav-text {
  font-size: 0.9rem;
  color: #323130;
  font-weight: 500;
}

.create-club {
  border-top: 1px solid #edebe9;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
}

.create-club .nav-icon {
  color: #6264a7;
}

.current-book {
  padding: 1.25rem;
  border-bottom: 1px solid #edebe9;
  background: white;
  margin: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.book-cover-small {
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 6px;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  padding: 0.5rem;
}

.book-title-small {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #323130;
}

.book-author-small {
  font-size: 0.85rem;
  color: #605e5c;
}

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
}

.channel-top-bar {
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #edebe9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
}

.channel-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.channel-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #323130;
}

.member-count {
  font-size: 0.9rem;
  color: #605e5c;
  background: #f3f2f1;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
}

.top-bar-actions {
  display: flex;
  gap: 0.5rem;
}

.action-icon {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #605e5c;
  transition: all 0.2s;
}

.action-icon:hover {
  background-color: #f3f2f1;
  color: #323130;
}

/* Discussion Area */
.discussion-area {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
}

/* Messages Container */
.messages {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  background: #f8f9fa;
}

.message {
  display: flex;
  margin-bottom: 1.25rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: background-color 0.2s;
  background: white;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.message:hover {
  background-color: #fafafa;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #6264a7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.375rem;
  gap: 0.5rem;
}

.message-author {
  font-weight: 600;
  font-size: 0.9rem;
  color: #323130;
}

.message-time {
  font-size: 0.75rem;
  color: #605e5c;
}

.message-text {
  font-size: 0.9rem;
  line-height: 1.4;
  color: #323130;
  word-wrap: break-word;
}

.message-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.message-action {
  font-size: 0.75rem;
  color: #605e5c;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: color 0.2s;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.message-action:hover {
  color: #323130;
  background: #f3f2f1;
}

/* Message Input */
.message-input-container {
  padding: 1.5rem;
  border-top: 1px solid #edebe9;
  background: white;
}

.message-input {
  width: 100%;
  min-height: 44px;
  border: 1px solid #edebe9;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  resize: none;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
}

.message-input:focus {
  border-color: #6264a7;
  box-shadow: 0 0 0 2px rgba(98, 100, 167, 0.1);
}

.input-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.75rem;
}

.send-button {
  background-color: #6264a7;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.send-button:hover:not(:disabled) {
  background-color: #55578c;
}

.send-button:disabled {
  background-color: #a19f9d;
  cursor: not-allowed;
}

/* Panels */
.members-panel, .book-panel {
  width: 300px;
  background-color: white;
  border-left: 1px solid #edebe9;
  padding: 1.5rem;
  overflow-y: auto;
}

.panel-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: #323130;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #edebe9;
}

/* Members Panel */
.member {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s;
}

.member:hover {
  background-color: #f8f8f8;
}

.member-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #6264a7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.member-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: #323130;
}

.member-role {
  font-size: 0.75rem;
  color: #605e5c;
  margin-top: 0.125rem;
}

/* Book Panel */
.book-cover-large {
  width: 160px;
  height: 220px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  margin: 0 auto 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  text-align: center;
  padding: 1rem;
  font-size: 1.1rem;
}

.book-title-large {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
  color: #323130;
}

.book-author-large {
  font-size: 1rem;
  color: #605e5c;
  text-align: center;
  margin-bottom: 1.5rem;
}

.book-meta {
  margin-bottom: 1.5rem;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #edebe9;
}

.meta-label {
  font-size: 0.9rem;
  color: #605e5c;
}

.meta-value {
  font-size: 0.9rem;
  font-weight: 500;
  color: #323130;
}

.book-description {
  font-size: 0.9rem;
  line-height: 1.5;
  color: #323130;
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 3px solid #6264a7;
}

/* No Club State */
.no-club {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
}

.no-club-content {
  text-align: center;
  color: #605e5c;
  max-width: 400px;
  padding: 2rem;
}

.no-club-content i {
  font-size: 4rem;
  color: #d0d0d0;
  margin-bottom: 1.5rem;
}

.no-club-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: #323130;
}

.no-club-content p {
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.create-club-btn {
  background: #6264a7;
  color: white;
  border: none;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s;
}

.create-club-btn:hover {
  background: #55578c;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.modal h2 {
  margin-bottom: 1.5rem;
  color: #323130;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #323130;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #edebe9;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #6264a7;
  outline: none;
  box-shadow: 0 0 0 2px rgba(98, 100, 167, 0.1);
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.cancel-btn, .create-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s;
}

.cancel-btn {
  background: #f3f2f1;
  color: #323130;
}

.cancel-btn:hover {
  background: #e1dfdd;
}

.create-btn {
  background: #6264a7;
  color: white;
}

.create-btn:hover:not(:disabled) {
  background: #55578c;
}

.create-btn:disabled {
  background: #a19f9d;
  cursor: not-allowed;
}

/* Loading and States */
.loading, .empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #605e5c;
  text-align: center;
}

.loading {
  background: #f8f9fa;
}

.empty-state {
  background: white;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #d0d0d0;
}

.empty-state h3 {
  margin-bottom: 0.5rem;
  color: #323130;
}

.empty-state p {
  color: #605e5c;
}

.error {
  background: #fef7f7;
  border: 1px solid #d13438;
  color: #d13438;
  padding: 1rem;
  margin: 1rem;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.retry-btn {
  background: #d13438;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
}

.retry-btn:hover {
  background: #c02a2e;
}

/* Scrollbar Styling */
.messages::-webkit-scrollbar,
.sidebar::-webkit-scrollbar,
.members-panel::-webkit-scrollbar,
.book-panel::-webkit-scrollbar {
  width: 6px;
}

.messages::-webkit-scrollbar-track,
.sidebar::-webkit-scrollbar-track,
.members-panel::-webkit-scrollbar-track,
.book-panel::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.messages::-webkit-scrollbar-thumb,
.sidebar::-webkit-scrollbar-thumb,
.members-panel::-webkit-scrollbar-thumb,
.book-panel::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.messages::-webkit-scrollbar-thumb:hover,
.sidebar::-webkit-scrollbar-thumb:hover,
.members-panel::-webkit-scrollbar-thumb:hover,
.book-panel::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Responsive Design */
@media (max-width: 768px) {
  .app-content {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    max-height: 200px;
  }

  .discussion-area {
    flex-direction: column;
  }

  .members-panel, .book-panel {
    width: 100%;
    max-height: 300px;
  }

  .top-bar {
    padding: 1rem;
  }

  .channel-top-bar {
    padding: 0 1rem;
  }
}

/* Animation for new messages */
@keyframes messageSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message:last-child {
  animation: messageSlideIn 0.3s ease-out;
}

/* Focus states for accessibility */
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid #6264a7;
  outline-offset: 2px;
}

/* Selection styles */
::selection {
  background: rgba(98, 100, 167, 0.2);
}
</style>