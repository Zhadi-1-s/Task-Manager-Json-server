import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit{

  user: any;

  task:string = '';

  constructor(public authService: AuthService){}

  ngOnInit(): void {
      this.initUser();
  }
  initUser(){
    this.authService.SignIn = this.user;
  }
}
