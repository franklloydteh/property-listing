import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue';
import UserClient from "@/client/UserClient";
import qs from "qs";

const router = createRouter({
    parseQuery: qs.parse,
    stringifyQuery: qs.stringify,
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                { path: '/', component: () => import('@/views/HomePage.vue') },
                { path: '/login', component: () => import('@/views/LoginPage.vue') },
                { path: '/register', component: () => import('@/views/RegistrationPage.vue') },
                { path: '/search', component: () => import('@/views/SearchPage.vue') },
                {
                    path: '/property/:id',
                    meta: { requiresAuth: true },
                    component: () => import('@/views/PropertyPage.vue')
                },
                {
                    path: '/my/profile',
                    meta: { requiresAuth: true },
                    component: () => import('@/views/my/ProfilePage.vue')
                },
                {
                    path: '/my/property/list',
                    meta: { requiresAuth: true },
                    component: () => import('@/views/my/ListMyProperty.vue')
                },
                {
                    path: '/my/property/create',
                    meta: { requiresAuth: true },
                    component: () => import('@/views/my/CreateMyPropertyPage.vue')
                },
                {
                    path: '/my/property/:id',
                    meta: { requiresAuth: true },
                    component: () => import('@/views/my/UpdateMyPropertyPage.vue')
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (UserClient.isSignedIn()) {
            next();
        } else {
            UserClient.logout();
            next("/login");
        }
    } else {
        next();
    }
});

export default router
