<template>
  <div :class="`${type}-left`">
    <router-link
      to="/"
      :class="`${type}-left__link`"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  type: 'tech' | 'travels'
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.tech-left,
.travels-left {
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
    color: var(--border-color);
    font-size: 1.2rem;
  }
}

// Travels-specific overrides
.travels-left {
  &__link,
  &__blog-link {
    color: var(--title-color);

    &:hover {
      color: var(--link-color);
    }
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
  }

  &__separator {
    color: var(--border-color);
  }
}
</style>
