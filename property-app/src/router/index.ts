import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    component: () => import('@/views/HomePage.vue')
                },
                {
                    path: '/login',
                    component: () => import('@/views/LoginPage.vue')
                },
                {
                    path: '/register',
                    component: () => import('@/views/RegistrationPage.vue')
                },
                {
                    path: '/search',
                    component: () => import('@/views/SearchPage.vue')
                },
                {
                    path: '/property/:id',
                    component: () => import('@/views/PropertyPage.vue')
                },
                {
                    path: '/my/profile',
                    component: () => import('@/views/my/ProfilePage.vue')
                },
                {
                    path: '/my/property/list',
                    component: () => import('@/views/my/ListMyProperty.vue')
                },
                {
                    path: '/my/property/create',
                    component: () => import('@/views/my/CreateMyPropertyPage.vue')
                },
                {
                    path: '/my/property/:id',
                    component: () => import('@/views/my/UpdateMyPropertyPage.vue')
                }
            ]
        }
    ]
})

export default router
