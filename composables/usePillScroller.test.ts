import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { usePillScroller } from './usePillScroller';

function makeTrack(scrollWidth = 800, clientWidth = 300): HTMLElement {
  const el = document.createElement('div');
  Object.defineProperty(el, 'clientWidth', { value: clientWidth, configurable: true });
  Object.defineProperty(el, 'scrollWidth', { value: scrollWidth, configurable: true });
  let sl = 0;
  Object.defineProperty(el, 'scrollLeft', {
    get: () => sl,
    set: (v) => {
      sl = Math.max(0, Math.min(v, scrollWidth - clientWidth));
    },
    configurable: true,
  });
  el.scrollTo = ((opts: ScrollToOptions) => {
    if (typeof opts?.left === 'number')
      el.scrollLeft = opts.left;
  }) as typeof el.scrollTo;
  el.setPointerCapture = () => {};
  el.scrollIntoView = () => {};
  return el;
}

function pointer(type: string, clientX: number, t: number): PointerEvent {
  const e = new PointerEvent(type, { clientX, pointerId: 1, bubbles: true });
  Object.defineProperty(e, 'timeStamp', { value: t, configurable: true });
  return e;
}

describe('usePillScroller — drag', () => {
  let track: HTMLElement;
  let trackRef: ReturnType<typeof ref<HTMLElement | undefined>>;
  let s: ReturnType<typeof usePillScroller>;

  beforeEach(() => {
    track = makeTrack();
    trackRef = ref(track);
    s = usePillScroller(trackRef);
  });

  it('drag beyond the threshold pans the track and counts as a drag', () => {
    s.onPointerdown(pointer('pointerdown', 200, 0));
    s.onPointermove(pointer('pointermove', 160, 16)); // moved 40px left → scroll right
    s.onPointerup();
    expect(track.scrollLeft).toBeGreaterThan(0);
    expect(s.wasDrag()).toBe(true);
  });

  it('a tiny movement stays a click, not a drag', () => {
    s.onPointerdown(pointer('pointerdown', 200, 0));
    s.onPointermove(pointer('pointermove', 197, 16)); // 3px < 10px threshold
    s.onPointerup();
    expect(track.scrollLeft).toBe(0);
    expect(s.wasDrag()).toBe(false);
    expect(s.isDragging.value).toBe(false);
  });

  it('sets isDragging true only while a real drag is in progress', () => {
    s.onPointerdown(pointer('pointerdown', 200, 0));
    expect(s.isDragging.value).toBe(false);
    s.onPointermove(pointer('pointermove', 150, 16));
    expect(s.isDragging.value).toBe(true);
    s.onPointerup();
    expect(s.isDragging.value).toBe(false);
  });
});

describe('usePillScroller — wheel', () => {
  function wheel(deltaX: number, deltaY: number): WheelEvent {
    return new WheelEvent('wheel', { deltaX, deltaY, bubbles: true, cancelable: true });
  }

  it('translates vertical wheel into horizontal scroll when overflowing', () => {
    const track = makeTrack(800, 300);
    const s = usePillScroller(ref(track));
    s.onWheel(wheel(0, 120));
    expect(track.scrollLeft).toBe(120);
  });

  it('does nothing when the track does not overflow', () => {
    const track = makeTrack(300, 300);
    const s = usePillScroller(ref(track));
    s.onWheel(wheel(0, 120));
    expect(track.scrollLeft).toBe(0);
  });

  it('prefers deltaX when horizontal intent dominates', () => {
    const track = makeTrack(800, 300);
    const s = usePillScroller(ref(track));
    s.onWheel(wheel(90, 10));
    expect(track.scrollLeft).toBe(90);
  });
});

describe('usePillScroller — scrollIntoView', () => {
  it('scrolls the pill at the given index into view after the DOM updates', async () => {
    const track = makeTrack();
    const calls: number[] = [];
    for (let i = 0; i < 3; i++) {
      const pill = document.createElement('button');
      pill.scrollIntoView = () => calls.push(i);
      track.appendChild(pill);
    }
    const s = usePillScroller(ref(track));
    await s.scrollIntoView(2);
    expect(calls).toEqual([2]);
  });

  it('is a no-op for an out-of-range index', async () => {
    const track = makeTrack();
    const s = usePillScroller(ref(track));
    await expect(s.scrollIntoView(5)).resolves.toBeUndefined();
  });
});

describe('usePillScroller — inertia', () => {
  let raf: typeof requestAnimationFrame;
  let queue: FrameRequestCallback[];

  beforeEach(() => {
    queue = [];
    raf = globalThis.requestAnimationFrame;
    globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      queue.push(cb);
      return queue.length;
    }) as typeof requestAnimationFrame;
    globalThis.cancelAnimationFrame = (() => {}) as typeof cancelAnimationFrame;
  });

  afterEach(() => {
    globalThis.requestAnimationFrame = raf;
  });

  function flushFrames(max = 100): void {
    let n = 0;
    while (queue.length && n++ < max) {
      const cb = queue.shift()!;
      cb(0);
    }
  }

  it('keeps scrolling after a fast drag release (momentum)', () => {
    const track = makeTrack(800, 300);
    const s = usePillScroller(ref(track));
    s.onPointerdown(pointer('pointerdown', 200, 0));
    // fast drag left: big movement over small time → high velocity
    s.onPointermove(pointer('pointermove', 100, 16));
    const atRelease = track.scrollLeft;
    s.onPointerup();
    flushFrames();
    expect(track.scrollLeft).toBeGreaterThan(atRelease);
  });

  it('does not start momentum after a slow/tiny drag', () => {
    const track = makeTrack(800, 300);
    const s = usePillScroller(ref(track));
    s.onPointerdown(pointer('pointerdown', 200, 0));
    s.onPointermove(pointer('pointermove', 150, 5000)); // moved but over long time → ~0 velocity
    const atRelease = track.scrollLeft;
    s.onPointerup();
    flushFrames();
    expect(track.scrollLeft).toBe(atRelease);
  });
});
