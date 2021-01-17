// Import main css
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '~/assets/style/index.scss';
import BootstrapVue from 'bootstrap-vue';
import VueGtag from 'vue-gtag';
// Import default layout so we don't need to import it to every page
import DefaultLayout from '~/layouts/Default.vue';

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { head }) {
  Vue.use(BootstrapVue);
  Vue.use(VueGtag, {
    config: { id: 'G-NW868L4FVL' },
  });
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);

  head.link.push({
    rel: 'stylesheet',
    href: 'https://github.githubassets.com/assets/gist-embed-fade154c2b3e75984195a048041ab52d.css',
  });
}
