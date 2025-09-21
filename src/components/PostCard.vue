<template>
  <div class="post-card">
    <router-link :to="postLink" class="post-card__link">
      <div class="post-card__image" v-if="postImage">
        <img :src="postImage" :alt="post.title" />
      </div>
      <div class="post-card__content">
        <h3 class="post-card__title">{{ post.title }}</h3>
        <p class="post-card__description" v-if="post.description">
          {{ post.description }}
        </p>
        <div class="post-card__meta">
          <span class="post-card__date">{{ formatDate(post.date) }}</span>
          <div class="post-card__tags" v-if="post.tags.length">
            <span
              v-for="tag in post.tags.slice(0, 3)"
              :key="tag"
              class="post-card__tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MarkdownPost } from '../utils/markdown'

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
  // Try to find an image in the content or use a default
  const imageMatch = props.post.content.match(/!\[.*?\]\((.*?)\)/)
  if (imageMatch) {
    return imageMatch[1]
  }
  
  // Use default images based on type
  if (props.type === 'travels') {
    return `/content/posts/images/${props.post.slug.toLowerCase()}-front.jpg`
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
</script>

<style lang="scss" scoped>
.post-card {
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &__link {
    display: block;
    height: 100%;
    text-decoration: none;
    color: inherit;
  }

  &__image {
    width: 100%;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    padding: 1.5rem;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    line-height: 1.3;
  }

  &__description {
    color: #666;
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__date {
    font-size: 0.875rem;
    color: #888;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  &__tag {
    font-size: 0.75rem;
    background-color: #f8f9fa;
    color: #495057;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }
}
</style>