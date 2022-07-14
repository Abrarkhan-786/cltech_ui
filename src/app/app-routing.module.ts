import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RefreshComponent } from './common/refresh/refresh.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { EmployeeResumeComponent } from './main/employee-resume/employee-resume.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  { path: 'login', component:LoginComponent },
  { path: '', redirectTo:"login" ,pathMatch:'full'},
  { path: 'refresh', component:RefreshComponent },
  { path: 'registration', component:RegistrationComponent },
 
  {
  path      : 'resumeBuilder',
  canActivate:[AuthGuard],
  loadChildren: () => import('./main/employee-resume.module').then(m => m.EmployeeResumeModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
