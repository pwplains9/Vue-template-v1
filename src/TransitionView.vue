<script setup>
import Home from '@/pages/Home/Home.vue';

const screens = {
  home: Home
};
import Header from '@/components/Header/Header.vue';
import { ref, shallowRef, watch } from 'vue';

const onAfterEnter = (el) => {
  el.classList.add('is-screen-active');
};

const onBeforeLeave = (el) => {
  el.classList.remove('is-screen-active');
};

const screen = ref('home');

let activeScreenComponent = shallowRef(screens[screen.value]);

watch(screen, (val) => {
  document.documentElement.dataset.screen = val;

  if (screens[val]) {
    activeScreenComponent.value = screens[val];
  }
});
</script>

<template>
  <Header />
  <div class="site-container">
    <Transition mode="out-in" appear @after-enter="onAfterEnter" @before-leave="onBeforeLeave">
      <component :is="activeScreenComponent"></component>
    </Transition>
  </div>
</template>

<style scoped></style>
