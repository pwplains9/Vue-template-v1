import { usePopupStore } from '@/stores/popupStore';
import { computed } from 'vue';

export function usePopup(popupId) {
  const popupStore = usePopupStore();

  const isOpen = computed(() => popupStore.isPopupOpen(popupId));
  const popupProps = computed(() => popupStore.getPopupProps(popupId));

  const open = (props = {}) => {
    popupStore.openPopup(popupId, props);
  };

  const close = () => {
    popupStore.closePopup(popupId);
  };

  const updateProps = (props) => {
    popupStore.updatePopupProps(popupId, props);
  };

  return {
    isOpen,
    popupProps,
    open,
    close,
    updateProps
  };
}

// Utility for managing multiple popups
export function usePopupManager() {
  const popupStore = usePopupStore();

  return {
    closeAll: popupStore.closeAllPopups,
    isAnyOpen: computed(() => Object.keys(popupStore.activePopups).length > 0)
  };
}
