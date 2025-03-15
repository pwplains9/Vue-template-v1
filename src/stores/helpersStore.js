import { defineStore } from 'pinia';
import { computed } from 'vue';

export const useHelperStore = defineStore('helperStore', () => {
  const isDesktop = computed(() => window.innerWidth > 1024);
  const isDevices = computed(() => !isDesktop.value);
  let baseDir = import.meta.env.BASE_URL;

  return { isDesktop: isDesktop.value, baseDir, isDevices: isDevices.value };
});
