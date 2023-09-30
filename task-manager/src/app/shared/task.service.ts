import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) { }

  getTasks():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }

  createTask(task:any){
    this.http.post<any>(this.apiUrl, task);
  }

  getTaskById(id: number):Observable<any>{
    const apiUrlById = `${this.apiUrl}/${id}`
    return this.http.get<any>(apiUrlById)
  }

}
