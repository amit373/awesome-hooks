import { useState, useEffect, useRef } from 'react';

export function useWebSocket(url: string) {
  const [message, setMessage] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    ws.current = socket;

    socket.onopen = () => setIsConnected(true);
    socket.onclose = () => setIsConnected(false);
    socket.onmessage = (event) => setMessage(event.data);

    return () => {
      socket.close();
    };
  }, [url]);

  const send = (msg: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(msg);
    }
  };

  return { message, isConnected, send };
}
