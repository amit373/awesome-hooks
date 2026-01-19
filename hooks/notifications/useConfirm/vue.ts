import { ref } from 'vue';

export function useConfirm() {
  const isOpen = ref(false);
  const message = ref('');
  let resolvePromise: ((value: boolean) => void) | null = null;

  const confirm = (msg: string) => {
    message.value = msg;
    isOpen.value = true;
    return new Promise<boolean>((resolve) => {
      resolvePromise = resolve;
    });
  };

  const handleConfirm = () => {
    if (resolvePromise) resolvePromise(true);
    isOpen.value = false;
    resolvePromise = null;
  };

  const handleCancel = () => {
    if (resolvePromise) resolvePromise(false);
    isOpen.value = false;
    resolvePromise = null;
  };

  return { isOpen, message, confirm, handleConfirm, handleCancel };
}
