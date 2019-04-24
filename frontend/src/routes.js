import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeVue from './components/Home'
import GalleryVue from './components/Gallery'
import ContactVue from './components/Contact'
import ProfileVue from './components/Profile'
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeVue
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileVue
    },
    {
        path: '/gallery',
        name: 'gallery',
        component: GalleryVue
    },
    {
        path: '/contact',
        name: 'contact',
        component: ContactVue
    },
    {
        path: '*',
        redirect: '/'
    }
]
export const router = new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes
});