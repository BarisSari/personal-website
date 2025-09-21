<template>
  <button @click="toggleTheme" class="toggle-theme" :class="{ 'dark': isDark }">
    <span class="toggle-theme__icon">
      {{ isDark ? '🌙' : '☀️' }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
})
</script>

<style lang="scss" scoped>
.toggle-theme {
  background: none;
  border: 2px solid #ccc;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #666;
    transform: scale(1.1);
  }

  &.dark {
    background-color: #333;
    border-color: #666;
    color: white;
  }

  &__icon {
    font-size: 1.2rem;
  }
}
</style>