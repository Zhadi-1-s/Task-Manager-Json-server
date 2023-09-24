import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {



  isCompleted: boolean = false;

  constructor(private taskService: TaskService){}

  ngOnInit(): void {
      
  }

  createTask(title: string, description: string){
    const newTask = {
      title,
      description,
      isCompleted: this.isCompleted
    };
    this.taskService.createTask(newTask).

  }


}
