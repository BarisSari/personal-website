<template>
  <div class="post-tags">
    <g-link
      v-for="tag in post.tags"
      :key="tag.id"
      class="post-tags__link"
      :to="tag.path"
    >
      <span>#</span> {{ tag.title }}
    </g-link>
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
.post-tags {
  margin: 1em 0 0;
  &__link {
    margin-right: .7em;
    font-size: .8em;
    color: currentColor;
    text-decoration: none;
    background-color: var(--bg-color);
    color: currentColor!important; //Todo: remove important;
    padding: .5em;
    border-radius: var(--radius);
  }
}
</style>
