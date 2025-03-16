/**
 * Performance monitoring utility for Vue applications
 * Helps track and optimize application performance
 */

// Performance metrics storage
const metrics = {
  componentRenderTimes: {},
  navigationTimes: {},
  resourceLoadTimes: [],
  memoryUsage: []
};

// Development mode only - console output
const isDev = process.env.NODE_ENV === 'development';

// Configuration
const config = {
  // Thresholds for warnings (in ms)
  renderTimeThreshold: 16.67, // 60fps threshold
  navigationTimeThreshold: 300,
  // Thresholds for resource size warnings (in bytes)
  resourceSizeThreshold: 500000, // 500KB
  // Memory sampling interval (in ms)
  memorySamplingInterval: 10000, // 10 seconds
  // Maximum number of entries to keep per metric to prevent memory leaks
  maxEntries: {
    componentRender: 100,
    navigation: 50,
    resource: 200,
    memory: 100
  }
};

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

  // Store the render time with timestamp
  if (!metrics.componentRenderTimes[componentName]) {
    metrics.componentRenderTimes[componentName] = [];
  }

  // Limit the number of entries to prevent memory leaks
  if (metrics.componentRenderTimes[componentName].length >= config.maxEntries.componentRender) {
    metrics.componentRenderTimes[componentName].shift();
  }

  metrics.componentRenderTimes[componentName].push({
    time: renderTime,
    timestamp: Date.now()
  });

  // Log if render time is too high (potential performance issue)
  if (renderTime > config.renderTimeThreshold) {
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
  if (!isDev) return;

  const navigationStart = performance.now();

  // We'll complete this measurement when the navigation is done
  window.requestAnimationFrame(() => {
    const navigationEnd = performance.now();
    const navigationTime = navigationEnd - navigationStart;
    const navigationKey = `${from} → ${to}`;

    // Limit the number of entries
    const entries = Object.keys(metrics.navigationTimes);
    if (entries.length >= config.maxEntries.navigation) {
      delete metrics.navigationTimes[entries[0]];
    }

    metrics.navigationTimes[navigationKey] = {
      time: navigationTime,
      timestamp: Date.now()
    };

    if (navigationTime > config.navigationTimeThreshold) {
      console.warn(`Slow navigation: ${from} → ${to} took ${navigationTime.toFixed(2)}ms`);
    }
  });
}

/**
 * Track memory usage
 * Call this during app initialization to start tracking
 */
export function trackMemory() {
  if (!isDev || !performance.memory) return;

  const sampleMemory = () => {
    // Limit the number of entries
    if (metrics.memoryUsage.length >= config.maxEntries.memory) {
      metrics.memoryUsage.shift();
    }

    metrics.memoryUsage.push({
      usedJSHeapSize: performance.memory.usedJSHeapSize,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
      jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
      timestamp: Date.now()
    });

    // Check for memory leaks (if heap usage is consistently high)
    const heapUsagePercentage =
      (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100;
    if (heapUsagePercentage > 80) {
      console.warn(`High memory usage detected: ${heapUsagePercentage.toFixed(2)}% of heap limit`);
    }
  };

  // Sample memory usage periodically
  sampleMemory();
  setInterval(sampleMemory, config.memorySamplingInterval);
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
    resources: performance.getEntriesByType('resource'),
    // Add timestamp
    timestamp: Date.now(),
    // Add summary statistics
    summary: calculateSummaryStatistics()
  };
}

/**
 * Calculate summary statistics for the performance report
 * @returns {Object} - Summary statistics
 */
function calculateSummaryStatistics() {
  // Calculate average render times for components
  const componentAverages = {};
  Object.entries(metrics.componentRenderTimes).forEach(([component, times]) => {
    const renderTimes = times.map((entry) => entry.time);
    componentAverages[component] = {
      avg: renderTimes.reduce((sum, time) => sum + time, 0) / renderTimes.length,
      min: Math.min(...renderTimes),
      max: Math.max(...renderTimes),
      count: renderTimes.length
    };
  });

  // Calculate average navigation time
  const navigationTimes = Object.values(metrics.navigationTimes).map((entry) => entry.time);
  const avgNavigationTime = navigationTimes.length
    ? navigationTimes.reduce((sum, time) => sum + time, 0) / navigationTimes.length
    : 0;

  return {
    componentAverages,
    avgNavigationTime,
    resourceCount: metrics.resourceLoadTimes.length,
    memorySnapshots: metrics.memoryUsage.length
  };
}

/**
 * Reset performance metrics
 */
export function resetMetrics() {
  metrics.componentRenderTimes = {};
  metrics.navigationTimes = {};
  metrics.resourceLoadTimes = [];
  metrics.memoryUsage = [];
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
        // Limit the number of entries
        if (metrics.resourceLoadTimes.length >= config.maxEntries.resource) {
          metrics.resourceLoadTimes.shift();
        }

        metrics.resourceLoadTimes.push({
          name: entry.name,
          duration: entry.duration,
          size: entry.transferSize,
          type: entry.initiatorType,
          timestamp: Date.now()
        });

        // Log large resources that might impact performance
        if (entry.transferSize > config.resourceSizeThreshold) {
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
  trackMemory,
  getPerformanceReport,
  resetMetrics,
  monitorResources
};
