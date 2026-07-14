import { describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { useHeaderAutocomplete } from './useHeaderAutocomplete';
import type { HeaderFlow } from '@/core/commonHeaders';

function setup(initial = '', flow: HeaderFlow = 'request') {
  const name = ref(initial);
  const flowRef = ref<HeaderFlow>(flow);
  const ac = useHeaderAutocomplete(name, flowRef);
  if (initial !== '') ac.onInput();
  return { name, flowRef, ac };
}

function key(k: string): KeyboardEvent {
  return new KeyboardEvent('keydown', { key: k, cancelable: true });
}

describe('useHeaderAutocomplete — open/close', () => {
  it('is closed when the name is empty', () => {
    const { ac } = setup('');
    expect(ac.isOpen.value).toBe(false);
    expect(ac.suggestions.value).toEqual([]);
  });

  it('opens with matches once at least one char is typed', () => {
    const { ac } = setup('aut');
    expect(ac.isOpen.value).toBe(true);
    expect(ac.suggestions.value).toContain('Authorization');
  });

  it('stays closed on mount for a pre-filled name until the user interacts', () => {
    const name = ref('Accept-Encoding');
    const flowRef = ref<HeaderFlow>('request');
    const ac = useHeaderAutocomplete(name, flowRef);
    expect(ac.isOpen.value).toBe(false);
    ac.onInput();
    expect(ac.isOpen.value).toBe(true);
  });

  it('stays closed when nothing matches a custom name', () => {
    const { ac } = setup('X-My-Custom-Thing');
    expect(ac.isOpen.value).toBe(false);
  });

  it('uses the response list for the response flow', () => {
    const { ac } = setup('set', 'response');
    expect(ac.suggestions.value).toContain('Set-Cookie');
  });
});

describe('useHeaderAutocomplete — selection', () => {
  it('fills the name and closes on select', () => {
    const { name, ac } = setup('aut');
    ac.select('Authorization');
    expect(name.value).toBe('Authorization');
    expect(ac.isOpen.value).toBe(false);
  });

  it('reopens on further input after selecting', () => {
    const { name, ac } = setup('aut');
    ac.select('Authorization');
    name.value = 'acc';
    ac.onInput();
    expect(ac.isOpen.value).toBe(true);
  });
});

describe('useHeaderAutocomplete — keyboard', () => {
  it('ArrowDown/ArrowUp wrap the highlight', () => {
    const { ac } = setup('a');
    const n = ac.suggestions.value.length;
    expect(n).toBeGreaterThan(1);
    ac.onKeydown(key('ArrowDown'));
    expect(ac.highlighted.value).toBe(0);
    ac.onKeydown(key('ArrowUp'));
    expect(ac.highlighted.value).toBe(n - 1);
    ac.onKeydown(key('ArrowDown'));
    expect(ac.highlighted.value).toBe(0);
  });

  it('Enter accepts the highlighted suggestion', () => {
    const { name, ac } = setup('aut');
    ac.onKeydown(key('ArrowDown'));
    const expected = ac.suggestions.value[0];
    ac.onKeydown(key('Enter'));
    expect(name.value).toBe(expected);
    expect(ac.isOpen.value).toBe(false);
  });

  it('Enter with no highlight does not change the name', () => {
    const { name, ac } = setup('aut');
    ac.onKeydown(key('Enter'));
    expect(name.value).toBe('aut');
  });

  it('Escape dismisses but keeps the typed text', () => {
    const { name, ac } = setup('aut');
    ac.onKeydown(key('Escape'));
    expect(ac.isOpen.value).toBe(false);
    expect(name.value).toBe('aut');
  });

  it('Tab accepts the highlighted suggestion', () => {
    const { name, ac } = setup('aut');
    ac.onKeydown(key('ArrowDown'));
    const expected = ac.suggestions.value[0];
    ac.onKeydown(key('Tab'));
    expect(name.value).toBe(expected);
  });

  it('Tab with no highlight closes without changing the name', () => {
    const { name, ac } = setup('aut');
    ac.onKeydown(key('Tab'));
    expect(ac.isOpen.value).toBe(false);
    expect(name.value).toBe('aut');
  });

  it('ignores keys while closed', () => {
    const { ac } = setup('X-Custom');
    ac.onKeydown(key('ArrowDown'));
    expect(ac.highlighted.value).toBe(-1);
  });
});
