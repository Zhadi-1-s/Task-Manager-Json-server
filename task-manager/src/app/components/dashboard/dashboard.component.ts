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

  tasks:any;

  constructor(public authService: AuthService, private router: Router, private taskService: TaskService){}

  ngOnInit(): void {
      this.initUser();
      this.taskService.getTasks().subscribe(
        data => {
          this.tasks = data;
        },
        error => {
          console.error(error.message)
        }
      )
  }
  async initUser(){
    this.authService.SignIn = this.user;
  }

  navigateToAdd(){
    this.router.navigate(['add-task']);
  }

}
