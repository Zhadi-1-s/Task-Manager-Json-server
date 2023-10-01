import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/shared/task.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {



  status: 'completed' | 'inProccess' | 'toDo' = 'toDo';

  constructor(private taskService: TaskService, private router: Router){}

  ngOnInit(): void {
      
  }

  createTask(title: string, description: string){
    const newTask = {
      id:uuidv4(),
      title,
      description,
      status: this.status
    };
    if(title && description){
      this.taskService.createTask(newTask).subscribe(
        () => {
          console.log('task created succesfully')
          this.router.navigate(['dashboard'])
        },
        error => {
          console.error(error.message)
        }
      )
    }
    else{
      window.alert('the title and description empty');
    }
  }

}
