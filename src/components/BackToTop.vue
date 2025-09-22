<template>
  <button
    v-show="showButton"
    @click="scrollToTop"
    class="back-to-top"
    :class="{ 'back-to-top--visible': showButton }"
    aria-label="Back to top"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 14L12 9L17 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showButton = ref(false)

const handleScroll = () => {
  showButton.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  background-color: var(--link-color);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 1000;
  opacity: 0;
  transform: translateY(20px);
  
  &:hover {
    background-color: var(--link-hover-color, var(--link-color));
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &--visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
}

// Dark theme adjustments
[data-theme="dark"] .back-to-top {
  background-color: var(--link-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  
  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }
}

// Mobile responsiveness
@media (max-width: 768px) {
  .back-to-top {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    
    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
}
</style>
