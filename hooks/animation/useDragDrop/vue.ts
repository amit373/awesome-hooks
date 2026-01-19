import { ref } from 'vue';

export function useDragDrop() {
  const isDragging = ref(false);

  const onDragStart = (e: DragEvent, data: any) => {
    isDragging.value = true;
    if (e.dataTransfer) {
      e.dataTransfer.setData('application/json', JSON.stringify(data));
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  const onDragEnd = () => {
    isDragging.value = false;
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const onDrop = (e: DragEvent, callback: (data: any) => void) => {
    e.preventDefault();
    if (e.dataTransfer) {
      const data = e.dataTransfer.getData('application/json');
      if (data) {
        callback(JSON.parse(data));
      }
    }
  };

  return { isDragging, onDragStart, onDragEnd, onDragOver, onDrop };
}
