const c1 = () => import(/* webpackChunkName: "page--src--templates--tag-vue" */ "/Users/baris/Documents/WebstormProjects/personal-website/src/templates/Tag.vue")
const c2 = () => import(/* webpackChunkName: "page--src--templates--travel-tag-vue" */ "/Users/baris/Documents/WebstormProjects/personal-website/src/templates/TravelTag.vue")
const c3 = () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/baris/Documents/WebstormProjects/personal-website/src/templates/Post.vue")
const c4 = () => import(/* webpackChunkName: "page--src--templates--travel-post-vue" */ "/Users/baris/Documents/WebstormProjects/personal-website/src/templates/TravelPost.vue")
const c5 = () => import(/* webpackChunkName: "page--src--pages--tech-blog-vue" */ "/Users/baris/Documents/WebstormProjects/personal-website/src/pages/TechBlog.vue")
const c6 = () => import(/* webpackChunkName: "page--src--pages--travels-blog-vue" */ "/Users/baris/Documents/WebstormProjects/personal-website/src/pages/TravelsBlog.vue")
const c7 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/baris/Documents/WebstormProjects/personal-website/node_modules/gridsome/app/pages/404.vue")
const c8 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/baris/Documents/WebstormProjects/personal-website/src/pages/Index.vue")

export default [
  {
    path: "/tag/tech/:id/",
    component: c1
  },
  {
    path: "/tag/travels/:id/",
    component: c2
  },
  {
    path: "/blog/tech/:title/",
    component: c3
  },
  {
    path: "/blog/travels/:title/",
    component: c4
  },
  {
    path: "/tech-blog/",
    component: c5
  },
  {
    path: "/travels-blog/",
    component: c6
  },
  {
    name: "404",
    path: "/404/",
    component: c7
  },
  {
    name: "home",
    path: "/",
    component: c8
  },
  {
    name: "*",
    path: "*",
    component: c7
  }
]
