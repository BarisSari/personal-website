<template>
  <div
    v-if="errors.length > 0"
    class="error-notification"
  >
    <div class="error-notification__container">
      <div class="error-notification__header">
        <h4>⚠️ Issues Detected</h4>
        <button
          class="error-notification__close"
          aria-label="Close notifications"
          @click="clearErrors"
        >
          ×
        </button>
      </div>
      <div class="error-notification__list">
        <div
          v-for="(error, index) in errors"
          :key="index"
          class="error-notification__item"
        >
          <p>{{ getUserFriendlyMessage(error) }}</p>
          <small
            v-if="error.code"
            class="error-notification__code"
          >
            Error Code: {{ error.code }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ErrorHandler, type AppError, getUserFriendlyMessage } from '../utils/errorHandler'

const errors = ref<AppError[]>([])
let unsubscribe: (() => void) | null = null

onMounted(() => {
  // Subscribe to new errors
  unsubscribe = ErrorHandler.onError((_error: AppError) => {
    errors.value = ErrorHandler.getErrors()
  })
  
  // Load existing errors
  errors.value = ErrorHandler.getErrors()
})

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }
})

const clearErrors = () => {
  ErrorHandler.clearErrors()
  errors.value = []
}
</script>

<style lang="scss" scoped>
.error-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
  animation: slideIn 0.3s ease-out;
}

.error-notification__container {
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.error-notification__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  
  h4 {
    margin: 0;
    color: #c33;
    font-size: 1rem;
  }
}

.error-notification__close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #c33;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: rgba(204, 51, 51, 0.1);
    border-radius: 50%;
  }
}

.error-notification__list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.error-notification__item {
  p {
    margin: 0;
    color: #333;
    font-size: 0.9rem;
    line-height: 1.4;
  }
}

.error-notification__code {
  color: #666;
  font-size: 0.8rem;
  font-family: monospace;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

// Dark theme support
body[data-theme="dark"] .error-notification__container {
  background-color: #2d1b1b;
  border-color: #4d2a2a;
  
  h4 {
    color: #ff6b6b;
  }
  
  .error-notification__close {
    color: #ff6b6b;
    
    &:hover {
      background-color: rgba(255, 107, 107, 0.1);
    }
  }
  
  p {
    color: #e0e0e0;
  }
  
  .error-notification__code {
    color: #999;
  }
}
</style>
