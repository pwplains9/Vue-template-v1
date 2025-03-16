# Lazy Loading Utility Functions Usage Guide

This guide demonstrates how to use the lazy loading utility functions provided in `src/utils/lazyLoader.js`.

## Table of Contents

1. [Basic Lazy Loading](#basic-lazy-loading)
2. [Lazy Loading with Custom Options](#lazy-loading-with-custom-options)
3. [Lazy Loading Images](#lazy-loading-images)
4. [Lazy Loading Multiple Components](#lazy-loading-multiple-components)
5. [Visible Loading (Intersection Observer)](#visible-loading)

## Basic Lazy Loading

The `lazyLoad` function allows you to asynchronously load Vue components when they're needed.

```js
import { lazyLoad } from '@/utils/lazyLoader';

// Basic usage
const MyLazyComponent = lazyLoad(() => import('@/components/MyComponent.vue'));

// In your component definition
export default {
  components: {
    MyLazyComponent
  }
}
```

## Lazy Loading with Custom Options

You can customize the lazy loading behavior with various options:

```js
import { lazyLoad } from '@/utils/lazyLoader';

// Custom loading component
const LoadingComponent = {
  template: '<div class="loading">Loading...</div>'
};

// Custom error component
const ErrorComponent = {
  template: '<div class="error">Failed to load component</div>'
};

// Lazy load with options
const MyCustomLazyComponent = lazyLoad(
  () => import('@/components/HeavyComponent.vue'),
  {
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    delay: 200,        // 200ms delay before showing loading component
    timeout: 30000,    // 30 seconds timeout
    suspensible: true, // Works with Suspense
    onError: (error, retry, fail, attempts) => {
      if (attempts <= 3) {
        // Retry loading on error up to 3 times
        retry();
      } else {
        // Stop trying after 3 attempts
        fail();
      }
    }
  }
);
```

## Lazy Loading Images

The `lazyLoadImage` function helps load images asynchronously:

```js
import { lazyLoadImage } from '@/utils/lazyLoader';

// In your component's method
async function loadProfileImage() {
  try {
    const img = await lazyLoadImage('/images/profile.jpg', {
      width: 200,
      height: 200,
      alt: 'User profile',
      className: 'profile-image',
      onLoad: (img) => {
        console.log('Image loaded successfully', img);
      },
      onError: (error) => {
        console.error('Failed to load image', error);
      }
    });
    
    // Do something with the loaded image
    document.getElementById('profile-container').appendChild(img);
  } catch (error) {
    console.error('Image loading failed', error);
  }
}
```

## Lazy Loading Multiple Components

The `lazyLoadComponents` function allows you to load multiple components with the same configuration:

```js
import { lazyLoadComponents } from '@/utils/lazyLoader';

// Define loading and error components
const LoadingComponent = {
  template: '<div class="loading">Loading...</div>'
};

const ErrorComponent = {
  template: '<div class="error">Failed to load</div>'
};

// Lazy load multiple components
const lazyComponents = lazyLoadComponents(
  {
    Header: () => import('@/components/Header.vue'),
    Sidebar: () => import('@/components/Sidebar.vue'),
    Footer: () => import('@/components/Footer.vue')
  },
  {
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    delay: 300
  }
);

// In your component definition
export default {
  components: {
    ...lazyComponents
  }
}
```

## Visible Loading

The `visibleLoad` function loads components only when they become visible in the viewport:

```js
import { visibleLoad } from '@/utils/lazyLoader';

// Define a component that only loads when visible
const LazyChart = visibleLoad(
  () => import('@/components/Chart.vue'),
  {
    // IntersectionObserver options
    rootMargin: '100px', // Load when within 100px of viewport
    threshold: 0.1,      // Load when 10% visible
    
    // Async component options
    loadingComponent: {
      template: '<div class="chart-placeholder">Chart loading...</div>'
    },
    errorComponent: {
      template: '<div class="chart-error">Failed to load chart</div>'
    },
    delay: 200
  }
);

// In your component definition
export default {
  components: {
    LazyChart
  }
}
```

## Best Practices

1. **Use lazy loading for:**
   - Large components that aren't immediately needed
   - Components below the fold
   - Components in tabs or accordions
   - Routes that aren't the initial route

2. **Set appropriate timeouts** to prevent infinite loading states

3. **Provide fallback UI** with loading and error components

4. **Use visible loading** for content far down the page

5. **Consider bundle size** when deciding what to lazy load 