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

<style scoped></style>
