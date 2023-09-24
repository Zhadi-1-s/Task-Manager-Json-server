import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {



  status: 'completed' | 'inProccess' | 'toDo' = 'toDo';

  constructor(private taskService: TaskService){}

  ngOnInit(): void {
      
  }

  createTask(title: string, description: string){
    const newTask = {
      title,
      description,
      status: this.status
    };
    this.taskService.createTask(newTask)
  }


}
