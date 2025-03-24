<script setup>
import { computed } from 'vue';
import { inject } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
    description: 'Base image source URL'
  },
  alt: {
    type: String,
    required: true,
    description: 'Alternative text for accessibility'
  },
  width: {
    type: [Number, String],
    default: 'auto',
    description: 'Image width (can be number for pixels or CSS string value)'
  },
  height: {
    type: [Number, String],
    default: 'auto',
    description: 'Image height (can be number for pixels or CSS string value)'
  },
  lazy: {
    type: Boolean,
    default: true,
    description: 'Whether to use lazy loading'
  },
  imgClass: {
    type: String,
    default: '',
    description: 'Optional CSS class to apply to img element'
  }
});

// Inject viewport info from App.vue
const viewport = inject('viewport', {
  isMobile: false,
  isTablet: false,
  isDesktop: true
});

// Helper to build image paths
const buildImagePath = (basePath, size = '', density = '') => {
  // Extract base path without extension
  const lastDotIndex = basePath.lastIndexOf('.');
  if (lastDotIndex === -1) return basePath;

  const pathWithoutExt = basePath.substring(0, lastDotIndex);
  const extension = basePath.substring(lastDotIndex);

  // Construct path with size and density modifiers
  let modifiedPath = pathWithoutExt;
  if (size) modifiedPath += `-${size}`;
  if (density) modifiedPath += `@${density}`;

  return modifiedPath + extension;
};

// Generate srcset for desktop images
const desktopSrcset = computed(() => {
  const basePath = props.src;
  return `${buildImagePath(basePath, '1024')} 1x, ${buildImagePath(basePath, '1024', '2x')} 2x`;
});

// Generate srcset for mobile images
const mobileSrcset = computed(() => {
  const basePath = props.src;
  return `${buildImagePath(basePath, 'mobile')} 1x, ${buildImagePath(basePath, 'mobile', '2x')} 2x`;
});

// Determine which source set to use based on viewport
const currentSrcset = computed(() => {
  return viewport.isMobile ? mobileSrcset.value : desktopSrcset.value;
});

// Compute CSS dimensions with proper units
const cssWidth = computed(() => {
  return typeof props.width === 'number' ? `${props.width}px` : props.width;
});

const cssHeight = computed(() => {
  return typeof props.height === 'number' ? `${props.height}px` : props.height;
});

// USE
// <ResponsiveImage
//     :src="image.src"
//     :alt="image.alt"
//     :width="image.width"
//     :height="image.height"
//     :imgClass="image.imgClass"
//   />
</script>

<template>
  <picture>
    <!-- Mobile source -->
    <source media="(max-width: 767px)" :srcset="mobileSrcset" />

    <!-- Desktop source (default) -->
    <source media="(min-width: 768px)" :srcset="desktopSrcset" />

    <!-- Fallback image -->
    <img
      :src="buildImagePath(src, viewport.isMobile ? 'mobile' : '1024')"
      :srcset="currentSrcset"
      :alt="alt"
      :class="['responsive-image', imgClass]"
      :style="{ width: cssWidth, height: cssHeight }"
      :loading="lazy ? 'lazy' : 'eager'"
    />
  </picture>
</template>

<style scoped>
.responsive-image {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
