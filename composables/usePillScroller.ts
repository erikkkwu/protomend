import type { Ref } from 'vue';
import { useRafFn, useScroll } from '@vueuse/core';
import { nextTick, ref } from 'vue';

const DRAG_THRESHOLD_PX = 10;

export interface PillScroller {
  onPointerdown: (e: PointerEvent) => void;
  onPointermove: (e: PointerEvent) => void;
  onPointerup: () => void;
  onWheel: (e: WheelEvent) => void;
  isDragging: Ref<boolean>;
  wasDrag: () => boolean;
  scrollIntoView: (index: number) => Promise<void>;
  stop: () => void;
}

const INERTIA_DECAY = 0.92;
const MIN_INERTIA_VELOCITY = 0.1;

export function usePillScroller(trackRef: Readonly<Ref<HTMLElement | null | undefined>>): PillScroller {
  const { x } = useScroll(trackRef);

  const isDragging = ref(false);
  let pointerDown = false;
  let capturedPointerId = -1;
  let dragStartX = 0;
  let dragStartScroll = 0;
  let dragMoved = 0;

  let lastX = 0;
  let lastT = 0;
  let velocity = 0;
  let inertiaVelocity = 0;

  const inertia = useRafFn(
    () => {
      inertiaVelocity *= INERTIA_DECAY;
      x.value -= inertiaVelocity;
      if (Math.abs(inertiaVelocity) <= 0.5)
        inertia.pause();
    },
    { immediate: false },
  );

  function stopInertia(): void {
    inertia.pause();
  }

  function onPointerdown(e: PointerEvent): void {
    const track = trackRef.value;
    if (!track)
      return;
    stopInertia();
    pointerDown = true;
    capturedPointerId = e.pointerId;
    dragStartX = e.clientX;
    dragStartScroll = x.value;
    dragMoved = 0;
    isDragging.value = false;
    lastX = e.clientX;
    lastT = e.timeStamp;
    velocity = 0;
  }

  function onPointermove(e: PointerEvent): void {
    const track = trackRef.value;
    if (!pointerDown || !track)
      return;
    const delta = e.clientX - dragStartX;
    dragMoved = Math.max(dragMoved, Math.abs(delta));
    if (!isDragging.value && dragMoved > DRAG_THRESHOLD_PX) {
      isDragging.value = true;
      track.setPointerCapture(capturedPointerId);
    }
    if (isDragging.value) {
      x.value = dragStartScroll - delta;
      const dt = e.timeStamp - lastT;
      if (dt > 0)
        velocity = (e.clientX - lastX) / dt;
      lastX = e.clientX;
      lastT = e.timeStamp;
    }
  }

  function onPointerup(): void {
    const wasDragging = isDragging.value;
    pointerDown = false;
    isDragging.value = false;
    if (wasDragging && Math.abs(velocity) > MIN_INERTIA_VELOCITY)
      startInertia();
  }

  function startInertia(): void {
    inertiaVelocity = velocity * 16;
    inertia.resume();
  }

  function onWheel(e: WheelEvent): void {
    const track = trackRef.value;
    if (!track || track.scrollWidth <= track.clientWidth)
      return;
    const amount = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (amount === 0)
      return;
    e.preventDefault();
    stopInertia();
    x.value += amount;
  }

  function wasDrag(): boolean {
    return dragMoved > DRAG_THRESHOLD_PX;
  }

  async function scrollIntoView(index: number): Promise<void> {
    await nextTick();
    const track = trackRef.value;
    if (!track)
      return;
    const pill = track.children[index];
    pill?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
  }

  return { onPointerdown, onPointermove, onPointerup, onWheel, isDragging, wasDrag, scrollIntoView, stop: stopInertia };
}
