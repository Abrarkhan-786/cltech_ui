import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeResume } from './employee-resume';

@Injectable({
  providedIn: 'root'
})
export class EmployeeResumeService {
  backenedUrl = environment.BACKEND_URL;
  constructor(private http:HttpClient) { }

  public saveEmployeeResume(employeeResume:EmployeeResume):Observable<any> {
    const url = this.backenedUrl + 'employee/saveEmployeeResume';
    return this.http.post(url,employeeResume)
  }

  

}
