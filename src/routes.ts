import type { RouteRecordRaw } from 'vue-router'
import { createMarkdownRoutes } from './utils/markdown'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/Index.vue')
  },
  {
    path: '/tech-blog',
    name: 'TechBlog',
    component: () => import('./pages/TechBlog.vue')
  },
  {
    path: '/travels-blog',
    name: 'TravelsBlog',
    component: () => import('./pages/TravelsBlog.vue')
  },
  {
    path: '/blog/tech/:title',
    name: 'TechPost',
    component: () => import('./templates/Post.vue'),
    props: true
  },
  {
    path: '/blog/travels/:title',
    name: 'TravelPost',
    component: () => import('./templates/TravelPost.vue'),
    props: true
  },
  {
    path: '/tag/tech/:id',
    name: 'TechTag',
    component: () => import('./templates/Tag.vue'),
    props: true
  },
  {
    path: '/tag/travels/:id',
    name: 'TravelTag',
    component: () => import('./templates/TravelTag.vue'),
    props: true
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('./admin/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./pages/404.vue')
  }
]

// Add dynamic routes for markdown posts
const markdownRoutes = createMarkdownRoutes()
routes.push(...markdownRoutes)

export default routes

