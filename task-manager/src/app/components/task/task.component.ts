import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/shared/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent  implements OnInit{

  task:any

  constructor(private taskService : TaskService, private route: ActivatedRoute, public router: Router){}

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

  setUpdate(desc: string){
    this.task.description = desc;
    this.taskService.putTask(this.task).subscribe(
      () => {
        window.alert('Changes are detected')
        this.router.navigate(['dashboard'])
      },
      error => {
        window.Error(error)
      }
    )
  }
    deleteTask(id: number){
      this.taskService.deleteTask(id).subscribe(
        () =>{
          window.alert('task deleted succesfully')
        },
        error => {
          window.Error(error)
        }
      )
      this.router.navigate(['dashboard']);
    }
}
