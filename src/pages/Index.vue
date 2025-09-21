<template>
  <div class="index-page">
    <!-- Author intro -->
    <Author :show-title="true" />
  </div>
</template>

<script setup lang="ts">
import Author from '../components/Author.vue'
</script>

<style lang="scss" scoped>
.index-page {
  max-width: 800px;
  margin: 0 auto;
}
</style>