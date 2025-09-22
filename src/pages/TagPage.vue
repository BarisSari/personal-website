<template>
  <div :class="`${type}-tag-page`">
    <div class="container">
      <h1>{{ type === 'tech' ? 'Technology' : 'Travel' }} posts tagged with "{{ tagName }}"</h1>
      <div class="posts-container">
        <div
          v-for="post in taggedPosts"
          :key="post.slug"
          class="post-wrapper"
        >
          <PostCard
            :post="post"
            :type="type"
          />
        </div>
        <div
          v-if="taggedPosts.length === 0"
          class="no-posts"
        >
          <p>No {{ type }} posts found with this tag.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getPostsByTag, type MarkdownPost } from '../utils/markdown'
import PostCard from '../components/PostCard.vue'

interface Props {
  type: 'tech' | 'travels'
}

const props = defineProps<Props>()
const route = useRoute()

const tagName = computed(() => route.params.id as string)

const taggedPosts = computed(() => {
  return getPostsByTag(tagName.value).filter(post => post.type === props.type)
})

// Watch for changes and update document title
watch([tagName, () => props.type], ([newTagName, newType]) => {
  const blogType = newType === 'tech' ? 'Technology' : 'Travel'
  document.title = `${blogType} posts tagged with "${newTagName}" | Baris Sari`
}, { immediate: true })
</script>

<style lang="scss" scoped>
.tech-tag-page,
.travels-tag-page {
  max-width: 800px;
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

.posts-container {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.post-wrapper {
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5rem;
}

.col-12 { flex: 0 0 100%; max-width: 100%; }
.col-md-6 { flex: 0 0 50%; max-width: 50%; }
.col-lg-4 { flex: 0 0 33.333333%; max-width: 33.333333%; }

@media (min-width: 768px) {
  .col-md-6 { flex: 0 0 50%; max-width: 50%; }
}

@media (min-width: 992px) {
  .col-lg-4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
}

.col-12, .col-md-6, .col-lg-4 {
  padding: 0 0.5rem;
}

.mb-4 { margin-bottom: 1.5rem; }

.no-posts {
  text-align: center;
  padding: 2rem;
  color: var(--body-color);
}
</style>
