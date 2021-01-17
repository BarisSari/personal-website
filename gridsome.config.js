module.exports = {
  siteName: 'barissari.com',
  siteDescription: 'Personal website of a freelance Software Developer, who loves travelling and movies a lot!',
  siteUrl: 'barissari.com',
  templates: {
    ErasmusPost: '/blog/erasmus/:title',
    Post: '/blog/tech/:title',
    ErasmusTag: '/tag/erasmus/:id',
    Tag: '/tag/tech/:id',
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
            create: true,
          },
        },
      },
    },
    {
      use: 'gridsome-plugin-netlify-cms',
      options: {
        publicPath: '/admin',
      },
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
            create: true,
          },
        },
      },
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'G-NW868L4FVL',
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        config: {
          '/': {
            changefreq: 'weekly',
            priority: 0.9,
          },
          '/blog/erasmus/*': {
            changefreq: 'monthly',
            priority: 0.5,
          },
          '/blog/tech/*': {
            changefreq: 'monthly',
            priority: 0.7,
          },
          '/tag/erasmus/*': {
            changefreq: 'monthly',
            priority: 0.5,
          },
          '/tag/tech/*': {
            changefreq: 'monthly',
            priority: 0.7,
          },
        },
      },
    },
    {
      use: 'gridsome-plugin-manifest',
      options: {
        background_color: '#000000',
        icon_path: './src/assets/favicon.png',
        name: 'My Personal Website',
        short_name: 'barissari.com',
        theme_color: '#FFFFFF',
        lang: 'en',
      },
    },
    {
      use: 'gridsome-plugin-robots-txt',
      options: {
        sitemap: 'https://barissari.com/sitemap.xml',
      },
    },
  ],

  transformers: {
    // Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        ['@gridsome/remark-prismjs'],
        ['gridsome-plugin-remark-container'],
        ['@noxify/gridsome-plugin-remark-embed', {
          enabledProviders: [
            'Youtube',
            'Gist',
            'Codepen',
            'JSFiddle',
          ],
          Gist: {
            secureConnection: true,
          },
        }],
      ],
    },
  },
};
