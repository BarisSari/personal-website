<template>
  <div class="travels-blog">
    <div class="container">
      <h1>Travels Blog</h1>
      <div class="row">
        <div
          v-for="post in travelPosts"
          :key="post.slug"
          class="col-12 col-md-6 col-lg-4 mb-4"
        >
          <PostCard :post="post" type="travels" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getPostsByType, type MarkdownPost } from '../utils/markdown'
import PostCard from '../components/PostCard.vue'

const travelPosts = ref<MarkdownPost[]>([])

onMounted(() => {
  travelPosts.value = getPostsByType('travels')
})
</script>

<style lang="scss" scoped>
.travels-blog {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
}
</style>