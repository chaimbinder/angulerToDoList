import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private baseURL = "http://localhost:3100";
  public task: { taskid: number; name_task: string ;  description : string ; priority_level :number ; active :boolean }[] = [];
  
  constructor(private http: HttpClient) {}

  public getTask(): Observable<{ taskid: number; name_task: string ;  description : string ; priority_level :number ; active :boolean }[]> {
    return this.http.get<{ taskid: number; name_task: string ;  description : string ; priority_level :number ; active :boolean }[]>(`${this.baseURL}/task`)
      .pipe(
        tap(data => {
          this.task = data; 
        })
      );
  }

  public inputAddTask(task: {name_task: string; description: string; priority_level: number; active: boolean;}): Observable<{ name_task: string; description: string; priority_level: number; active: boolean }[]> {
    return this.http.post< { name_task: string; description: string; priority_level: number; active: boolean }[] >(`${this.baseURL}/task`, task);
  }
  public aditTask(task: {taskid: number; name_task: string; description: string; priority_level: number; active: boolean;}): Observable<{ name_task: string; description: string; priority_level: number; active: boolean }[]> {
    return this.http.patch< {taskid: number; name_task: string; description: string; priority_level: number; active: boolean }[] >(`${this.baseURL}/task`, task);
  }
}
