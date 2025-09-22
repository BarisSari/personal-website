<template>
  <div :class="`${type}-blog`">
    <div class="container">
      <h1>Welcome to {{ type === 'tech' ? 'Technology' : 'Traveling' }} Blog!</h1>
      <div class="posts-container">
        <div
          v-for="post in posts"
          :key="post.slug"
          class="post-wrapper"
        >
          <PostCard
            :post="post"
            :type="type"
          />
        </div>
        <div
          v-if="posts.length === 0"
          class="no-posts"
        >
          <p>No {{ type }} posts found. Please check back later!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getPostsByType, type MarkdownPost } from '../utils/markdown'
import PostCard from '../components/PostCard.vue'

interface Props {
  type: 'tech' | 'travels'
}

const props = defineProps<Props>()

const posts = ref<MarkdownPost[]>([])

// Watch for type changes and update document title
watch(() => props.type, (newType) => {
  const blogType = newType === 'tech' ? 'Technology' : 'Traveling'
  document.title = `${blogType} Blog | Baris Sari`
}, { immediate: true })

onMounted(() => {
  posts.value = getPostsByType(props.type)
})
</script>

<style lang="scss" scoped>
.tech-blog,
.travels-blog {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--title-color);
    letter-spacing: -0.02em;
    text-align: center;
    margin-bottom: 2rem;
  }
}

.container {
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.posts-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.post-wrapper {
  width: 100%;
}

.no-posts {
  text-align: center;
  padding: 3rem 2rem;
  color: var(--body-color);
  font-size: 1.1rem;
  opacity: 0.8;
}
</style>
