import Index from '@/pages/Index.vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/', name: 'Index', component: Index, redirect: '/home',
        children: [
            {
                path: 'home', name: 'Home', component: () => import('@/pages/home/Index.vue')
            }
        ]
    },
    {
        path: '/login', name: 'Login', component: () => import('@/pages/login/Index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

/**
 * 路由过渡动画
 */
router.afterEach((to, from) => {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})

export default router