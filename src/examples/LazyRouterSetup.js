import { createRouter, createWebHistory } from 'vue-router';
import { lazyLoad } from '@/utils/lazyLoader';

// Home component is loaded immediately (not lazy loaded)
import Home from '@/views/Home.vue';

// Create loading and error components for routes
const LoadingComponent = {
  template: `
    <div class="route-loading">
      <div class="spinner"></div>
      <p>Loading page...</p>
    </div>
  `
};

const ErrorComponent = {
  template: `
    <div class="route-error">
      <h2>Failed to load page</h2>
      <p>Please try refreshing the page or go back to the home page.</p>
      <button @click="$router.push('/')">Go Home</button>
    </div>
  `
};

// Define common lazy loading options
const routeLoadOptions = {
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 10000
};

// Define routes with lazy loading
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home // Not lazy loaded (for faster initial load)
  },
  {
    path: '/about',
    name: 'About',
    component: lazyLoad(() => import('@/views/About.vue'), routeLoadOptions)
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: lazyLoad(() => import('@/views/Dashboard.vue'), routeLoadOptions),
    // Nested routes can also be lazy loaded
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: lazyLoad(() => import('@/views/Profile.vue'), routeLoadOptions)
      },
      {
        path: 'settings',
        name: 'Settings',
        component: lazyLoad(() => import('@/views/Settings.vue'), routeLoadOptions)
      }
    ]
  },
  {
    path: '/products',
    name: 'Products',
    // Custom error handling for this route
    component: lazyLoad(() => import('@/views/Products.vue'), {
      ...routeLoadOptions,
      onError: (error, retry, fail, attempts) => {
        console.error('Failed to load Products view:', error);

        // Retry loading up to 3 times
        if (attempts <= 3) {
          console.log(`Retrying (attempt ${attempts})...`);
          retry();
        } else {
          console.log('Max retry attempts reached. Redirecting to error page.');
          fail();
          // You could also redirect to a specific error page
          // router.push('/error');
        }
      }
    })
  },
  {
    // Catch-all 404 page
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: lazyLoad(() => import('@/views/NotFound.vue'))
  }
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Optional: Add global loading indicator for route changes
router.beforeEach((to, from, next) => {
  // Show loading indicator
  document.body.classList.add('page-loading');
  next();
});

router.afterEach(() => {
  // Hide loading indicator
  document.body.classList.remove('page-loading');
});

export default router;
