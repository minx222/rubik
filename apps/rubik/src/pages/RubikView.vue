<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';
import { RubikThreeJs } from './rubik';

const threeRef = useTemplateRef('three');

let threeInstance: RubikThreeJs;

const init = () => {
  if (!threeRef.value) {
    return;
  }
  threeInstance = new RubikThreeJs(threeRef.value);

  threeInstance.render();

  window.addEventListener('mousedown', (e) => {
    if (e.button === 0 && e.ctrlKey) {
      // Ctrl + 左键
      threeInstance.handleCtrlLeftClick(e);
    } else if (e.button === 2 && e.ctrlKey) {
      // Ctrl + 右键
      threeInstance.handleCtrlRightClick(e);
    } else if (e.button === 0) {
      // 普通左键
      threeInstance.touchStart(e);
    } else if (e.button === 2) {
      // 普通右键
      threeInstance.handleRightClick(e);
    }
  });
};

onMounted(() => {
  init();
});
</script>

<template>
  <div
    class="flex w-full flex-col items-center justify-center"
    ref="three"
  ></div>
</template>
