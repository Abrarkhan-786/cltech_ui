import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DepartmentComponent } from './department/department.component';
import { Department, User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  backenedUrl = environment.BACKEND_URL;
  constructor(private http:HttpClient) { }

  public updateUserDepartment(user:User):Observable<any> {
    const url = this.backenedUrl + 'authentication/updateUserDepartment';
    return this.http.post(url,user)
  }

  public getAllDepartments():Observable<any> {
    const url = this.backenedUrl + 'department/getAllDepartments';
    return this.http.get(url)
  }

   public getUserById(id:number):Observable<any> {
    const url = this.backenedUrl + 'authentication/findUseById/'+id;
    return this.http.get(url)
  }

  public saveDepartment(department:Department):Observable<any> {
    const url = this.backenedUrl + 'department/saveDepartment';
    return this.http.post(url,department)
  }

  public updateDepartment(department:Department):Observable<any> {
    const url = this.backenedUrl + 'department/updateDepartment';
    return this.http.post(url,department)
  }

   public getDepartmentById(id:number):Observable<any> {
    const url = this.backenedUrl + 'department/getDepartmentById/'+id;
    return this.http.get(url)
  }
  


}
