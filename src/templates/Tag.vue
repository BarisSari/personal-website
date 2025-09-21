<template>
  <div class="tag-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>Posts tagged with "{{ tagName }}"</h1>
          <div class="row">
            <div
              v-for="post in taggedPosts"
              :key="post.slug"
              class="col-12 col-md-6 col-lg-4 mb-4"
            >
              <PostCard :post="post" type="tech" />
            </div>
          </div>
          <div v-if="taggedPosts.length === 0" class="no-posts">
            <p>No posts found with this tag.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getPostsByTag, type MarkdownPost } from '../utils/markdown'
import PostCard from '../components/PostCard.vue'

const route = useRoute()
const tagName = computed(() => route.params.id as string)

const taggedPosts = computed(() => {
  return getPostsByTag(tagName.value).filter(post => post.type === 'tech')
})
</script>

<style lang="scss" scoped>
.tag-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
}

.no-posts {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
}
</style>