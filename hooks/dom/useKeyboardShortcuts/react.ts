import { useEffect } from 'react';

export function useKeyboardShortcuts(
  shortcuts: { [key: string]: (event: KeyboardEvent) => void }
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = [
        event.ctrlKey ? 'Ctrl' : '',
        event.metaKey ? 'Cmd' : '',
        event.shiftKey ? 'Shift' : '',
        event.altKey ? 'Alt' : '',
        event.key.toUpperCase(),
      ]
        .filter(Boolean)
        .join('+');

      if (shortcuts[key]) {
        event.preventDefault();
        shortcuts[key](event);
      } else if (shortcuts[event.key]) { // Fallback for simple keys
         shortcuts[event.key](event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}
