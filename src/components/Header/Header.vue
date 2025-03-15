<template>
  <header class="header">
    <ul class="header__list">
      <li>
        <router-link :to="baseDir"> Home </router-link>
      </li>
      <li>
        <router-link :to="baseDir + 'article'"> Article </router-link>
      </li>
    </ul>
  </header>
</template>

<script setup>
import { useHelperStore } from '@/stores/helpersStore.js';

const { baseDir } = useHelperStore();
</script>

<style scoped>
@import './index.scss';
</style>
