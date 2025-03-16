<template>
  <div class="page">
    <BasePopup
      :model-value="myPopup.isOpen.value"
      :title="popupTitle"
      @update:model-value="updatePopupVisibility('my-popup', $event)"
    >
      <p>{{ myPopup.popupProps.value.message }}</p>
      <div v-if="myPopup.popupProps.value.data">
        <p>Additional data: {{ JSON.stringify(myPopup.popupProps.value.data) }}</p>
      </div>

      <template #footer>
        <button @click="myPopup.close()">Close</button>
      </template>
    </BasePopup>

    <BasePopup
      :model-value="myPopupNew.isOpen.value"
      :title="popupTitle"
      @update:model-value="updatePopupVisibility('my-popup-new', $event)"
    >
      <p>{{ myPopupNew.popupProps.value.message }}</p>
      <div v-if="myPopupNew.popupProps.value.data">123123</div>

      <template #footer>
        <button @click="myPopupNew.close()">Close</button>
      </template>
    </BasePopup>

    <button @click="openPopup">Open Popup</button>
    |
    <button @click="openPopupNew">Open Popup New</button>
  </div>
</template>

<script setup>
import { usePopup } from '@/composables/usePopup';
import { ref } from 'vue';
import BasePopup from '@/components/UI/Popup.vue';
const popupTitle = ref('My Popup');
const myPopup = usePopup('my-popup');
const myPopupNew = usePopup('my-popup-new');

// Function to handle v-model updates
const updatePopupVisibility = (popupId, isVisible) => {
  const popupMap = {
    'my-popup': myPopup,
    'my-popup-new': myPopupNew
  };

  const popup = popupMap[popupId];
  if (popup) {
    isVisible ? popup.open() : popup.close();
  }
};

// Example function to open the popup
const openPopup = () => {
  myPopup.open({
    message: 'Hello World',
    data: { foo: 'bar' }
  });
};

const openPopupNew = () => {
  myPopupNew.open({
    message: 'Hello World New',
    data: { foo: 'bar' }
  });
};
</script>

<style scoped></style>
