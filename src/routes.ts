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
    component: () => import('./pages/BlogPage.vue'),
    props: { type: 'tech' }
  },
  {
    path: '/travels-blog',
    name: 'TravelsBlog',
    component: () => import('./pages/BlogPage.vue'),
    props: { type: 'travels' }
  },
  {
    path: '/blog/tech/:slug',
    name: 'TechPost',
    component: () => import('./templates/PostTemplate.vue'),
    props: { type: 'tech' }
  },
  {
    path: '/blog/travels/:slug',
    name: 'TravelPost',
    component: () => import('./templates/PostTemplate.vue'),
    props: { type: 'travels' }
  },
  {
    path: '/tag/tech/:id',
    name: 'TechTag',
    component: () => import('./pages/TagPage.vue'),
    props: (route) => ({ ...route.params, type: 'tech' })
  },
  {
    path: '/tag/travels/:id',
    name: 'TravelTag',
    component: () => import('./pages/TagPage.vue'),
    props: (route) => ({ ...route.params, type: 'travels' })
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
try {
  const markdownRoutes = createMarkdownRoutes()
  console.log('Created markdown routes:', markdownRoutes.length)
  console.log('Route paths:', markdownRoutes.map(r => r.path))
  routes.push(...markdownRoutes)
  console.log('Total routes:', routes.length)
} catch (error) {
  console.error('Error creating markdown routes:', error)
  // Continue without markdown routes if there's an error
}

export default routes

