<template>
  <Teleport to="body">
    <Transition name="popup-fade">
      <div v-if="isVisible" class="popup-overlay" @click="closeOnOverlayClick && onClose()">
        <div class="popup" :class="[size, { 'popup--centered': centered }]" @click.stop>
          <div class="popup__header">
            <h3 class="popup__title" v-if="title">{{ title }}</h3>
            <button v-if="showCloseButton" class="popup__close" @click="onClose" aria-label="Close">
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
import { onMounted, onBeforeUnmount, onUpdated, watch } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
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

const emit = defineEmits(['close']);

const onClose = () => {
  emit('close');
};

const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.isVisible && props.closeOnEsc) {
    onClose();
  }
};

const updateBodyScroll = () => {
  if (props.isVisible) {
    document.body.classList.add('popup-open');
  } else {
    document.body.classList.remove('popup-open');
  }
};

onMounted(() => {
  if (props.closeOnEsc) {
    document.addEventListener('keydown', handleKeydown);
  }
  updateBodyScroll();
});

onUpdated(() => {
  updateBodyScroll();
});

watch(
  () => props.isVisible,
  () => {
    updateBodyScroll();
  }
);

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown);
  if (document.body.classList.contains('popup-open')) {
    document.body.classList.remove('popup-open');
  }
});
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
