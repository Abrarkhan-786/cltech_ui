import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../admin/user';
import { AuthticationService } from '../authentication/authentication.service';
import { UserModel } from '../authentication/userModel';
import { CustomValidators } from '../common/customValidators/validator';
import { LocalStorageService } from '../common/utility/localStorage.service';
import { SnackbarService } from '../common/utility/snackbar.service';
import { HttpStatus } from '../constant/enum';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
backUrl='/resumeBuilder';
USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
isLoggedin:boolean=false;
roles:any;
  constructor(
    private router: Router,
    private service:AuthticationService,
    private snackbarService:SnackbarService,
    private localStorageService:LocalStorageService
  ) { 


  }

  ngOnInit(): void {
  this.getRole();
  }

  registrationForm= new FormGroup({
   // name:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)]),
    confirmPassword:new FormControl('',[Validators.required,]),
    role:new FormControl('',[Validators.required])

  },
    CustomValidators.passwordMatch('password', 'confirmPassword') 
  )


  get password() {
    return this.registrationForm.controls.password;
  }

  get confirmPassword() {
    return this.registrationForm.controls.confirmPassword;
  }

  validatePassword(event:any){
    if(event.target.value!==this.password.value){
      this.confirmPassword.setErrors({ passwordMismatch: true });
    }else{
      this.confirmPassword.setErrors(null);
    }


  }
  

  goToLoginPage(){
    this.router.navigate(['/login']);
  }

  registration(){
    if(!this.registrationForm.valid){
           return;
    }

    let model =new User();
    model.email=this.registrationForm.value.email;
    model.password=this.registrationForm.value.password;
    model.confirmPassword=this.registrationForm.value.confirmPassword;
    model.roleId=Number(this.registrationForm.value.role);
    console.log(model)

    this.service.registration(model).subscribe((data)=>{
      if(data!=null && data.response!=null && data?.response?.returnUrl && data.status===HttpStatus.SUCCESS){
        this.localStorageService.setLocalStorage('USER_NAME_SESSION_ATTRIBUTE_NAME',data.response.email)
        this.snackbarService.openSucessSnackBar(data.message,data?.response?.returnUrl)
        this.router.navigateByUrl(data?.response?.returnUrl);
        
      }else{
        this.snackbarService.openErrorSnackBar(data.message)
      }
    })

  }
  // isUserLogedin(){
  //   // this.isLoggedin=this.service.isUserLoggedIn();
  //    if(this.localStorageService.getLocalStorage("USER_NAME_SESSION_ATTRIBUTE_NAME")!==undefined ){
  //         this.router.navigate(['/resumeBuilder'])
  //     }else{
  //      return;
  //     }
  // }

  getRole(){
    this.service.getRole().subscribe((data)=>{
      if(data!=null && data.response!=null && data.status===HttpStatus.SUCCESS){
        this.roles=data.response;
      }else{
        this.snackbarService.openErrorSnackBar(data.message)
      }
    })
  }
}
