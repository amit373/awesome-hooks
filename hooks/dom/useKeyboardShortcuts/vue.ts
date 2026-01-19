import { onMounted, onUnmounted } from 'vue';

export function useKeyboardShortcuts(shortcuts: { [key: string]: (event: KeyboardEvent) => void }) {
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
    } else if (shortcuts[event.key]) {
      shortcuts[event.key](event);
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });
}
