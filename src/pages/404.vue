<template>
  <div class="not-found">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h1 class="not-found__title">404</h1>
          <h2 class="not-found__subtitle">Page Not Found</h2>
          <p class="not-found__description">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <router-link to="/" class="btn btn-primary">
            Go Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed
</script>

<style lang="scss" scoped>
.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;

  &__title {
    font-size: 6rem;
    font-weight: 700;
    color: #007bff;
    margin-bottom: 1rem;
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
</style>
