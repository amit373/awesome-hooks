import { ref, onMounted, onUnmounted } from 'vue';

export function useNetworkSpeed() {
  const downlink = ref<number | null>(null);
  const effectiveType = ref<string | null>(null);

  onMounted(() => {
    // @ts-ignore
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!conn) return;

    const updateConnection = () => {
      downlink.value = conn.downlink;
      effectiveType.value = conn.effectiveType;
    };

    updateConnection();
    conn.addEventListener('change', updateConnection);
  });

  return { downlink, effectiveType };
}
