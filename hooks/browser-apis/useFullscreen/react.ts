import { useState, useEffect, useCallback } from 'react';

interface UseFullscreenReturn {
  isFullscreen: boolean;
  enterFullscreen: (element?: HTMLElement) => Promise<void>;
  exitFullscreen: () => Promise<void>;
  toggleFullscreen: (element?: HTMLElement) => Promise<void>;
  isEnabled: boolean;
}

/**
 * React hook for controlling fullscreen mode
 * @returns Fullscreen state and control functions
 */
export function useFullscreen(): UseFullscreenReturn {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const updateFullscreenState = useCallback(() => {
    setIsFullscreen(!!document.fullscreenElement);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Check if fullscreen API is supported
    if (
      !(document as any).fullscreenEnabled &&
      !(document as any).webkitFullscreenEnabled
    ) {
      setIsEnabled(false);
      return;
    }

    // Listen for fullscreen change events
    const eventName =
      'onfullscreenchange' in document
        ? 'fullscreenchange'
        : 'webkitfullscreenchange';
    document.addEventListener(eventName, updateFullscreenState);

    return () => {
      document.removeEventListener(eventName, updateFullscreenState);
    };
  }, [updateFullscreenState]);

  const enterFullscreen = useCallback(
    async (element?: HTMLElement) => {
      if (!isEnabled) return;

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
    },
    [isEnabled]
  );

  const exitFullscreen = useCallback(async () => {
    if (!isEnabled) return;

    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      }
    } catch (error) {
      console.error('Error exiting fullscreen:', error);
    }
  }, [isEnabled]);

  const toggleFullscreen = useCallback(
    async (element?: HTMLElement) => {
      if (isFullscreen) {
        await exitFullscreen();
      } else {
        await enterFullscreen(element);
      }
    },
    [isFullscreen, enterFullscreen, exitFullscreen]
  );

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    isEnabled,
  };
}
