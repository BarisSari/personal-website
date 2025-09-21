<template>
  <div class="tech-left">
    <router-link to="/" class="tech-left__link">
      <h2>Baris Sari</h2>
    </router-link>
    <span class="tech-left__separator">|</span>
    <router-link to="/tech-blog" class="tech-left__blog-link">
      <h3>Tech Blog</h3>
    </router-link>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed
</script>

<style lang="scss" scoped>
.tech-left {
  display: flex;
  align-items: center;
  gap: 1rem;

  &__link,
  &__blog-link {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: none;
      color: inherit;
    }
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }

  h3 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 500;
  }

  &__separator {
    color: #ccc;
    font-size: 1.2rem;
  }
}
</style>