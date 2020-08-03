import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Chat from '../views/Chat.vue'
import Agent from '../views/Agent.vue'
import Test from '../views/Test.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,

    },
    {
        path: '/chat',
        name: 'Chat',
        component: Chat,
        beforeEnter:(to, from, next) =>{
            var data = sessionStorage.getItem("login")
            if(!data){
                next("/");
            }else{
                next();
            }
        },

    },
    {
        path: '/agent',
        name: 'Agent',
        component: Agent,
        beforeEnter:(to, from, next) =>{
            var data = sessionStorage.getItem("login")
            if(!data){
                next("/");
            }else{
                next();
            }
        },

    },
    {
        path: '/test',
        name: 'Test',
        component: Test,

    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router