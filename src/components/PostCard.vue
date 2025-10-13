<template>
  <div class="post-card content-box">
    <router-link
      :to="postLink"
      class="post-card__link"
    >
      <div class="post-card__header">
        <div
          v-if="postImage"
          class="post-card__image"
        >
          <img
            :src="postImage"
            :alt="post.title"
            @error="handleImageError"
            @load="handleImageLoad"
          >
        </div>
        <div
          v-else
          class="post-card__no-image"
        >
          No image available
        </div>
      </div>
      <div class="post-card__content">
        <h2 class="post-card__title">
          {{ post.title }}
        </h2>
        <p
          v-if="post.description"
          class="post-card__description"
        >
          {{ post.description }}
        </p>
        <div class="post-meta post-card__meta">
          Posted {{ formatDate(post.date) }}.
          <strong>{{ post.readTime || '5' }} min read.</strong>
        </div>
        <div
          v-if="post.tags.length"
          class="post-tags post-card__tags"
        >
          <router-link
            v-for="tag in post.tags"
            :key="tag"
            :to="`/tag/${type}/${tag.toLowerCase()}/`"
            class="post-tags__link"
            @click.stop
          >
            #{{ tag }}
          </router-link>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MarkdownPost } from '../utils/markdown'
import { ErrorHandler } from '../utils/errorHandler'

interface Props {
  post: MarkdownPost
  type: 'tech' | 'travels'
}

const props = defineProps<Props>()

const postLink = computed(() => {
  return props.type === 'tech'
    ? `/blog/tech/${props.post.slug}`
    : `/blog/travels/${props.post.slug}`
})

const postImage = computed(() => {
  // First, check if there's a cover_image in frontmatter
  if (props.post.frontmatter?.cover_image) {
    const coverImage = props.post.frontmatter.cover_image
    // If it's a relative path, make it absolute
    if (coverImage.startsWith('../')) {
      const absolutePath = coverImage.replace('../', `/content/posts/${props.type}/`)
      return absolutePath
    }
    // Handle ./images/ format (legacy, should be ../images/)
    if (coverImage.startsWith('./images/')) {
      const absolutePath = coverImage.replace('./images/', `/content/posts/${props.type}/images/`)
      return absolutePath
    }
    // If it's already a full path or URL, use it as is
    return coverImage
  }

  // Try to find an image in the content
  const imageMatch = props.post.content.match(/!\[.*?\]\((.*?)\)/)
  if (imageMatch) {
    return imageMatch[1]
  }

  // Use default images based on type
  if (props.type === 'travels') {
    // Map post slugs to actual image filenames
    const imageMap: Record<string, string> = {
      'basel': 'basel-front.jpg',
      'colmar': 'colmar-front.jpg',
      'iceland': 'iceland-front.jpg',
      'italy-i-rome': 'rome-front.jpeg',
      'italy-ii': 'cinque-terre-front.jpg',
      'italy-iii': 'florence-front.jpg',
      'italy-iv': 'pisa-front.jpg',
      'italy-v': 'italy-v-front.jpg',
      'norway': 'norway-front.jpg',
      'paris': 'paris-front.jpg',
      'portugal': 'portugal-front.jpg',
      'south-korea-japan-i': 'japan-front-i.jpg',
      'south-korea-japan-ii': 'japan-front-ii.jpg',
      'thailand': 'thailand-front.jpg'
    }

    const imageFile = imageMap[props.post.slug.toLowerCase()]
    if (imageFile) {
      const imagePath = `/content/posts/travels/images/${imageFile}`
      return imagePath
    }
  }

  if (props.type === 'tech') {
    // Map tech post slugs to actual image filenames
    const techImageMap: Record<string, string> = {
      'pre-commit-hooks': 'precommit_front.jpeg',
      'sentence-tokenization': 'sentence-tokenization-front.jpeg',
      'upwork-guide': 'upwork_guide.jpg',
      'why-freelance': 'why_freelance_front.jpg'
    }

    const imageFile = techImageMap[props.post.slug.toLowerCase()]
    if (imageFile) {
      const imagePath = `/content/posts/tech/images/${imageFile}`
      return imagePath
    }
  }

  return null
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  ErrorHandler.handleImageError(img.src, new Error('Image failed to load'))
}

const handleImageLoad = () => {
  // Handle image load success silently
}
</script>

<style lang="scss">
.post-card {
  background-color: var(--bg-content-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 0;
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  border: 1px solid var(--border-color);

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  &__header {
    // Header contains the image
  }

  &__image {
    width: 100%;
    height: 400px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__no-image {
    width: 100%;
    height: 400px;
    background-color: var(--bg-code);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--body-color);
    font-style: italic;
    opacity: 0.8;
  }

  &__content {
    padding: 1.5rem;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    line-height: 1.3;
    color: var(--title-color);
  }

  &__description {
    color: var(--body-color);
    margin-bottom: 1rem;
    line-height: 1.6;
    font-size: 1rem;
    opacity: 0.8;
  }

  &__meta {
    font-size: 0.875rem;
    color: var(--body-color);
    margin-bottom: 1rem;
    opacity: 0.8;
  }

  &__tags {
    margin-bottom: 1rem;
  }

  &__link {
    display: block;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-4px);
      text-decoration: none;
    }

    &:hover * {
      text-decoration: none !important;
    }
  }
}

.post-tags__link {
  color: var(--link-color);
  text-decoration: none;
  font-size: 0.875rem;
  margin-right: 0.5rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
    text-decoration: none;
  }
}
</style>
