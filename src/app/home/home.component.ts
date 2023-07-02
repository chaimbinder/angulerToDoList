import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { PopupService } from '../shared/popup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public GETtask: {
    taskid: number;
    name_task: string;
    description: string;
    priority_level: number;
    active: boolean;
  }[] = [];

  constructor(
    private service: TaskService,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  private fetchTasks(): void {
    this.service.getTask().subscribe((tasks) => {
      this.GETtask = tasks;
    });
  }

  onRowDoubleClick(item: any) {
    this.popupService.setIsPopup(true);
    this.popupService.setSelectedTask(item)
  }
}
