<template>
  <div class="page">
    <GlobalPopup 
      v-model="myPopup.isOpen.value" 
      :title="popupTitle"
    >
      <p>{{ myPopup.popupProps.value.message }}</p>
      <div v-if="myPopup.popupProps.value.data">
        <p>Additional data: {{ JSON.stringify(myPopup.popupProps.value.data) }}</p>
      </div>
      
      <template #footer>
        <button @click="myPopup.close()">Close</button>
      </template>
    </GlobalPopup>

    <button @click="openPopup">
      Open Popup
    </button>
  </div>
</template>

<script setup>
import { usePopup } from '@/composables/usePopup';
import GlobalPopup from '@/components/UI/Popup.vue';
import { onMounted, ref } from 'vue';

const popupTitle = ref('My Popup');
const myPopup = usePopup('my-popup');

// Example function to open the popup
const openPopup = () => {
  myPopup.open({ 
    message: 'Hello World', 
    data: { foo: 'bar' } 
  });
};

</script>

<style scoped></style>
