import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DragDropService {
  onDragStart(e: DragEvent, data: any) {
    if (e.dataTransfer) {
      e.dataTransfer.setData('application/json', JSON.stringify(data));
      e.dataTransfer.effectAllowed = 'move';
    }
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
  }

  onDrop(e: DragEvent): any {
    e.preventDefault();
    if (e.dataTransfer) {
      const data = e.dataTransfer.getData('application/json');
      return data ? JSON.parse(data) : null;
    }
    return null;
  }
}
