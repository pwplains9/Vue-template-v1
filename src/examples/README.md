# Lazy Loading Examples

This directory contains examples and templates for using the lazy loading utilities provided in `src/utils/lazyLoader.js`. These examples demonstrate best practices for implementing lazy loading in Vue applications to improve performance and user experience.

## Files in this Directory

1. **LazyLoadingExamples.vue**
   - A comprehensive Vue component showcasing all lazy loading functions
   - Includes examples of basic lazy loading, loading with states, image loading, multiple components, and visibility-based loading

2. **LazyLoadingUsage.md**
   - Detailed documentation with code snippets for each lazy loading function
   - Explains parameters, options, and best practices

3. **LazyRouterSetup.js**
   - Example of integrating lazy loading with Vue Router
   - Shows how to lazy load route components for better initial load performance

4. **LazyImageGallery.vue**
   - Practical implementation of the `lazyLoadImage` function in a gallery component
   - Demonstrates loading images on-demand and in sequence

## How to Use These Examples

### 1. Copy and Adapt

You can copy these examples into your project and adapt them to your specific needs. The components are designed to be modular and easily customizable.

### 2. Learn from the Patterns

Even if you don't use the exact code, study the patterns and approaches demonstrated in these examples to implement efficient lazy loading in your own components.

### 3. Integration with Existing Code

To integrate these examples with your existing code:

```js
// Import the lazy loading utilities
import { lazyLoad, lazyLoadImage, lazyLoadComponents, visibleLoad } from '@/utils/lazyLoader';

// Use them in your components as shown in the examples
```

## Performance Benefits

Implementing lazy loading as demonstrated in these examples can provide several performance benefits:

- **Reduced initial load time**: Only load what's immediately needed
- **Smaller initial bundle size**: Split code into smaller chunks
- **Better resource utilization**: Load images only when they're about to be viewed
- **Improved user experience**: Show loading states for better feedback

## Browser Compatibility

The lazy loading utilities use modern JavaScript features and the Intersection Observer API (for `visibleLoad`). They are compatible with all modern browsers. For older browsers, consider adding appropriate polyfills.

## Additional Resources

- [Vue.js Async Components Documentation](https://vuejs.org/guide/components/async.html)
- [Intersection Observer API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Web Performance Optimization Techniques](https://web.dev/fast/) 