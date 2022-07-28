import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../admin/user';
import { LocalStorageService } from '../common/utility/localStorage.service';
import { EmployeeResume } from '../main/shared/employee-resume';
import { UserModel } from './userModel';

@Injectable({
  providedIn: 'root'
})
export class AuthticationService {
  backenedUrl = environment.BACKEND_URL;
  user:any=null;
  constructor(
    private http:HttpClient,
    private localStorageService:LocalStorageService,
    private router : Router
    
    ) { }
   
    headers={
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      }
    

  public registration(model:User):Observable<any> {
    const headers = new HttpHeaders(model ? {
      authorization : 'Basic ' + btoa(model.email + ':' + model.password)
      } : {});
    const url = this.backenedUrl + 'authentication/registration';
    return this.http.post(url,model);
  }

  public login(model:UserModel):Observable<any> {
    const headers = new HttpHeaders(model ? {
      authorization : 'Basic ' + btoa(model.username + ':' + model.password)
      } : {});
     const url = this.backenedUrl + 'authentication/login';
    return this.http.post(url,model)
  }

  logout() {
    this.localStorageService.removeLocalStorage("USER_NAME_SESSION_ATTRIBUTE_NAME");
    this.router.navigate(['/login']); 
  }

  isUserLoggedIn() :boolean{
    this.user = this.localStorageService.getLocalStorage("USER_NAME_SESSION_ATTRIBUTE_NAME");
    if (this.user === undefined || this.user===null ) return false
    return true
  }

  getLoggedInUserName() {
    let user = this.localStorageService.getLocalStorage("USER_NAME_SESSION_ATTRIBUTE_NAME");
    if (user===null) return ''
    return user
  }

  public getRole():Observable<any> {
     const url = this.backenedUrl + 'authentication/getRole';
    return this.http.post(url,{})
  }
}
