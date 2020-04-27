import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeVue from './components/Home'
import WorksVue from './components/Works'
import ContactVue from './components/Contact'
import ProfileVue from './components/Profile'
import LoginVue from './components/login'
import TextVue from './components/Text'
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
        path: '/Works',
        name: 'works',
        component: WorksVue
    },
    {
        path: '/contact',
        name: 'contact',
        component: ContactVue
    },
    {
        path: '/login',
        name: 'login',
        component: LoginVue
    },
    {
        path: '/Text',
        name: 'text',
        component: TextVue
    },
    {
        path: '*',
        redirect: '/'
    },
 
]
export const router = new VueRouter({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes
});