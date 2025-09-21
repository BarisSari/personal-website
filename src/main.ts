import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import './assets/style/index.scss'

// Google Analytics
import { createGtag } from 'vue-gtag'

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(router)
app.use(createGtag, {
  config: { id: 'G-NW868L4FVL' }
})

app.mount('#app')

