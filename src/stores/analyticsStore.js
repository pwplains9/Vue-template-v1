import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useAnalyticsStore = defineStore('analyticsStore', () => {
  const eventCategoryGlobal = '######';

  const analytics = reactive({
    baseEvent: () => {
      window.dataLayer.push({
        event: 'analyticsEvent',
        eventAction: 'nameEvent',
        eventCategory: eventCategoryGlobal,
        eventLabel: null,
        eventProperty: null,
        eventValue: null
      });
    }
  });

  return { analytics };
});
