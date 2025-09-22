<template>
  <div class="index-page">
    <Author :show-icons="true" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Author from '../components/Author.vue'

onMounted(() => {
  document.title = 'Baris Sari - Software Developer'
})
</script>

<style lang="scss" scoped>
.index-page {
  max-width: 800px;
  margin: 0 auto;
}
</style>