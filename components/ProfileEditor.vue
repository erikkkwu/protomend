<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue';
import { selectedProfile } from '@/core/model';
import { useConfig } from '@/composables/useConfig';
import { usePillScroller } from '@/composables/usePillScroller';
import HeaderRuleList from './HeaderRuleList.vue';
import SettingsModal from './SettingsModal.vue';

const props = defineProps<{ fullscreen?: boolean }>();

const { config, ready, addProfile, removeSelectedProfile, selectProfile, addExcludeFilter, removeExcludeFilter, replaceConfig } = useConfig();

const profile = computed(() => selectedProfile(config));

const settingsOpen = ref(false);

const pillTrack = useTemplateRef<HTMLElement>('pillTrack');
const pills = usePillScroller(pillTrack);

function onPillClick(index: number): void {
  if (pills.wasDrag()) return;
  selectProfile(index);
}

watch(
  () => config.selectedProfileIndex,
  (index) => void pills.scrollIntoView(index),
);
</script>

<template>
  <div
    v-if="ready"
    class="relative z-10 px-5 pt-5 pb-8 motion-safe:animate-[fade_.4s_ease]"
    :class="props.fullscreen ? 'mx-auto max-w-4xl pt-10' : ''"
  >
    <!-- atmospheric backdrop: soft glow only, sits behind content, never over text -->
    <div
      class="pointer-events-none fixed inset-0 -z-10"
      style="
        background:
          radial-gradient(90% 55% at 50% -8%, rgba(126, 231, 135, 0.1), transparent 65%),
          radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.025) 1px, transparent 0);
        background-size: 100% 100%, 22px 22px;
      "
    />

    <header class="mb-5 flex flex-col gap-3.5 border-b border-line pb-4">
      <div class="flex items-center gap-2.5">
        <span
          class="h-2.5 w-2.5 rounded-[2px] transition-colors"
          :class="profile?.enabled ? 'bg-signal shadow-[0_0_12px_-2px_var(--color-signal)]' : 'bg-ink-faint'"
        />
        <span class="text-[15px] font-extrabold tracking-[0.14em]">
          RE<span class="font-semibold text-ink-dim">HEADER</span>
        </span>
        <button
          type="button"
          class="ml-auto flex h-8 w-8 items-center justify-center rounded-[7px] border border-line bg-raised text-ink-dim transition-all hover:border-ink-faint hover:text-ink"
          title="New profile"
          @click="addProfile"
        >
          <svg viewBox="0 0 24 24" fill="none" class="h-[18px] w-[18px]" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14" stroke-linecap="round" />
          </svg>
        </button>
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-[7px] border border-line bg-raised text-ink-dim transition-all hover:border-ink-faint hover:text-ink"
          title="Settings"
          @click="settingsOpen = true"
        >
          <svg viewBox="0 0 24 24" fill="none" class="h-[18px] w-[18px]" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="3" />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
            />
          </svg>
        </button>
      </div>

      <div
        ref="pillTrack"
        class="no-scrollbar flex gap-1.5 overflow-x-auto"
        :class="pills.isDragging.value ? 'cursor-grabbing select-none' : 'cursor-grab'"
        @pointerdown="pills.onPointerdown"
        @pointermove="pills.onPointermove"
        @pointerup="pills.onPointerup"
        @pointercancel="pills.onPointerup"
        @pointerleave="pills.onPointerup"
        @wheel="pills.onWheel"
      >
        <button
          v-for="(p, i) in config.profiles"
          :key="i"
          type="button"
          class="max-w-[180px] shrink-0 truncate rounded-full border px-3 py-[5px] text-[11px] font-semibold transition-all"
          :class="
            i === config.selectedProfileIndex
              ? 'border-signal bg-signal text-bg shadow-[0_0_16px_-6px_var(--color-signal)]'
              : 'border-line bg-raised text-ink-dim hover:border-ink-faint hover:text-ink'
          "
          @click="onPillClick(i)"
        >
          {{ p.title || `Profile ${i + 1}` }}
        </button>
      </div>
    </header>

    <div v-if="profile">
      <div class="mb-6 flex items-center gap-2.5">
        <input
          v-model="profile.title"
          class="flex-1 rounded-[5px] border border-line bg-input px-2.5 py-2 font-mono text-xs font-medium transition focus:border-signal-dim focus:shadow-[0_0_0_3px] focus:shadow-signal/25 focus:outline-none"
          placeholder="Profile name"
        />
        <label class="flex select-none items-center gap-2 text-xs font-semibold text-ink-dim">
          <input v-model="profile.enabled" type="checkbox" class="switch" />
          Enabled
        </label>
        <label
          class="flex select-none items-center gap-2 text-xs font-semibold text-ink-dim"
          title="Apply the global exclude filters to this profile"
        >
          <input v-model="profile.useGlobalFilters" type="checkbox" class="switch" />
          Filters
        </label>
        <button
          type="button"
          class="ml-auto rounded-[5px] border border-line bg-raised px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-dim transition-all hover:border-danger hover:text-danger disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink-dim"
          :disabled="config.profiles.length <= 1"
          @click="removeSelectedProfile"
        >
          Delete
        </button>
      </div>

      <HeaderRuleList v-model="profile.requestHeaders" title="Request headers" flow="request" />
      <HeaderRuleList v-model="profile.responseHeaders" title="Response headers" flow="response" />
    </div>

    <SettingsModal
      v-if="settingsOpen"
      :config="config"
      @replace-config="replaceConfig"
      @add-filter="addExcludeFilter"
      @remove-filter="removeExcludeFilter"
      @close="settingsOpen = false"
    />
  </div>
</template>
