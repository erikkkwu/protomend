<script setup lang="ts">
import type { Config } from '@/core/model';
import { refAutoReset, useClipboard, useFileDialog } from '@vueuse/core';
import { ref } from 'vue';
import { exportConfig, importConfig } from '@/core/profileJson';

const props = defineProps<{ config: Config }>();
const emit = defineEmits<{
  close: [];
  replaceConfig: [next: Config];
  addFilter: [];
  removeFilter: [index: number];
}>();

type Tab = 'filters' | 'share';
const activeTab = ref<Tab>('filters');
const tabs: { id: Tab; label: string; glyph: string }[] = [
  { id: 'filters', label: 'Filters', glyph: '⊘' },
  { id: 'share', label: 'Share', glyph: '⇄' },
];

const downloaded = refAutoReset(false, 1500);
const importFlash = refAutoReset<'success' | 'error' | null>(null, 3000);

const { copy, copied } = useClipboard({ source: () => exportConfig(props.config) });

const { open: openImport, reset: resetImport, onChange: onImportChange } = useFileDialog({
  accept: 'application/json',
  multiple: false,
});

onImportChange(async (files) => {
  const file = files?.[0];
  if (!file)
    return;
  try {
    emit('replaceConfig', importConfig(await file.text()));
    importFlash.value = 'success';
  }
  catch {
    importFlash.value = 'error';
  }
  resetImport();
});

function download(): void {
  const blob = new Blob([exportConfig(props.config)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'reheader-settings.json';
  link.click();
  URL.revokeObjectURL(url);
  downloaded.value = true;
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-6 backdrop-blur-sm"
    @click.self="emit('close')"
  >
    <div
      class="my-auto flex w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-line bg-raised shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] motion-safe:animate-[fade_.25s_ease]"
    >
      <header class="flex items-center gap-2.5 border-b border-line px-5 py-4">
        <span class="h-2 w-2 rounded-full bg-signal shadow-[0_0_10px_-1px_var(--color-signal)]" />
        <h2 class="text-[13px] font-bold uppercase tracking-[0.12em] text-ink">
          Global Settings
        </h2>
        <button
          type="button"
          class="ml-auto flex h-7 w-7 items-center justify-center rounded text-lg leading-none text-ink-faint transition-colors hover:bg-danger/10 hover:text-danger"
          title="Close"
          @click="emit('close')"
        >
          ×
        </button>
      </header>

      <div class="flex min-h-[300px]">
        <nav class="flex w-[140px] shrink-0 flex-col gap-1 border-r border-line bg-panel/50 p-2.5">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="flex items-center gap-2 rounded-[6px] px-3 py-2 text-left text-[12px] font-semibold transition-all"
            :class="
              activeTab === tab.id
                ? 'bg-signal/15 text-signal'
                : 'text-ink-dim hover:bg-line-soft hover:text-ink'
            "
            @click="activeTab = tab.id"
          >
            <span class="w-5 text-center font-mono text-base leading-none">{{ tab.glyph }}</span>
            {{ tab.label }}
          </button>
        </nav>

        <div class="min-w-0 flex-1 px-5 py-4">
          <section v-show="activeTab === 'filters'">
            <div class="list-head mb-1">
              <h3 class="text-[11px] font-bold uppercase tracking-[0.1em] text-ink">
                Exclude URL filters
              </h3>
              <span class="count-badge bg-panel">{{ config.globalExcludeFilters.length }}</span>
              <button type="button" class="add-btn" @click="emit('addFilter')">
                + Add
              </button>
            </div>
            <p class="mb-3 font-mono text-[10px] leading-relaxed text-ink-faint">
              Requests whose URL matches any pattern below are exempt from all rule modifications
              (for profiles with Filters enabled).
            </p>

            <p v-if="config.globalExcludeFilters.length === 0" class="list-empty">
              No exclude patterns.
            </p>

            <div v-else class="flex flex-col gap-1.5">
              <div
                v-for="(filter, index) in config.globalExcludeFilters"
                :key="index"
                class="rule-row"
                :class="{ 'opacity-45': !filter.enabled }"
              >
                <span
                  class="accent-bar"
                  :class="filter.enabled ? 'bg-danger shadow-[0_0_10px_-1px_var(--color-danger)]' : 'bg-ink-faint'"
                />
                <input v-model="filter.enabled" type="checkbox" class="switch" title="Enabled">
                <input v-model="filter.pattern" class="field flex-1" placeholder="e.g. .*analytics\.com.*">
                <button type="button" class="row-del" title="Remove" @click="emit('removeFilter', index)">
                  ×
                </button>
              </div>
            </div>
          </section>

          <section v-show="activeTab === 'share'">
            <h3 class="mb-1 text-[11px] font-bold uppercase tracking-[0.1em] text-ink">
              Share settings
            </h3>
            <p class="mb-3 font-mono text-[10px] leading-relaxed text-ink-faint">
              Export all profiles and global filters as JSON to back up or share with others.
            </p>
            <div class="flex flex-col gap-2.5">
              <button
                type="button"
                class="rounded-[5px] border border-signal-dim bg-panel px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-signal transition-all hover:bg-signal/15"
                @click="download"
              >
                <Transition name="swap" mode="out-in">
                  <span v-if="downloaded" key="done" class="block">✓ Settings downloaded</span>
                  <span v-else key="idle" class="block">↓ Download JSON</span>
                </Transition>
              </button>
              <button
                type="button"
                class="rounded-[5px] border border-line bg-panel px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-dim transition-all hover:border-ink-faint hover:text-ink"
                @click="copy()"
              >
                <Transition name="swap" mode="out-in">
                  <span v-if="copied" key="done" class="block text-signal">✓ Copied to clipboard</span>
                  <span v-else key="idle" class="block">⧉ Copy JSON</span>
                </Transition>
              </button>
              <button
                type="button"
                class="rounded-[5px] border border-line bg-panel px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-dim transition-all hover:border-ink-faint hover:text-ink"
                @click="openImport()"
              >
                <Transition name="swap" mode="out-in">
                  <span v-if="importFlash === 'success'" key="done" class="block text-signal">✓ Settings imported</span>
                  <span v-else-if="importFlash === 'error'" key="fail" class="block text-danger">✗ Import failed: not a valid settings JSON</span>
                  <span v-else key="idle" class="block">↑ Import JSON</span>
                </Transition>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
