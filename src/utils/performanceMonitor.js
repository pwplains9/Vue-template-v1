/**
 * Performance monitoring utility for Vue applications
 * Helps track and optimize application performance
 */

// Performance metrics storage
const metrics = {
  componentRenderTimes: {},
  navigationTimes: {},
  resourceLoadTimes: []
};

// Development mode only - console output
const isDev = process.env.NODE_ENV === 'development';

/**
 * Track component render time
 * @param {string} componentName - Name of the component
 * @param {Function} callback - Function to execute and measure
 * @returns {*} - Result of the callback function
 */
export function trackRender(componentName, callback) {
  if (!isDev) return callback();

  const startTime = performance.now();
  const result = callback();
  const endTime = performance.now();
  const renderTime = endTime - startTime;

  // Store the render time
  if (!metrics.componentRenderTimes[componentName]) {
    metrics.componentRenderTimes[componentName] = [];
  }

  metrics.componentRenderTimes[componentName].push(renderTime);

  // Log if render time is too high (potential performance issue)
  if (renderTime > 16.67) {
    // 60fps threshold
    console.warn(`Slow render detected: ${componentName} took ${renderTime.toFixed(2)}ms`);
  }

  return result;
}

/**
 * Track navigation performance
 * @param {string} from - Route navigated from
 * @param {string} to - Route navigated to
 */
export function trackNavigation(from, to) {
  const navigationStart = performance.now();

  // We'll complete this measurement when the navigation is done
  window.requestAnimationFrame(() => {
    const navigationEnd = performance.now();
    const navigationTime = navigationEnd - navigationStart;

    metrics.navigationTimes[`${from} → ${to}`] = navigationTime;

    if (isDev && navigationTime > 300) {
      console.warn(`Slow navigation: ${from} → ${to} took ${navigationTime.toFixed(2)}ms`);
    }
  });
}

/**
 * Get performance report
 * @returns {Object} - Performance metrics
 */
export function getPerformanceReport() {
  return {
    ...metrics,
    // Add browser performance metrics
    navigation: performance.getEntriesByType('navigation'),
    resources: performance.getEntriesByType('resource')
  };
}

/**
 * Reset performance metrics
 */
export function resetMetrics() {
  metrics.componentRenderTimes = {};
  metrics.navigationTimes = {};
  metrics.resourceLoadTimes = [];
}

/**
 * Monitor resource loading
 * Call this during app initialization
 */
export function monitorResources() {
  if (!isDev) return;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();

    entries.forEach((entry) => {
      if (entry.entryType === 'resource') {
        metrics.resourceLoadTimes.push({
          name: entry.name,
          duration: entry.duration,
          size: entry.transferSize,
          type: entry.initiatorType
        });

        // Log large resources that might impact performance
        if (entry.transferSize > 500000) {
          // 500KB
          console.warn(
            `Large resource detected: ${entry.name} (${Math.round(entry.transferSize / 1024)}KB)`
          );
        }
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
}

export default {
  trackRender,
  trackNavigation,
  getPerformanceReport,
  resetMetrics,
  monitorResources
};
