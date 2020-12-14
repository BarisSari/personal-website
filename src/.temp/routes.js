const c1 = () => import(/* webpackChunkName: "page--src--templates--erasmus-tag-vue" */ "/Users/baris/Documents/WebstormProjects/personal-website/src/templates/ErasmusTag.vue")
const c2 = () => import(/* webpackChunkName: "page--src--templates--erasmus-post-vue" */ "/Users/baris/Documents/WebstormProjects/personal-website/src/templates/ErasmusPost.vue")
const c3 = () => import(/* webpackChunkName: "page--src--templates--tag-vue" */ "/Users/baris/Documents/WebstormProjects/personal-website/src/templates/Tag.vue")
const c4 = () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/baris/Documents/WebstormProjects/personal-website/src/templates/Post.vue")
const c5 = () => import(/* webpackChunkName: "page--src--pages--erasmus-blog-vue" */ "/Users/baris/Documents/WebstormProjects/personal-website/src/pages/ErasmusBlog.vue")
const c6 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/baris/Documents/WebstormProjects/personal-website/node_modules/gridsome/app/pages/404.vue")
const c7 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/baris/Documents/WebstormProjects/personal-website/src/pages/Index.vue")

export default [
  {
    path: "/tag/erasmus/:id/",
    component: c1
  },
  {
    path: "/blog/erasmus/:title/",
    component: c2
  },
  {
    path: "/tag/:id/",
    component: c3
  },
  {
    path: "/blog/:title/",
    component: c4
  },
  {
    path: "/erasmus-blog/",
    component: c5
  },
  {
    name: "404",
    path: "/404/",
    component: c6
  },
  {
    name: "home",
    path: "/",
    component: c7
  },
  {
    name: "*",
    path: "*",
    component: c6
  }
]
