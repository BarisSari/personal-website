<template>
  <div class="main-left">
    <router-link to="/" class="main-left__link">
      <h2>Baris Sari</h2>
    </router-link>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed
</script>

<style lang="scss" scoped>
.main-left {
  &__link {
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
}
</style>