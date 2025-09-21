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
import { ref, onMounted } from 'vue'
import { getPostsByType, type MarkdownPost } from '../utils/markdown'
import PostCard from '../components/PostCard.vue'

interface Props {
  type: 'tech' | 'travels'
}

const props = defineProps<Props>()

const posts = ref<MarkdownPost[]>([])

onMounted(() => {
  posts.value = getPostsByType(props.type)
  console.log(`BlogPage - Loading ${props.type} posts:`, posts.value.length)
  console.log(`BlogPage - Posts:`, posts.value.map(p => ({ slug: p.slug, title: p.title })))
})
</script>

<style lang="scss" scoped>
.tech-blog,
.travels-blog {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--title-color);
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
