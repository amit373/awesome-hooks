/**
 * @tri-hooks/library – Vue entry
 * Import all Vue hooks from one place: import { useToggle, useClipboard } from '@tri-hooks/library/vue'
 */

// Data & Async Hooks
export { useAsync } from './hooks/data-async/useAsync/vue';
export { useDebounce } from './hooks/data-async/useDebounce/vue';
export { useFetch } from './hooks/data-async/useFetch/vue';
export { useThrottle } from './hooks/data-async/useThrottle/vue';
export { useInterval } from './hooks/data-async/useInterval/vue';
export { useTimeout } from './hooks/data-async/useTimeout/vue';
export { useIdle } from './hooks/data-async/useIdle/vue';
export { useDebouncedValue } from './hooks/data-async/useDebouncedValue/vue';

// State & UI Hooks
export { useCounter } from './hooks/state-ui/useCounter/vue';
export { useToggle } from './hooks/state-ui/useToggle/vue';
export { usePrevious } from './hooks/state-ui/usePrevious/vue';
export { useClipboard } from './hooks/state-ui/useClipboard/vue';
export { useHover } from './hooks/state-ui/useHover/vue';

// DOM & Events Hooks
export { useIntersectionObserver } from './hooks/dom-events/useIntersectionObserver/vue';
export { useResizeObserver } from './hooks/dom-events/useResizeObserver/vue';
export { useKeyPress } from './hooks/dom-events/useKeyPress/vue';

// Storage Hooks
export { useLocalStorage } from './hooks/storage/useLocalStorage/vue';

// Device & Connectivity Hooks
export { useNetwork } from './hooks/device-connectivity/useNetwork/vue';

// Animation Hooks
export { useAnimationFrame } from './hooks/animation/useAnimationFrame/vue';

// Notification Hooks
export { useToast } from './hooks/notifications/useToast/vue';

// Media Hooks
export { useMediaQuery } from './hooks/media/useMediaQuery/vue';
export { usePreferredColorScheme } from './hooks/media/usePreferredColorScheme/vue';

// Browser API Hooks
export { usePageVisibility } from './hooks/browser-apis/usePageVisibility/vue';
export { useLockBodyScroll } from './hooks/browser-apis/useLockBodyScroll/vue';

// Form Hooks
export { useValidation } from './hooks/forms/useValidation/vue';
