module.exports = {
    publicPath: "",
    chainWebpack: config => {
        config.plugins.delete('prefetch')
        config.plugins.delete('preload')
    },
    pages: {
        index: {
            // entry for the page
            entry: 'src/main.js',
            // the source template
            template: 'public/index.html',
            filename: 'index.html',
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %</title>
            // title: 'Print Label'
        }
    }
}