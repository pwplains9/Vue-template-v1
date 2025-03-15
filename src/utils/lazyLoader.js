import { defineAsyncComponent } from 'vue';

/**
 * Lazy load a component with configurable loading and error states
 *
 * @param {Function} loader - Async component loader function
 * @param {Object} options - Configuration options
 * @returns {Component} - Async component
 */
export function lazyLoad(loader, options = {}) {
  const {
    loadingComponent = null,
    errorComponent = null,
    delay = 200,
    timeout = 30000,
    suspensible = true,
    onError = null
  } = options;

  return defineAsyncComponent({
    loader,
    loadingComponent,
    errorComponent,
    delay,
    timeout,
    suspensible,
    onError
  });
}

/**
 * Create a lazy loaded image component
 *
 * @param {string} src - Image source URL
 * @param {Object} options - Image options
 * @returns {Promise} - Promise that resolves when image is loaded
 */
export function lazyLoadImage(src, options = {}) {
  const {
    width = null,
    height = null,
    alt = '',
    className = '',
    onLoad = null,
    onError = null
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();

    if (width) img.width = width;
    if (height) img.height = height;
    img.alt = alt;
    if (className) img.className = className;

    img.onload = () => {
      if (onLoad) onLoad(img);
      resolve(img);
    };

    img.onerror = (error) => {
      if (onError) onError(error);
      reject(error);
    };

    img.src = src;
  });
}

/**
 * Lazy load multiple components in parallel
 *
 * @param {Object} components - Object with component names as keys and loader functions as values
 * @param {Object} options - Configuration options
 * @returns {Object} - Object with component names as keys and async components as values
 */
export function lazyLoadComponents(components, options = {}) {
  const result = {};

  for (const [name, loader] of Object.entries(components)) {
    result[name] = lazyLoad(loader, options);
  }

  return result;
}

/**
 * Create a component that only loads when it becomes visible in the viewport
 *
 * @param {Function} loader - Async component loader function
 * @param {Object} options - Configuration options
 * @returns {Component} - Intersection observer wrapped component
 */
export function visibleLoad(loader, options = {}) {
  const { rootMargin = '0px', threshold = 0, ...asyncOptions } = options;

  const asyncComponent = lazyLoad(loader, asyncOptions);

  return {
    name: 'VisibleLoadWrapper',
    data() {
      return {
        isVisible: false,
        observer: null
      };
    },
    mounted() {
      this.setupObserver();
    },
    beforeUnmount() {
      this.destroyObserver();
    },
    methods: {
      setupObserver() {
        this.observer = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
              this.isVisible = true;
              this.destroyObserver();
            }
          },
          {
            rootMargin,
            threshold
          }
        );

        this.observer.observe(this.$el);
      },
      destroyObserver() {
        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
      }
    },
    render() {
      return this.isVisible
        ? h(asyncComponent, this.$attrs)
        : h('div', {
            class: 'lazy-placeholder',
            style: {
              width: '100%',
              height: '100px',
              background: '#f5f5f5'
            }
          });
    }
  };
}

export default {
  lazyLoad,
  lazyLoadImage,
  lazyLoadComponents,
  visibleLoad
};
