import { onUnmounted } from 'vue';

/**
 * A composable that safely watches scroll events, improving performance using
 * a throttled delay. It automatically removes the event listener
 * when the component is unmounted to prevent memory leaks.
 * 
 * @param callback The function to execute on scroll
 * @param delay The throttle delay in milliseconds (defaults to 1000ms)
 */
export const useScrollWatcher = (callback: () => void, delay = 1000) => {
    let ticking = false;

    const handleScroll = () => {
        // Uses setTimeout to limit event triggers to the specified delay
        if (!ticking) {
            setTimeout(() => {
                callback();
                ticking = false;
            }, delay);
            ticking = true;
        }
    };

    // Adds the listener as passive to not block scrolling (better performance)
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Removes the watcher automatically when the component is unmounted
    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });
}

export const pastThreeshold = (
    scrollY: number,
    threshold: number
) => scrollY > threshold

export const getPosition = () => window.scrollY

export const getScrollDirection = (
    scrollY: number,
    prevScrollY: number
) => scrollY > prevScrollY ? 'down' : 'up'

export const windowHeight = () => window.outerHeight