<template>
  <div class="tech-blog">
    <div class="container">
      <h1>Technology Blog</h1>
      <div class="row">
        <div
          v-for="post in techPosts"
          :key="post.slug"
          class="col-12 col-md-6 col-lg-4 mb-4"
        >
          <PostCard :post="post" type="tech" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getPostsByType, type MarkdownPost } from '../utils/markdown'
import PostCard from '../components/PostCard.vue'

const techPosts = ref<MarkdownPost[]>([])

onMounted(() => {
  techPosts.value = getPostsByType('tech')
})
</script>

<style lang="scss" scoped>
.tech-blog {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
}
</style>