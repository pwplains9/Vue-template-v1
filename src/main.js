import { createApp } from 'vue';
import './styles/main.scss';
import components from '@/components/UI';
import App from './App.vue';
import vhFix from '@/utils/vhFix';
import 'virtual:svg-icons-register';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home/Home.vue';
import Article from '@/pages/Article/Article.vue';
import performanceMonitor from '@/utils/performanceMonitor';

// Initialize performance monitoring in development mode
if (process.env.NODE_ENV === 'development') {
  performanceMonitor.monitorResources();
  console.info('Performance monitoring enabled');
}

const app = createApp(App);

let baseURL = import.meta.env.BASE_URL;

const routes = [
  {
    path: `${baseURL}`,
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home Title',
      description: 'Home Description',
      keyWords: ''
    }
  },
  {
    path: `${baseURL}article/`,
    name: 'Article',
    component: Article,
    meta: {
      title: 'Article Title',
      description: 'Article Description',
      keyWords: ''
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Track navigation performance
router.beforeEach((to, from) => {
  performanceMonitor.trackNavigation(from.name || 'unknown', to.name || 'unknown');
});

router.beforeEach((to) => {
  const { title, description, keyWords } = to.meta;
  const defaultTitle = 'Default Title';
  const defaultDescription = 'Default Description';
  const defaultKeyWords = '';

  document.title = title || defaultTitle;

  const keyWordsElement = document.querySelector('head meta[name="keywords"]');
  const descriptionElement = document.querySelector('head meta[name="description"]');
  const ogTitle = document.querySelector('head meta[property="og:title"]');
  const ogDescription = document.querySelector('head meta[property="og:description"]');
  const twitterTitle = document.querySelector('head meta[name="twitter:title"]');
  const twitterDescription = document.querySelector('head meta[name="twitter:description"]');

  keyWordsElement.setAttribute('content', keyWords || defaultKeyWords);
  descriptionElement.setAttribute('content', description || defaultDescription);
  ogTitle.setAttribute('content', title || defaultTitle);
  ogDescription.setAttribute('content', description || defaultDescription);
  twitterTitle.setAttribute('content', title || defaultTitle);
  twitterDescription.setAttribute('content', description || defaultDescription);
});

const pinia = createPinia();

components.forEach((component) => {
  app.component(component.name, component);
});

// Add global error handling
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err);
  console.error('Component:', vm?.$options?.name || 'Unknown');
  console.error('Error Info:', info);

  // You could send this to an error tracking service in production
};

// Add performance directive
app.directive('perf', {
  beforeMount(el, binding) {
    el._perfName = binding.value || 'anonymous-component';
  },
  mounted(el) {
    if (process.env.NODE_ENV === 'development') {
      const renderTime = performance.now() - window.performance.timing.navigationStart;
      console.log(`[Perf] ${el._perfName} mounted in ${renderTime.toFixed(2)}ms`);
    }
  }
});

app.use(vhFix.init);
app.use(pinia);
app.use(router);
app.mount('#app');
