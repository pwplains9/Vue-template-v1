<template>
  <BasePopup
    :is-visible="modelValue"
    :title="title"
    :size="size"
    :centered="centered"
    :show-close-button="showCloseButton"
    :close-on-overlay-click="closeOnOverlayClick"
    :close-on-esc="closeOnEsc"
    @close="close"
  >
    <slot></slot>
    <template v-if="$slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </BasePopup>
</template>

<script setup>
import BasePopup from './BasePopup.vue';

defineOptions({
  name: 'Popup'
});

defineProps({
  modelValue: {
    type: Boolean,
    default: false
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

const emit = defineEmits(['update:modelValue', 'close']);

const close = () => {
  emit('update:modelValue', false);
  emit('close');
};
</script>

<style lang="scss">
// Prevent scrolling when popup is open
body.popup-open {
  overflow: hidden;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 1rem;
}

.popup {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &--centered {
    margin: auto;
  }

  &.small {
    max-width: 400px;
  }

  &.medium {
    max-width: 600px;
  }

  &.large {
    max-width: 800px;
  }

  &.full {
    max-width: 100%;
    height: calc(100vh - 2rem);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #eee;
  }

  &__title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }

  &__close {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    line-height: 1;
    padding: 0.25rem;
    color: #666;
    transition: color 0.2s;

    &:hover {
      color: #000;
    }

    &-icon {
      display: block;
      line-height: 1;
    }
  }

  &__content {
    padding: 1.5rem;
    overflow-y: auto;
    flex: 1;
  }

  &__footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
}

// Transition animations
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.3s ease;
}

.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}
</style>
