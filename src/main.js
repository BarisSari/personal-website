// Import main css
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '~/assets/style/index.scss'
import BootstrapVue from 'bootstrap-vue'
import VueGtag from "vue-gtag";
// Import default layout so we don't need to import it to every page
import DefaultLayout from '~/layouts/Default.vue'

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient }) {
  Vue.use(BootstrapVue)
  Vue.use(VueGtag, {
    config: { id: process.env.TRACKING_ID }
  });
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
