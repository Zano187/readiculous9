import { createRouter, createWebHistory } from 'vue-router'

// Import your views
import Home from "@/views/home.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import LoginPage from "@/views/LoginPage.vue";
import Book from "@/views/book.vue";
import CreateClub from "@/views/CreateClub.vue";
import AdminPage from "@/views/AdminPage.vue";
import PreferencePage from "@/views/preferencepage.vue";
import Library from "@/views/Library.vue";
import Profile from "@/views/Profile.vue";
import UserBook from "@/views/UserBook.vue";
import About from "@/views/About.vue";
import ContactInfo from "@/views/ContactInfo.vue";


// Define routes
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/book', name: 'Book', component: Book },
    { path: '/create-club', name: 'CreateClub', component: CreateClub },
    { path: '/club/:id/admin', name: 'AdminPage', component: AdminPage },
    { path: '/preference', name: 'Preference', component: PreferencePage }, // <-- Make sure name matches router.push
    { path: '/library', name: 'Library', component: Library },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/userBook', name: 'UserBook', component: UserBook},
    { path: '/about', name: 'About', component: About },
    { path: '/contact', name: 'Contact', component: ContactInfo },

];

// Create router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
