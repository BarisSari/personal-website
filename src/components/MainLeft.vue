<template>
  <div class="main-left">
    <router-link
      to="/"
      class="main-left__link"
    />
  </div>
</template>

<script setup lang="ts">
// No additional logic needed
</script>

<style lang="scss" scoped>
.main-left {
  &__link {
    text-decoration: none;
    color: var(--title-color);

    &:hover {
      text-decoration: none;
      color: var(--link-color);
    }
  }

  h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
    text-align: center;
  }
}
</style>