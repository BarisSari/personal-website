<template>
  <div class="post">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="post__header">
            <h1 class="post__title">{{ post.title }}</h1>
            <div class="post__meta">
              <span class="post__date">{{ formatDate(post.date) }}</span>
              <div class="post__tags" v-if="post.tags.length">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="post__tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="post__content" v-html="renderedContent"></div>
          
          <div class="post__footer">
            <router-link to="/tech-blog" class="btn btn-outline-primary">
              ← Back to Tech Blog
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getPostBySlug, type MarkdownPost } from '../utils/markdown'
import MarkdownIt from 'markdown-it'
import markdownItPrism from 'markdown-it-prism'

const route = useRoute()
const md = new MarkdownIt().use(markdownItPrism)

const post = computed(() => {
  const slug = route.params.title as string
  return getPostBySlug(slug, 'tech') || {
    title: 'Post Not Found',
    date: new Date().toISOString(),
    tags: [],
    content: 'The requested post could not be found.',
    slug: ''
  }
})

const renderedContent = computed(() => {
  return md.render(post.value.content)
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
.post {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;

  &__header {
    margin-bottom: 2rem;
    text-align: center;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  &__date {
    color: #666;
    font-size: 1.1rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }

  &__tag {
    background-color: #f8f9fa;
    color: #495057;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
  }

  &__content {
    line-height: 1.8;
    font-size: 1.1rem;

    :deep(h1),
    :deep(h2),
    :deep(h3),
    :deep(h4),
    :deep(h5),
    :deep(h6) {
      margin-top: 2rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    :deep(p) {
      margin-bottom: 1.5rem;
    }

    :deep(code) {
      background-color: #f8f9fa;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
    }

    :deep(pre) {
      background-color: #f8f9fa;
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
      margin: 1.5rem 0;
    }

    :deep(blockquote) {
      border-left: 4px solid #007bff;
      padding-left: 1rem;
      margin: 1.5rem 0;
      font-style: italic;
      color: #666;
    }
  }

  &__footer {
    margin-top: 3rem;
    text-align: center;
  }
}
</style>