<script setup>
import { ref, onMounted, provide } from 'vue';
import Header from '@/components/Header/Header.vue';
import { useViewport } from '@/utils/viewportWatcher';

// Add loading state for better UX
const isLoading = ref(true);

// Use the viewport watcher with a custom debounce time
const { width, height, isMobile, isTablet, isDesktop } = useViewport({
  debounceTime: 200
});

// Provide viewport information to all child components
provide('viewport', {
  width,
  height,
  isMobile,
  isTablet,
  isDesktop
});

// Initialize app
onMounted(() => {
  // Simulate loading or perform actual initialization tasks
  setTimeout(() => {
    isLoading.value = false;
  }, 300);

  // Add event listener for page visibility changes to optimize performance
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

// Handle page visibility changes
const handleVisibilityChange = () => {
  if (document.hidden) {
    // Page is hidden, can pause non-essential animations or operations
    document.body.classList.add('page-hidden');
  } else {
    // Page is visible again
    document.body.classList.remove('page-hidden');
  }
};
</script>

<template>
  <div class="app-wrapper">
    <!-- Loading overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>

    <!-- Main app content -->
    <div class="app-content" :class="{ 'app-loaded': !isLoading }">
      <Header />
      <div class="site-container">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  position: relative;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.app-content {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.app-loaded {
  opacity: 1;
}

.site-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .site-container {
    padding: 0 15px;
  }
}
</style>
