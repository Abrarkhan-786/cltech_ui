import { Component, NgZone } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
   
export const MY_DATE_FORMATS = {
    parse: {
      dateInput: 'DD/MM/YYYY',
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
    },
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class AppComponent {
  title = 'cltech_ui';
  showHead: boolean = false;
  // constructor(private router: Router) {
  //   // on route change to '/login', set the variable showHead to false
  //     router.events.forEach((event) => {
  //       if (event instanceof NavigationStart) {
  //         if (event['url'] == '/login' || event['url'] == '/registration' ) {
  //           this.showHead = false;
  //         } else {
  //           this.showHead = true;
  //         }
  //       }
  //     });
  //   }

  constructor (private zone: NgZone, private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login'  || event.url === '/registration' ) {
          this.showHead= true;
        } else {
          this.showHead= false;
        }
      }
    });
  }
}
