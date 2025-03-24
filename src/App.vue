<script setup>
import { ref, onMounted, onUnmounted, provide } from 'vue';
import Header from '@/components/Header/Header.vue';
import { useViewport } from '@/utils/viewportWatcher';

// App state management
const appState = ref({
  isLoading: true,
  isPageVisible: true
});

// Use the viewport watcher with a custom debounce time
const viewport = useViewport({
  debounceTime: 200
});

// Destructure viewport properties for convenience
const { isMobile, isTablet, isDesktop } = viewport;

// Provide viewport information to all child components
provide('viewport', viewport);

// Handle page visibility changes
const handleVisibilityChange = () => {
  appState.value.isPageVisible = !document.hidden;

  if (document.hidden) {
    document.body.classList.add('page-hidden');
  } else {
    document.body.classList.remove('page-hidden');
  }
};

// Lifecycle hooks
onMounted(() => {
  // Initialize app and simulate loading
  setTimeout(() => {
    appState.value.isLoading = false;
  }, 300);

  // Add event listener for page visibility changes
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onUnmounted(() => {
  // Clean up event listeners when component is destroyed
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});
</script>

<template>
  <div class="app-wrapper" :class="{ mobile: isMobile, tablet: isTablet, desktop: isDesktop }">
    <!-- Loading overlay with improved accessibility -->
    <div v-if="appState.isLoading" class="loading-overlay" aria-live="polite" role="status">
      <div class="loading-spinner" aria-label="Loading"></div>
      <span class="sr-only">Loading application</span>
    </div>

    <!-- Main app content -->
    <div class="app-content" :class="{ 'app-loaded': !appState.isLoading }">
      <Header />
      <main class="site-container">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style>
/* Global responsive image styles */
.responsive-image {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Screen reader only class for accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* App wrapper styles */
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Loading overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Main content container */
.site-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Responsive adjustments */
.app-wrapper.mobile .site-container {
  padding: 0 0.5rem;
}

.app-wrapper.desktop .site-container {
  padding: 0 2rem;
}

/* Page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
