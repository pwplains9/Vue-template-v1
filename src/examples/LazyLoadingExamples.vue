<template>
  <div class="lazy-loading-examples">
    <h1>Lazy Loading Examples</h1>

    <!-- Example 1: Basic Lazy Component -->
    <section>
      <h2>1. Basic Lazy Component</h2>
      <lazy-component />
    </section>

    <!-- Example 2: Lazy Component with Loading State -->
    <section>
      <h2>2. Lazy Component with Loading State</h2>
      <lazy-with-loading />
    </section>

    <!-- Example 3: Lazy Image Loading -->
    <section>
      <h2>3. Lazy Image Loading</h2>
      <button @click="loadImage">Load Image</button>
      <div v-if="imageLoaded" class="image-container">
        <img :src="imageSrc" alt="Lazy loaded image" />
      </div>
      <div v-else-if="imageLoading" class="image-placeholder">Loading image...</div>
    </section>

    <!-- Example 4: Multiple Lazy Components -->
    <section>
      <h2>4. Multiple Lazy Components</h2>
      <component-a v-if="showMultipleComponents" />
      <component-b v-if="showMultipleComponents" />
      <button @click="showMultipleComponents = true">Load Multiple Components</button>
    </section>

    <!-- Example 5: Visible Load (Loads when scrolled into view) -->
    <section>
      <h2>5. Visible Load (Scroll down to see)</h2>
      <div style="height: 400px; background-color: #f5f5f5; margin-bottom: 20px">
        Scroll down to see the component load when it becomes visible
      </div>
      <visible-component />
    </section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { lazyLoad, lazyLoadImage, lazyLoadComponents, visibleLoad } from '@/utils/lazyLoader';

// Loading component for examples
const LoadingComponent = {
  template: '<div class="loading-state">Loading component...</div>'
};

// Error component for examples
const ErrorComponent = {
  template: '<div class="error-state">Failed to load component!</div>'
};

// Basic component to lazy load
const LazyComponent = lazyLoad(() => import('@/components/SomeComponent.vue'));

// Component with loading state
const LazyWithLoading = lazyLoad(() => import('@/components/SomeComponent.vue'), {
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 400,
  timeout: 10000
});

// Multiple components example
const multipleComponents = lazyLoadComponents(
  {
    ComponentA: () => import('@/components/ComponentA.vue'),
    ComponentB: () => import('@/components/ComponentB.vue')
  },
  {
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent
  }
);

// Visible load example
const VisibleComponent = visibleLoad(() => import('@/components/HeavyComponent.vue'), {
  rootMargin: '100px',
  threshold: 0.1,
  loadingComponent: LoadingComponent
});

export default defineComponent({
  name: 'LazyLoadingExamples',

  components: {
    LazyComponent,
    LazyWithLoading,
    ...multipleComponents,
    VisibleComponent
  },

  setup() {
    const imageSrc = ref('');
    const imageLoaded = ref(false);
    const imageLoading = ref(false);
    const showMultipleComponents = ref(false);

    const loadImage = async () => {
      imageLoading.value = true;

      try {
        // Example of using lazyLoadImage
        await lazyLoadImage('/images/example.jpg', {
          width: 600,
          height: 400,
          alt: 'Example image',
          className: 'lazy-image',
          onLoad: (img) => {
            console.log('Image loaded successfully', img);
          },
          onError: (error) => {
            console.error('Failed to load image', error);
          }
        });

        imageSrc.value = '/images/example.jpg';
        imageLoaded.value = true;
      } catch (error) {
        console.error('Image loading failed', error);
      } finally {
        imageLoading.value = false;
      }
    };

    return {
      imageSrc,
      imageLoaded,
      imageLoading,
      loadImage,
      showMultipleComponents
    };
  }
});
</script>

<style scoped>
.lazy-loading-examples {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

h1 {
  margin-bottom: 30px;
  color: #333;
}

h2 {
  margin-bottom: 15px;
  color: #555;
}

.loading-state,
.error-state {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
  text-align: center;
}

.error-state {
  background-color: #fff0f0;
  color: #d32f2f;
}

.image-container {
  margin-top: 15px;
}

.image-placeholder {
  width: 600px;
  height: 400px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}

button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
