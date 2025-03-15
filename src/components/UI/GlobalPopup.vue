<template>
  <Teleport to="body">
    <Transition name="popup-fade">
      <div v-if="isOpen" class="popup-overlay" @click="closeOnOverlayClick && close()">
        <div class="popup" :class="[size, { 'popup--centered': centered }]" @click.stop>
          <div class="popup__header">
            <h3 class="popup__title" v-if="title">{{ title }}</h3>
            <button v-if="showCloseButton" class="popup__close" @click="close" aria-label="Close">
              <span class="popup__close-icon">×</span>
            </button>
          </div>
          <div class="popup__content">
            <slot></slot>
          </div>
          <div class="popup__footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onBeforeUnmount, onUpdated, computed, watch } from 'vue';
import { usePopup } from '@/composables/usePopup';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'full'].includes(value)
  },
  centered: {
    type: Boolean,
    default: true
  },
  showCloseButton: {
    type: Boolean,
    default: true
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: true
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  }
});

const { isOpen, close } = usePopup(props.id);

const handleKeydown = (e) => {
  if (e.key === 'Escape' && isOpen.value && props.closeOnEsc) {
    close();
  }
};

const updateBodyScroll = () => {
  if (isOpen.value) {
    document.body.classList.add('popup-open');
  } else {
    document.body.classList.remove('popup-open');
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  
  // Prevent body scrolling when popup is open
  updateBodyScroll();
});

onUpdated(() => {
  updateBodyScroll();
});

// Watch for changes to isOpen to update body scroll
watch(() => isOpen.value, () => {
  updateBodyScroll();
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown);
  
  // Restore body scrolling when component is unmounted
  if (document.body.classList.contains('popup-open')) {
    document.body.classList.remove('popup-open');
  }
});
</script>

<style lang="scss">
// The styles are already defined in Popup.vue, so we don't need to duplicate them here
</style> 