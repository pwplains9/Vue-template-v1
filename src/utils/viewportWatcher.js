import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Composable for watching viewport size with performance optimizations
 * @param {Object} options - Configuration options
 * @param {number} options.debounceTime - Debounce time in ms (default: 250)
 * @returns {Object} - Viewport state and utilities
 */
export function useViewport(options = {}) {
  const { debounceTime = 250 } = options;

  const width = ref(0);
  const height = ref(0);
  const isMobile = ref(false);
  const isTablet = ref(false);
  const isDesktop = ref(false);

  let debounceTimeout = null;

  // Breakpoints (can be customized)
  const MOBILE_BREAKPOINT = 768;
  const TABLET_BREAKPOINT = 1024;

  const updateViewport = () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      width.value = window.innerWidth;
      height.value = window.innerHeight;

      // Update device type flags
      isMobile.value = width.value < MOBILE_BREAKPOINT;
      isTablet.value = width.value >= MOBILE_BREAKPOINT && width.value < TABLET_BREAKPOINT;
      isDesktop.value = width.value >= TABLET_BREAKPOINT;
    }, debounceTime);
  };

  onMounted(() => {
    // Initial update
    updateViewport();

    // Add event listener
    window.addEventListener('resize', updateViewport);
  });

  onUnmounted(() => {
    // Clean up
    window.removeEventListener('resize', updateViewport);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
  });

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop
  };
}
