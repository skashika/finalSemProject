import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import postureRecognition from "@/views/postureRecognition";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/postureRecognition',
    name: 'postureRecognition',
    component: postureRecognition
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
