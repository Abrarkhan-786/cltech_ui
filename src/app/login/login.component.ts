import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthticationService } from '../authentication/authentication.service';
import { UserModel } from '../authentication/userModel';
import { LocalStorageService } from '../common/utility/localStorage.service';
import { SnackbarService } from '../common/utility/snackbar.service';
import { HttpStatus } from '../constant/enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  backUrl='/resumeBuilder';
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  isLoggedin:boolean=false;
  constructor(
    private router:Router,
    private service:AuthticationService,
    private snackbarService:SnackbarService,
    private localStorageService:LocalStorageService
    ) { }
    
    loginForm= new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,]),
    })
  ngOnInit(): void {
   this.isUserLogedin();
   
  }
   
  signIn(){
    if(!this.loginForm.valid){
      return;
}

let model =new UserModel();
model.email=this.loginForm.value.email;
model.username=this.loginForm.value.email;
model.password=this.loginForm.value.password;

this.service.login(model).subscribe((data)=>{
 if(data!=null && data.response!=null && data.status===HttpStatus.SUCCESS){
   this.localStorageService.setLocalStorage('USER_NAME_SESSION_ATTRIBUTE_NAME',data.response.email)
   this.snackbarService.openSucessSnackBar(data.message,this.backUrl)
   location.reload();
 }else{
   this.snackbarService.openErrorSnackBar(data.message)
 }
})
  }
  goToRegistrationPage(){
    this.router.navigate(['/registration'])
  }

  isUserLogedin(){
   // this.isLoggedin=this.service.isUserLoggedIn();
    if(this.localStorageService.getLocalStorage("USER_NAME_SESSION_ATTRIBUTE_NAME")!==undefined ){
         this.router.navigate(['/resumeBuilder'])
     }else{
      return;
     }
 }

  
}
