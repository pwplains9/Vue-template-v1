import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { gsap } from 'gsap';

const helpers = {
  $document: document,
  $html: document.querySelector('html'),
  isSafari: () =>
    document.documentElement.classList.contains('is-browser-safari') ||
    document.documentElement.classList.contains('is-browser-mobile-safari'),
  isDevices: () => window.innerWidth <= 1024,
  clearText: (text) => text.trim().replace(/\s+/g, ' '),
  
  // Vue 3 transition hooks
  beforeEnter: (el) => {
    gsap.set(el, {
      yPercent: -75
    });
  },

  beforeEnterOpacity: (el) => {
    gsap.set(el, {
      autoAlpha: 0
    });
  },

  enter: (el) => {
    gsap.to(el, {
      delay: 0.5,
      duration: 1,
      autoAlpha: 1,
      ease: 'power4.out'
    });
  },

  leave: (el, done) => {
    gsap.to(el, {
      duration: 1,
      yPercent: 50,
      autoAlpha: 0,
      ease: 'power2.inOut',
      onComplete: done
    });
  },

  leaveOpacity: (el, done) => {
    gsap.to(el, {
      duration: 1,
      autoAlpha: 0,
      ease: 'power2.inOut',
      onComplete: done
    });
  }
};

// Use a Set to track scroll locks
const scrollLocks = new Set();

helpers.lockScroll = (state, element, name) => {
  // Ensure element is a DOM element (remove jQuery dependency)
  const targetElement = element?.nodeType ? element : element?.$el || element;
  
  if (!targetElement) {
    console.warn('lockScroll: No valid element provided');
    return;
  }

  if (state) {
    if (typeof name === 'string') {
      scrollLocks.add(name);
    }

    disableBodyScroll(targetElement, {
      reserveScrollBarGap: true
    });

    // Use nextTick or setTimeout instead of setImmediate
    setTimeout(() => {
      helpers.$html.classList.add('is-lock-scroll');
    }, 0);
  } else {
    if (typeof name === 'string') {
      scrollLocks.delete(name);
    }

    enableBodyScroll(targetElement);

    if (!scrollLocks.size) {
      clearAllBodyScrollLocks();
      helpers.$html.classList.remove('is-lock-scroll');
    }
  }
};

export default helpers;
