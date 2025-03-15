import { defineStore } from 'pinia';

export const usePopupStore = defineStore('popup', {
  state: () => ({
    activePopups: {},
  }),
  
  actions: {
    openPopup(id, props = {}) {
      this.activePopups = {
        ...this.activePopups,
        [id]: { isOpen: true, props }
      };
    },
    
    closePopup(id) {
      if (this.activePopups[id]) {
        this.activePopups[id].isOpen = false;
        
        // Remove popup from store after animation completes
        setTimeout(() => {
          const { [id]: _, ...rest } = this.activePopups;
          this.activePopups = rest;
        }, 300); // Match the transition duration in Popup.vue
      }
    },
    
    closeAllPopups() {
      Object.keys(this.activePopups).forEach(id => {
        this.closePopup(id);
      });
    },
    
    updatePopupProps(id, props) {
      if (this.activePopups[id]) {
        this.activePopups[id].props = {
          ...this.activePopups[id].props,
          ...props
        };
      }
    }
  },
  
  getters: {
    isPopupOpen: (state) => (id) => {
      return state.activePopups[id]?.isOpen || false;
    },
    
    getPopupProps: (state) => (id) => {
      return state.activePopups[id]?.props || {};
    }
  }
}); 