<template>
  <!-- Cover Image - At the very top of the page -->
  <div
    v-if="coverImage"
    :class="`${type}-post__cover`"
  >
    <img
      :src="coverImage"
      :alt="post?.title || 'Post image'"
      :class="`${type}-post__cover-image`"
    >
    <div
      v-if="photoCredit"
      :class="`${type}-post__photo-credit`"
      v-html="photoCredit"
    />
  </div>
  
  <!-- Main Content -->
  <div :class="`${type}-post`">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div :class="`${type}-post__header`">
            <h1 :class="`${type}-post__title`">
              {{ post?.title || 'Untitled' }}
            </h1>
            <div :class="`${type}-post__meta`">
              <span :class="`${type}-post__date`">{{ post?.date ? formatDate(post.date) : '' }}</span>
              <div
                v-if="post?.tags?.length"
                :class="`${type}-post__tags`"
              >
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  :class="`${type}-post__tag`"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
          
          <div
            :class="`${type}-post__content`"
            v-html="renderedContent"
          />
          
          <div :class="`${type}-post__footer`">
            <router-link
              :to="`/${type}-blog`"
              class="btn btn-outline-primary"
            >
              ← Back to {{ type === 'tech' ? 'Tech' : 'Travels' }} Blog
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getPostBySlug, type MarkdownPost } from '../utils/markdown'
import { processGistUrls } from '../utils/gist'
import MarkdownIt from 'markdown-it'

interface Props {
  type: 'tech' | 'travels'
}

const props = defineProps<Props>()
const route = useRoute()

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})


const post = computed(() => {
  const slug = route.params.slug as string
  console.log('PostTemplate - Route params:', route.params)
  console.log('PostTemplate - Looking for ' + props.type + ' post with slug:', slug)
  console.log('PostTemplate - Route path:', route.path)
  console.log('PostTemplate - Route name:', route.name)
  return getPostBySlug(slug, props.type) || {
    title: 'Post Not Found',
    date: new Date().toISOString(),
    tags: [],
    content: 'The requested post could not be found.',
    slug: ''
  }
})

const coverImage = computed(() => {
  if (post.value?.frontmatter?.cover_image) {
    const coverImage = post.value.frontmatter.cover_image
    // If it's a relative path, make it absolute
    if (coverImage.startsWith('../')) {
      return coverImage.replace('../', '/content/posts/' + props.type + '/')
    }
    // Handle ./images/ format (legacy, should be ../images/)
    if (coverImage.startsWith('./images/')) {
      return coverImage.replace('./images/', '/content/posts/' + props.type + '/images/')
    }
    // If it's already a full path or URL, use it as is
    return coverImage
  }
  return null
})

const photoCredit = computed(() => {
  if (post.value?.frontmatter?.photographer && post.value?.frontmatter?.image_link) {
    return 'Photo by ' + post.value.frontmatter.photographer + ' on ' + post.value.frontmatter.image_link
  }
  return null
})

const renderedContent = computed(() => {
  if (!post.value) return ''
  
  console.log(props.type + 'Post - Rendering content for:', post.value.title)
  
  const rendered = md.render(post.value.content)
  
  // Fix Medium CDN URLs to use the redirected format
  let fixedRendered = rendered.replace(
    /https:\/\/cdn-images-1\.medium\.com\/max\/\d+\//g,
    'https://cdn-images-1.medium.com/v2/resize:fit:12480/'
  )
  
  // Process GitHub Gist URLs
  fixedRendered = processGistUrls(fixedRendered)
  
  console.log(props.type + 'Post - Fixed image URLs and processed Gists in rendered content')
  
  return fixedRendered
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Watch for post changes and update document title
watch(post, (newPost) => {
  if (newPost && newPost.title) {
    const blogType = props.type === 'tech' ? 'Tech' : 'Travels'
    document.title = `${newPost.title} - ${blogType} Blog | Baris Sari`
  }
}, { immediate: true })

onMounted(() => {
  // Scroll to top when post loads
  window.scrollTo({ top: 0, behavior: 'smooth' })
  
  // Add error handling for images
  const images = document.querySelectorAll('img')
  images.forEach(img => {
    img.addEventListener('error', (e) => {
      console.error('Image failed to load:', img.src)
      // You could set a fallback image here if needed
    })
    img.addEventListener('load', () => {
      console.log('Image loaded successfully:', img.src)
    })
  })

  // Load GitHub Gist embeds dynamically
  const gistEmbeds = document.querySelectorAll('.gist-embed')
  gistEmbeds.forEach(embed => {
    const gistId = embed.getAttribute('data-gist-id')
    if (gistId) {
      // Create and load the Gist script
      const script = document.createElement('script')
      script.src = 'https://gist.github.com/' + gistId + '.js'
      script.async = true
      embed.appendChild(script)
    }
  })
})
</script>

<style lang="scss" scoped>
.tech-post,
.travels-post {
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;

  &__header {
    margin-bottom: 2rem;
    text-align: center;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    line-height: 1.2;
    color: var(--title-color);
    letter-spacing: -0.02em;
    text-align: center;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  &__date {
    color: var(--body-color);
    font-size: 1.1rem;
    opacity: 0.8;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }

  &__content {
    line-height: 1.8;
    font-size: 1.1rem;

    :deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(h5), :deep(h6) {
      margin: 2rem 0 1rem 0;
      font-weight: 600;
      color: var(--title-color);
    }

    :deep(p) {
      margin-bottom: 1.5rem;
    }

    :deep(img) {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 1rem 0;
      display: block;
    }

    :deep(code) {
      background-color: var(--bg-code);
      color: var(--body-color);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
    }

    :deep(pre) {
      background-color: var(--bg-code);
      color: var(--body-color);
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
      margin: 1.5rem 0;
    }

    :deep(blockquote) {
      border-left: 4px solid var(--link-color);
      padding-left: 1rem;
      margin: 1.5rem 0;
      font-style: italic;
      color: var(--body-color);
      opacity: 0.8;
    }

    :deep(.gist) {
      margin: 1.5rem 0;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    :deep(.gist-file) {
      border: none !important;
    }

    // Improve link readability in content
    :deep(a) {
      color: var(--link-color) !important;
      text-decoration: underline !important;
      text-decoration-color: var(--link-color) !important;
      text-underline-offset: 2px;
      transition: opacity 0.2s ease;
      
      &:hover {
        opacity: 0.7 !important;
        text-decoration: underline !important;
        text-decoration-color: var(--link-color) !important;
      }
    }
  }

  &__footer {
    margin-top: 3rem;
    text-align: center;
  }
}

// Tech-specific styles
.tech-post {
  &__cover {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-bottom: 3rem;
    text-align: center;
  }

  &__cover-image {
    width: 100%;
    height: auto;
    display: block;
  }

  &__photo-credit {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--body-color);
    font-style: italic;
    opacity: 0.8;
  }

  &__tag {
    background-color: var(--bg-code);
    color: var(--body-color);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
  }
}

// Travels-specific styles
.travels-post {
  &__cover {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-bottom: 3rem;
    text-align: center;
  }

  &__cover-image {
    width: 100%;
    height: auto;
    display: block;
  }

  &__photo-credit {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--body-color);
    opacity: 0.8;
    
  }

  &__tag {
    background-color: var(--bg-code);
    color: var(--body-color);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
  }

  :deep(blockquote) {
    border-left: 4px solid var(--link-color);
  }
}
</style>
