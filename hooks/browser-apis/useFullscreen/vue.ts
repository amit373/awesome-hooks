import { onMounted, onUnmounted, ref } from 'vue';

import { Ref } from 'vue';

interface UseFullscreenReturn {
  isFullscreen: Ref<boolean>;
  enterFullscreen: (element?: HTMLElement) => Promise<void>;
  exitFullscreen: () => Promise<void>;
  toggleFullscreen: (element?: HTMLElement) => Promise<void>;
  isEnabled: Ref<boolean>;
}

/**
 * Vue composable for controlling fullscreen mode
 * @returns Fullscreen state and control functions
 */
export function useFullscreen(): UseFullscreenReturn {
  const isFullscreen = ref(false);
  const isEnabled = ref(true);

  const updateFullscreenState = () => {
    isFullscreen.value = !!document.fullscreenElement;
  };

  onMounted(() => {
    if (typeof document === 'undefined') return;

    // Check if fullscreen API is supported
    if (
      !(document as any).fullscreenEnabled &&
      !(document as any).webkitFullscreenEnabled
    ) {
      isEnabled.value = false;
      return;
    }

    // Listen for fullscreen change events
    const eventName =
      'onfullscreenchange' in document
        ? 'fullscreenchange'
        : 'webkitfullscreenchange';
    document.addEventListener(eventName, updateFullscreenState);

    // Initial state check
    updateFullscreenState();
  });

  onUnmounted(() => {
    const eventName =
      'onfullscreenchange' in document
        ? 'fullscreenchange'
        : 'webkitfullscreenchange';
    document.removeEventListener(eventName, updateFullscreenState);
  });

  const enterFullscreen = async (element?: HTMLElement) => {
    if (!isEnabled.value) return;

    const targetElement = element || document.documentElement;

    try {
      if (targetElement.requestFullscreen) {
        await targetElement.requestFullscreen();
      } else if ((targetElement as any).webkitRequestFullscreen) {
        await (targetElement as any).webkitRequestFullscreen();
      }
    } catch (error) {
      console.error('Error entering fullscreen:', error);
    }
  };

  const exitFullscreen = async () => {
    if (!isEnabled.value) return;

    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      }
    } catch (error) {
      console.error('Error exiting fullscreen:', error);
    }
  };

  const toggleFullscreen = async (element?: HTMLElement) => {
    if (isFullscreen.value) {
      await exitFullscreen();
    } else {
      await enterFullscreen(element);
    }
  };

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    isEnabled,
  };
}
