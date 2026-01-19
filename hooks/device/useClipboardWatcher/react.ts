import { useState, useEffect } from 'react';

export function useClipboardWatcher() {
  const [clipboardContent, setClipboardContent] = useState<string>('');

  useEffect(() => {
    const checkClipboard = async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text !== clipboardContent) {
          setClipboardContent(text);
        }
      } catch (err) {
        // Permission denied or not focused
      }
    };

    const interval = setInterval(checkClipboard, 1000);
    const handleFocus = () => checkClipboard();

    window.addEventListener('focus', handleFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [clipboardContent]);

  return clipboardContent;
}
