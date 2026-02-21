import { onMounted, onUnmounted, ref, type Ref } from 'vue';

/**
 * A composable that uses the native IntersectionObserver API to detect
 * when an element enters or leaves the viewport.
 * 
 * @param target The DOM element or Vue component reference to observe
 * @param options IntersectionObserver options (root, rootMargin, threshold)
 * @returns An object containing the reactive `isIntersecting` boolean
 */
export function useIntersectionObserver(
  target: Ref<HTMLElement | null>,
  options: IntersectionObserverInit = { rootMargin: '0px', threshold: 0.1 }
) {
  const isIntersecting = ref(false);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      isIntersecting.value = entry.isIntersecting;
    }, options);

    if (target.value) {
      observer.observe(target.value);
    }
  });

  onUnmounted(() => {
    if (observer && target.value) {
      observer.unobserve(target.value);
    }
    observer?.disconnect();
  });

  return { isIntersecting };
}
