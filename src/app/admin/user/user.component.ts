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
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  backenedUrl = environment.BACKEND_URL;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  instruction:string='Do you want delete record?'
  confirmation:any;
  extraParam={"extraParam":4};
  users:any;
   displayedColumn:any=[

     { 
      title: 'ID',
      data: 'id',
      name: 'id',
    },
     
     {
      title: 'Email',
       data: 'email' ,
       name: 'email',
      },
      {
        title: 'Department',
         data: 'deparments' ,
         name: 'deparments',
        },
    
     { 
      title: 'Action',
      data:"Action",searchable:false,orderable: false,
      class:"action"
    }
     
    ];


  constructor(
    private http: HttpClient,
    private router:Router,
    public dialog: MatDialog,
    ) {}
  
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
            this.backenedUrl+"authentication/getAllUser",
            Object.assign(dataTablesParameters,this.extraParam), { }
             ).subscribe((resp:any) => {
              if(resp!=null && resp.response!=null && resp.response.data && resp.status==HttpStatus.SUCCESS  ){
                that.users = resp.response?.data;
                //Once API fetched data successfully inform datatable by invoking the callback
                 callback({
                   recordsTotal: resp.response.recordsTotal,
                   recordsFiltered: resp.response.recordsFiltered,
                   data: []
                 });
              }else{
                that.users = null;
              }
          });
      },
      columns: this.displayedColumn,
    };
  }

  
 
  

  action(action:string,id:any){
    if(action=="edit"){
     this.router.navigate(["resumeBuilder/edit-user"],{ queryParams: { param: id },skipLocationChange:true})
    }else if(action=="view"){
      this.router.navigate(["resumeBuilder/view-user"],{queryParams:{param:id},skipLocationChange:true})
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
