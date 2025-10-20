import { createRouter, createWebHistory } from 'vue-router'

// Import views
import Home from "@/views/Home.vue"
import ForgotPassword from "@/views/ForgotPassword.vue"
import LoginPage from "@/views/LoginPage.vue"
import Book from "@/views/Book.vue"
import CreateClub from "@/views/CreateClub.vue"
import AdminPage from "@/views/AdminPage.vue"
import PreferencePage from "@/views/PreferencePage.vue"
import Library from "@/views/Library.vue"
import Profile from "@/views/Profile.vue"
import UserBook from "@/views/UserBook.vue"
import ContactInfo from "@/views/ContactInfo.vue"

// Define routes
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/book', name: 'Book', component: Book },
    { path: '/create-club', name: 'CreateClub', component: CreateClub },
    { path: '/club/:id/admin', name: 'AdminPage', component: AdminPage },
    { path: '/preference', name: 'Preference', component: PreferencePage },
    { path: '/library', name: 'Library', component: Library },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/user-book', name: 'UserBook', component: UserBook },
    { path: '/contact', name: 'ContactInfo', component: ContactInfo },
]

// Create router instance
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})

export default router
