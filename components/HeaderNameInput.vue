<script setup lang="ts">
import { toRef } from 'vue';
import type { HeaderFlow } from '@/core/commonHeaders';
import { useHeaderAutocomplete } from '@/composables/useHeaderAutocomplete';

const name = defineModel<string>({ required: true });
const props = defineProps<{ flow: HeaderFlow; placeholder?: string; dimmed?: boolean }>();

const { isOpen, suggestions, highlighted, onInput, onKeydown, select, close } = useHeaderAutocomplete(
  name,
  toRef(()=> props.flow),
);

function pick(suggestion: string): void {
  select(suggestion);
}
</script>

<template>
  <div class="relative flex-[1_1_40%]">
    <input
      v-model="name"
      class="field w-full"
      :class="{ 'opacity-45': props.dimmed }"
      :placeholder="props.placeholder ?? 'Header-Name'"
      autocomplete="off"
      spellcheck="false"
      @input="onInput"
      @keydown="onKeydown"
      @blur="close"
    />
    <ul
      v-if="isOpen"
      class="absolute left-0 right-0 top-[calc(100%+3px)] z-20 max-h-52 overflow-y-auto rounded-[5px] border border-line bg-raised py-1 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.7)]"
    >
      <li
        v-for="(suggestion, i) in suggestions"
        :key="suggestion"
        class="cursor-pointer px-2.5 py-1.5 font-mono text-xs transition-colors"
        :class="i === highlighted ? 'bg-signal/15 text-ink' : 'text-ink-dim hover:bg-line-soft hover:text-ink'"
        @mousedown.prevent="pick(suggestion)"
        @mousemove="highlighted = i"
      >
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>
