import { ref, onMounted, onUnmounted } from 'vue';

export function useWebSocket(url: string) {
  const message = ref<string | null>(null);
  const isConnected = ref(false);
  let socket: WebSocket;

  onMounted(() => {
    socket = new WebSocket(url);
    socket.onopen = () => isConnected.value = true;
    socket.onclose = () => isConnected.value = false;
    socket.onmessage = (e) => message.value = e.data;
  });

  onUnmounted(() => {
    if (socket) socket.close();
  });

  const send = (msg: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(msg);
    }
  };

  return { message, isConnected, send };
}
