<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({
  name: 'SvgIcon'
});

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#333'
  }
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);

// USE <svg-icon name="name-icon"/>
</script>
