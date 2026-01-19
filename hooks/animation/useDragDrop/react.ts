import { useState, DragEvent } from 'react';

export function useDragDrop() {
  const [isDragging, setIsDragging] = useState(false);
  
  const onDragStart = (e: DragEvent, data: any) => {
    setIsDragging(true);
    e.dataTransfer.setData('application/json', JSON.stringify(data));
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (e: DragEvent, callback: (data: any) => void) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
    if (data) {
      callback(JSON.parse(data));
    }
  };

  return { isDragging, onDragStart, onDragEnd, onDragOver, onDrop };
}
