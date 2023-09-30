import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/shared/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent  implements OnInit{

  task:any

  constructor(private taskService : TaskService, private route: ActivatedRoute){}

  ngOnInit(): void {
      this.route.paramMap.subscribe((params :any) => {
        const taskId = +params.get('id');
        this.taskService.getTaskById(taskId).subscribe(
          data => {
            this.task = data
          }
        )
      })
  }

  setText(text: string){
      console.log(text)
  }

}
