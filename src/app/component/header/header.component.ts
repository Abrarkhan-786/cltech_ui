import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthticationService } from 'src/app/authentication/authentication.service';
import { RefreshPageService } from 'src/app/common/utility/refreshPage.service ';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy {

  isLoggedin:boolean=false;
  removeHeader:boolean=false;
  $sub!: Subscription;
  constructor(
    private service:AuthticationService,
    private refreshPage: RefreshPageService,
    ) { }
 
  ngOnInit(): void {
    this.$sub=this.service.recieveHeaderVisibilityStatus().subscribe((data)=>{
      this.removeHeader=data;
    })
    this.isUserLogedin();
  }
   isUserLogedin(){
    console.log(this.isLoggedin)
      this.isLoggedin=this.service.isUserLoggedIn();
   }

   handleLogout(){
    this.service.logout();
   // location.reload();
   }
   ngOnDestroy(): void {
    this.$sub.unsubscribe();
  }

}
