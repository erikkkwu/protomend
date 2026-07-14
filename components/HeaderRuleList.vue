<script setup lang="ts">
import type { HeaderRule } from '@/core/model';
import { computed } from 'vue';
import { createHeaderRule } from '@/core/model';
import HeaderNameInput from './HeaderNameInput.vue';

const props = defineProps<{ title: string; flow?: 'request' | 'response' }>();
const rules = defineModel<HeaderRule[]>({ required: true });
const nameFlow = computed(() => props.flow ?? 'request');
const accent = computed(() => (props.flow === 'response' ? '#d2a8ff' : '#58a6ff'));
const glyph = computed(() => (props.flow === 'response' ? '←' : '→'));

function addRule(): void {
  rules.value = [...rules.value, createHeaderRule()];
}

function removeRule(index: number): void {
  rules.value = rules.value.filter((_, i) => i !== index);
}
</script>

<template>
  <section class="mb-5">
    <header class="list-head">
      <span class="w-4 text-center font-mono text-sm font-bold" :style="{ color: accent }">{{ glyph }}</span>
      <h3 class="text-[11px] font-bold uppercase tracking-[0.1em] text-ink">
        {{ title }}
      </h3>
      <span class="count-badge">{{ rules.length }}</span>
      <button type="button" class="add-btn" @click="addRule">
        + Add
      </button>
    </header>

    <p v-if="rules.length === 0" class="list-empty ml-[25px] py-2">
      No rules defined.
    </p>

    <div v-else class="flex flex-col gap-1.5">
      <div
        v-for="(rule, index) in rules"
        :key="index"
        class="rule-row transition-all focus-within:z-10 hover:border-line"
      >
        <span
          class="accent-bar transition-all"
          :class="{ 'opacity-45': !rule.enabled }"
          :style="rule.enabled ? { background: accent, boxShadow: `0 0 10px -1px ${accent}` } : { background: '#5c6773' }"
        />
        <input v-model="rule.enabled" type="checkbox" class="switch" title="Enabled">
        <HeaderNameInput v-model="rule.name" :flow="nameFlow" :dimmed="!rule.enabled" />
        <span class="font-mono font-bold text-ink-faint" :class="{ 'opacity-45': !rule.enabled }">:</span>
        <input
          v-model="rule.value"
          class="field flex-[2_1_55%]"
          :class="{ 'opacity-45': !rule.enabled }"
          placeholder="value"
        >
        <button
          type="button"
          class="row-del"
          :class="{ 'opacity-45': !rule.enabled }"
          title="Remove"
          @click="removeRule(index)"
        >
          ×
        </button>
      </div>
    </div>
  </section>
</template>
