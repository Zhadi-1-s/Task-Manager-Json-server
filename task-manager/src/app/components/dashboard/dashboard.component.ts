import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { TaskService } from 'src/app/shared/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit{

  user: any;

  toDo: any[] = [];
  inProccess: any[] = [];
  completed: any[] = []

  tasks:any[] = [];

  constructor(public authService: AuthService, private router: Router, private taskService: TaskService){}

  ngOnInit(): void {
      this.initUser();
      this.taskService.getTasks().subscribe(
        data => {
          this.tasks = data;
          this.filterTasks()
        },
        error => {
          console.error(error.message)
        }
      )
  }
  async initUser(){
    this.authService.SignIn = this.user;
  }

  filterTasks(){
    this.toDo = this.tasks.filter(task => task.status === 'toDo');
    console.log('the todo list is pushed')
    this.inProccess = this.tasks.filter(task => task.status === 'inPorccess');
    this.completed = this.tasks.filter(task => task.status === 'completed')
  }

  navigateToAdd(){
    this.router.navigate(['add-task']);
  }

}
