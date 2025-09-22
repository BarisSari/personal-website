import plugin_gridsome_plugin_netlify_cms_6 from "/Users/baris/Documents/WebstormProjects/personal-website/node_modules/gridsome-plugin-netlify-cms/gridsome.client.js"
import plugin_gridsome_plugin_google_analytics_8 from "/Users/baris/Documents/WebstormProjects/personal-website/node_modules/@gridsome/plugin-google-analytics/gridsome.client.js"
import plugin_gridsome_plugin_manifest_10 from "/Users/baris/Documents/WebstormProjects/personal-website/node_modules/gridsome-plugin-manifest/gridsome.client.js"

export default [
  {
    run: plugin_gridsome_plugin_netlify_cms_6,
    options: {"publicPath":"/admin","htmlTitle":"Content Editor","configPath":"src/admin/config.yml","modulePath":"/Users/baris/Documents/WebstormProjects/personal-website/node_modules/gridsome-plugin-netlify-cms/lib/cms.js","htmlPath":"/Users/baris/Documents/WebstormProjects/personal-website/node_modules/gridsome-plugin-netlify-cms/templates/index.html","injectScript":true,"enableIdentityWidget":true,"debug":false}
  },
  {
    run: plugin_gridsome_plugin_google_analytics_8,
    options: {"id":"G-NW868L4FVL"}
  },
  {
    run: plugin_gridsome_plugin_manifest_10,
    options: {"background_color":"#000000","icon_path":"./src/assets/favicon.png","name":"My Personal Website","short_name":"barissari.com","theme_color":"#FFFFFF","lang":"en","display":"minimal-ui","file_name":"manifest.json","orientation":"any","scope":"/","start_url":"/","dir":"auto","prefer_related_applications":false,"related_applications":[]}
  }
]
