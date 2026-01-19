import { useState, useCallback } from 'react';

export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [resolveRef, setResolveRef] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback((msg: string) => {
    setMessage(msg);
    setIsOpen(true);
    return new Promise<boolean>((resolve) => {
      setResolveRef(() => resolve);
    });
  }, []);

  const handleConfirm = useCallback(() => {
    if (resolveRef) resolveRef(true);
    setIsOpen(false);
    setResolveRef(null);
  }, [resolveRef]);

  const handleCancel = useCallback(() => {
    if (resolveRef) resolveRef(false);
    setIsOpen(false);
    setResolveRef(null);
  }, [resolveRef]);

  return { isOpen, message, confirm, handleConfirm, handleCancel };
}
