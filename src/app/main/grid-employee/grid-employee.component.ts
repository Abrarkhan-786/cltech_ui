import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables/src/angular-datatables.directive';
import { environment } from 'src/environments/environment';
import { HttpStatus } from 'src/app/constant/enum';
import { ResumeModalComponent } from 'src/app/pop-up/resume-modal/resume-modal.component';
@Component({
  selector: 'app-grid-employee',
  templateUrl: './grid-employee.component.html',
  styleUrls: ['./grid-employee.component.css']
})
export class GridEmployeeComponent implements OnInit ,OnDestroy{
  backenedUrl = environment.BACKEND_URL;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  instruction:string='Do you want delete record?'
  confirmation:any;
  extraParam={"extraParam":4};
  employees:any;
   displayedColumn:any=[

     { 
      title: 'ID',
      data: 'id',
      name: 'id',
    },
     {
      title: 'Name', 
      data: 'name',
      name: 'name',
     }, 
     {
      title: 'Email',
       data: 'email' ,
       name: 'email',
      },
      {
        title: 'Phone',
         data: 'phone' ,
         name: 'phone',
        },

      {
        title: 'Skill',
         data: 'totalSkill',
         name: 'totalSkill'
         },
     {
      title: 'Total Experience',
       data: 'totalExperience' ,
       name: 'totalExperience'
      },
     { 
      title: 'Action',
      data:"Action",searchable:false,orderable: false,
      class:"action"
    }
     
    ];

//   displayedColumn:any=[{
//     title: 'ID',
//     data: 'id',
//     name: 'id',
//   }, {
//     title: 'First name',
//     data: 'firstName',
//     name:"firstName"
//   }, {
//     title: 'Last name',
//     data: 'lastName',
//     name:"lastName"
//   },
//   {
//     title: 'Action',searchable:false,orderable: false,
//  },

//];
  constructor(
    private http: HttpClient,
    private router:Router,
    public dialog: MatDialog,
    ) {}
  
  dtTrigger: Subject<any> = new Subject<any>();
  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searchDelay:1500,
      //responsive: true,
       autoWidth: false,
      jQueryUI: true,
      displayStart:0,
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
       //scrollY:"350px",
      // scrollX:true,
      order: [[0, 'desc']],
      language: {
        searchPlaceholder: "Search Here"
          },
       ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<any>(
           //'https://angular-datatables-demo-server.herokuapp.com/',
            this.backenedUrl+"employee/getAllEmployees",
            Object.assign(dataTablesParameters,this.extraParam), { headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'token'
             })}
             ).subscribe((resp:any) => {
              if(resp!=null && resp.response!=null && resp.response.data && resp.status==HttpStatus.SUCCESS  ){
                that.employees = resp.response?.data;
                //Once API fetched data successfully inform datatable by invoking the callback
                 callback({
                   recordsTotal: resp.response.recordsTotal,
                   recordsFiltered: resp.response.recordsFiltered,
                   data: []
                 });
              }else{
                that.employees = null;
              }
          });
      },
      columns: this.displayedColumn,
    };
  }

  
 
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  // users(): void {
  //   this.http.post( 'https://angular-datatables-demo-server.herokuapp.com/',
  //             dataTablesParameters, {})
  //       .subscribe((response: any) => {
  //         this.persons = response;
  //         // initiate our data table
  //         this.dtTrigger.next();
  //       });
  // }

  action(action:string,id:any){
    if(action=="edit"){
     this.router.navigate(["resumeBuilder/edit-employee"],{ queryParams: { param: id },skipLocationChange:true})
    }else if(action=="view"){
      this.router.navigate(["resumeBuilder/view-employee"],{queryParams:{param:id},skipLocationChange:true})
    }else if(action=="preview"){
      this.openResumeDialogBox(id);
    }
  }

  openResumeDialogBox(id:number){
    const dialogRef = this.dialog.open(ResumeModalComponent, {
      disableClose: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'300ms',
      data: {instruction:this.instruction},
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      
    });
  }
}   
