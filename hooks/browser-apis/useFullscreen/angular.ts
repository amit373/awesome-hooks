import { computed, Injectable, OnDestroy, signal } from '@angular/core';

interface UseFullscreenReturn {
  isFullscreen: boolean;
  enterFullscreen: (element?: HTMLElement) => Promise<void>;
  exitFullscreen: () => Promise<void>;
  toggleFullscreen: (element?: HTMLElement) => Promise<void>;
  isEnabled: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FullscreenService implements OnDestroy {
  private isFullscreenSignal = signal(false);
  private isEnabledSignal = signal(true);

  isFullscreen = computed(() => this.isFullscreenSignal());
  isEnabled = computed(() => this.isEnabledSignal());

  private updateFullscreenState = () => {
    this.isFullscreenSignal.set(!!document.fullscreenElement);
  };

  constructor() {
    if (typeof document !== 'undefined') {
      // Check if fullscreen API is supported
      if (
        !(document as any).fullscreenEnabled &&
        !(document as any).webkitFullscreenEnabled
      ) {
        this.isEnabledSignal.set(false);
        return;
      }

      // Listen for fullscreen change events
      const eventName =
        'onfullscreenchange' in document
          ? 'fullscreenchange'
          : 'webkitfullscreenchange';
      document.addEventListener(eventName, this.updateFullscreenState);

      // Initial state check
      this.updateFullscreenState();
    }
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      const eventName =
        'onfullscreenchange' in document
          ? 'fullscreenchange'
          : 'webkitfullscreenchange';
      document.removeEventListener(eventName, this.updateFullscreenState);
    }
  }

  async enterFullscreen(element?: HTMLElement) {
    if (!this.isEnabled()) return;

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
  }

  async exitFullscreen() {
    if (!this.isEnabled()) return;

    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      }
    } catch (error) {
      console.error('Error exiting fullscreen:', error);
    }
  }

  async toggleFullscreen(element?: HTMLElement) {
    if (this.isFullscreen()) {
      await this.exitFullscreen();
    } else {
      await this.enterFullscreen(element);
    }
  }
}

// Standalone hook function for use outside of DI
export function useFullscreen() {
  const service = new FullscreenService();

  return {
    isFullscreen: service.isFullscreen,
    enterFullscreen: (element?: HTMLElement) =>
      service.enterFullscreen(element),
    exitFullscreen: () => service.exitFullscreen(),
    toggleFullscreen: (element?: HTMLElement) =>
      service.toggleFullscreen(element),
    isEnabled: service.isEnabled,
  };
}
