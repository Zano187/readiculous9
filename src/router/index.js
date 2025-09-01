import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/home.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import LoginPage from "@/views/LoginPage.vue";
import Library from "@/views/Library.vue";


const routes = [
    {path: '/Home',name: 'Home', component: Home},
    {path: '/ForgotPassword',name: 'ForgotPassword', component: ForgotPassword},
    {path: '/Login', name: 'Login', component: LoginPage},
    {path: '/Library', name: 'Library', component: Library},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})




export default router
