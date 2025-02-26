<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useUrlState } from '@packages/hooks';

import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore();
const { count, doubleCount } = storeToRefs(counterStore);

const query = useUrlState<{
  name: string;
  count: 0;
}>();
query.count = 0;
</script>

<template>
  <div
    class="flex w-full flex-col items-center justify-center gap-2"
  >
    <div class="text-[32px] text-slate-200">
      {{ count }}
    </div>
    <div class="text-[32px] text-slate-200">
      {{ doubleCount }}
    </div>
    <div class="text-[16px] text-slate-200">
      {{ query.count }}
    </div>
    <button @click="query.count++">++</button>
  </div>
</template>
