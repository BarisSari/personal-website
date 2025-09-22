<template>
  <div class="not-found">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h1 class="not-found__title">
            404
          </h1>
          <h2 class="not-found__subtitle">
            Page Not Found
          </h2>
          <p class="not-found__description">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <router-link
            to="/"
            class="btn btn-primary"
          >
            Go Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.title = '404 - Page Not Found | Baris Sari'
})
</script>

<style lang="scss" scoped>
.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;

  &__title {
    font-size: 4rem;
    font-weight: 800;
    color: var(--link-color);
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  &__subtitle {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  &__description {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 768px) {
  .not-found {
    &__title {
      font-size: 3rem;
    }
    
    &__subtitle {
      font-size: 1.5rem;
    }
  }
}
</style>
