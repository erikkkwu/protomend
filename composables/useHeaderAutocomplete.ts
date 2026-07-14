import type { ComputedRef, Ref } from 'vue';
import type { HeaderFlow } from '@/core/commonHeaders';
import { useFuse } from '@vueuse/integrations/useFuse';
import { computed, ref } from 'vue';
import { headerNamesFor } from '@/core/commonHeaders';

export interface HeaderAutocomplete {
  isOpen: ComputedRef<boolean>;
  suggestions: ComputedRef<string[]>;
  isHighlighted: (index: number) => boolean;
  highlight: (index: number) => void;
  onInput: () => void;
  onKeydown: (e: KeyboardEvent) => void;
  select: (name: string) => void;
  close: () => void;
}

export function useHeaderAutocomplete(
  name: Ref<string>,
  flow: Ref<HeaderFlow>,
): HeaderAutocomplete {
  const dismissed = ref(true);
  const highlighted = ref(-1);

  const { results } = useFuse(name, () => [...headerNamesFor(flow.value)], {
    fuseOptions: { threshold: 0.4, ignoreLocation: true },
    resultLimit: 8,
  });

  const suggestions = computed(() =>
    name.value.trim().length === 0 ? [] : results.value.map(r => r.item),
  );

  const isOpen = computed(() => !dismissed.value && suggestions.value.length > 0);

  function isHighlighted(index: number): boolean {
    return highlighted.value === index;
  }

  function highlight(index: number): void {
    highlighted.value = index;
  }

  function onInput(): void {
    dismissed.value = false;
    highlighted.value = -1;
  }

  function select(picked: string): void {
    name.value = picked;
    dismissed.value = true;
    highlighted.value = -1;
  }

  function close(): void {
    dismissed.value = true;
    highlighted.value = -1;
  }

  function onKeydown(e: KeyboardEvent): void {
    if (!isOpen.value)
      return;
    const list = suggestions.value;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        highlighted.value = (highlighted.value + 1) % list.length;
        break;
      case 'ArrowUp':
        e.preventDefault();
        highlighted.value = (highlighted.value - 1 + list.length) % list.length;
        break;
      case 'Enter': {
        const picked = list[highlighted.value];
        if (picked !== undefined) {
          e.preventDefault();
          select(picked);
        }
        break;
      }
      case 'Tab': {
        const picked = list[highlighted.value];
        if (picked !== undefined) {
          select(picked);
        }
        else {
          close();
        }
        break;
      }
      case 'Escape':
        e.preventDefault();
        close();
        break;
    }
  }

  return {
    isOpen,
    suggestions,
    isHighlighted,
    highlight,
    onInput,
    onKeydown,
    select,
    close,
  };
}
