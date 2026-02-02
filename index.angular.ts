/**
 * @tri-hooks/library – Angular entry
 * Import all Angular hooks from one place: import { useToggle, useClipboard } from '@tri-hooks/library/angular'
 */

// Data & Async Hooks
export { useAsync } from './hooks/data-async/useAsync/angular';
export { useDebounce } from './hooks/data-async/useDebounce/angular';
export { useFetch } from './hooks/data-async/useFetch/angular';
export { useThrottle } from './hooks/data-async/useThrottle/angular';
export { useInterval } from './hooks/data-async/useInterval/angular';
export { useTimeout } from './hooks/data-async/useTimeout/angular';
export { useIdle } from './hooks/data-async/useIdle/angular';
export { useDebouncedValue } from './hooks/data-async/useDebouncedValue/angular';

// State & UI Hooks
export { useCounter } from './hooks/state-ui/useCounter/angular';
export { useToggle } from './hooks/state-ui/useToggle/angular';
export { usePrevious } from './hooks/state-ui/usePrevious/angular';
export { useClipboard } from './hooks/state-ui/useClipboard/angular';
export { useHover } from './hooks/state-ui/useHover/angular';

// DOM & Events Hooks
export { useIntersectionObserver } from './hooks/dom-events/useIntersectionObserver/angular';
export { useResizeObserver } from './hooks/dom-events/useResizeObserver/angular';
export { useKeyPress } from './hooks/dom-events/useKeyPress/angular';

// Storage Hooks
export { useLocalStorage } from './hooks/storage/useLocalStorage/angular';

// Device & Connectivity Hooks
export { useNetwork } from './hooks/device-connectivity/useNetwork/angular';

// Animation Hooks
export { useAnimationFrame } from './hooks/animation/useAnimationFrame/angular';

// Notification Hooks
export { useToast } from './hooks/notifications/useToast/angular';

// Media Hooks
export { useMediaQuery } from './hooks/media/useMediaQuery/angular';
export { usePreferredColorScheme } from './hooks/media/usePreferredColorScheme/angular';

// Browser API Hooks
export { usePageVisibility } from './hooks/browser-apis/usePageVisibility/angular';
export { useLockBodyScroll } from './hooks/browser-apis/useLockBodyScroll/angular';

// Form Hooks
export { useValidation } from './hooks/forms/useValidation/angular';
