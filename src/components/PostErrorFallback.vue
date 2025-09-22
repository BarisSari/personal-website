<template>
  <div class="post-error-fallback">
    <div class="post-error-fallback__container">
      <div class="post-error-fallback__icon">
        📄
      </div>
      <h2>Content Unavailable</h2>
      <p>The requested post could not be loaded. This might be due to a temporary issue or the content may have been moved.</p>
      <div class="post-error-fallback__actions">
        <router-link
          :to="`/${type}-blog`"
          class="btn btn-primary"
        >
          ← Back to {{ type === 'tech' ? 'Tech' : 'Travels' }} Blog
        </router-link>
        <button
          class="btn btn-outline"
          @click="retry"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type: 'tech' | 'travels'
}

defineProps<Props>()

const emit = defineEmits<{
  retry: []
}>()

const retry = () => {
  emit('retry')
}
</script>

<style lang="scss" scoped>
.post-error-fallback {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.post-error-fallback__container {
  text-align: center;
  max-width: 500px;
  padding: 2rem;
  background-color: var(--bg-content-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.post-error-fallback__icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

h2 {
  color: var(--title-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

p {
  color: var(--body-color);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.post-error-fallback__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  
  &.btn-primary {
    background-color: var(--link-color);
    color: white;
    
    &:hover {
      opacity: 0.8;
    }
  }
  
  &.btn-outline {
    background-color: transparent;
    color: var(--link-color);
    border: 1px solid var(--link-color);
    
    &:hover {
      background-color: var(--link-color);
      color: white;
    }
  }
}

@media (max-width: 768px) {
  .post-error-fallback__actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>
