import { Component, OnInit } from '@angular/core';
import { AuthticationService } from 'src/app/authentication/authentication.service';
import { RefreshPageService } from 'src/app/common/utility/refreshPage.service ';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedin:boolean=false;
  constructor(
    private service:AuthticationService,
    private refreshPage: RefreshPageService,
    ) { }

  ngOnInit(): void {
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
}
