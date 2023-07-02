import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PopupService {
  private isPopupSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isPopup$ = this.isPopupSubject.asObservable();
  public editingMode: boolean = false;

  private selectedTaskSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public selectedTask$ = this.selectedTaskSubject.asObservable();

  constructor() { }
  setIsPopup(value: boolean) {
    this.isPopupSubject.next(value);
  }
  setSelectedTask(task: any) {
    this.selectedTaskSubject.next(task);
  }
  public isEditing(): boolean {
    return this.editingMode;
  }

  public setEditingMode(isEditing: boolean): void {
    this.editingMode = isEditing;
  }
}
