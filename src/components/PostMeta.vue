<template>
  <div class="post-meta">
    Posted {{ post.date }}.
    <template v-if="post.timeToRead">
      <strong>{{ post.timeToRead }} min read.</strong>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { MarkdownPost } from '../utils/markdown'

interface Props {
  post: MarkdownPost
}

defineProps<Props>()
</script>

<style lang="scss">
.post-meta {
  font-size: .8em;
  opacity: .8;
}
</style>
