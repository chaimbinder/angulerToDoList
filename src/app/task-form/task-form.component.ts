import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { PopupService } from '../shared/popup.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  isPopup: boolean = false;
  selectedTask: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: TaskService,
    private popupService: PopupService
  ) {}

  public popupAddTask(): void {
    this.isPopup = !this.isPopup;
  }

  ngOnInit() {
    const isEditing = this.popupService.isEditing(); // Assuming you have a method in the PopupService to determine if it's editing mode
    
    if (isEditing) {
      this.taskForm = this.formBuilder.group({
        taskid: [''], // Task ID for editing
        name_task: ['', Validators.required],
        description: ['', Validators.required],
        priority_level: ['', Validators.required],
        active: [true]
      });
    } else {
      this.taskForm = this.formBuilder.group({
        name_task: ['', Validators.required],
        description: ['', Validators.required],
        priority_level: ['', Validators.required],
        active: [true]
      });
    }
    
    this.popupService.isPopup$.subscribe((isPopup) => {
      this.isPopup = isPopup;
    });
  
    this.popupService.selectedTask$.subscribe((task) => {
      this.selectedTask = task;
      console.log(task);
      this.taskForm.patchValue(task); 
    });
  }
  
  submitForm() {
    if (this.taskForm.valid) {
      if (this.popupService.isEditing()) {
        const task = this.taskForm.value;
        console.log("aditTask==========>", task);
        this.service.aditTask(task).subscribe(() => {});
      } else {
        const task = this.taskForm.value;
        console.log("inputAddTask==========>", task);
        this.service.inputAddTask(task).subscribe(() => {});
      }
      
      this.taskForm.reset();
      this.isPopup = false;
    }
  }
  

}
