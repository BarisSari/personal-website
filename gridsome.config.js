const { join } = require('path')

module.exports = {
  chainWebpack: config => {
    config.module
        .rule('vue')
        .use('vue-svg-inline-loader')
        .loader('vue-svg-inline-loader') // in your project
        // .loader(join('./src/main.js'))
        // .options({ /* ... */ })
  },
  siteName: 'barissari.com',
  siteDescription: 'Personal website of a freelance Python Developer, who loves travelling and movies a lot!',
  siteUrl: 'localhost:8080',
  templates: {
    ErasmusPost: '/blog/erasmus/:title',
    Post: '/blog/:title',
    ErasmusTag: '/tag/erasmus/:id',
    Tag: '/tag/:id'
  },

  plugins: [
    {
      // Create posts from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: 'content/posts/*.md',
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      }
    },
    {
      // Create posts from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'ErasmusPost',
        path: 'content/posts/erasmus/*.md',
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: 'ErasmusTag',
            create: true
          }
        }
      }
    }
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        '@gridsome/remark-prismjs'
      ]
    }
  },
}
