import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { RequestMethod } from 'src/app/constant/enum';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})

export class EmployeeTableComponent implements OnInit {
  @ViewChild('jqxGrid', { static: true }) myGrid!: jqxGridComponent;
 //@ViewChild('jqxGrid') myGrid!: jqxGridComponent;
  url = "http://localhost:8280/springbootMysqlCrud/employee/getAllEmployeeList";
  width: string = '100%';
  totalrecords!: number;
  EmployeeTableComponent() { }
  ngOnInit(): void {
    
  }
  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }

    return 850;
  }
  columns: any[] =
  [
      { text: 'Id', datafield: 'id',  filterable: true, sortable: true, width: "10%" },
     // { text: 'First Name', datafield: 'firstName',  filterable: true, sortable: true, width: "15%" },
      //{ text: 'Last Name', datafield: 'lastName', filterable: true, sortable: true,  width: "15%"  },
      { text: 'Name', datafield: 'name',  filterable: true, sortable: true, width: "15%" },
      { text: 'Email', datafield: 'email',  filterable: true, sortable: true,  width: "25%"  },
      { text: 'Salary', datafield: 'salary',  filterable: true, sortable: true, width: "20%"  },
      { text: 'Department', datafield: 'department',  filterable: true, sortable: true,  width: "20%"  },
      { text: 'Senior', datafield: 'senior',  filterable: true, sortable: true, width: "10%"  }
  ]
  source: any = {
    url: this.url,
    type: RequestMethod.POST,
    datatype: "json",
    contenttype: "application/json; charset=UTF-8",
    sortcolumn: 'id',
    datafields: [
      { name: 'id', map: 'id', type: 'number' },
      //{ name: 'firstName', map: 'fiestName', type: 'string' },
     // { name: 'lastName', map: 'lastName', type: 'string' },
     { name: 'name', map: 'name', type: 'string' },
     { name: 'department', map: 'department', type: 'string' },
      { name: 'email', map: 'email', type: 'string' },
      { name: 'salary', map: 'salary', type: 'string' },
      { name: 'senior', map: 'senior', type: 'string' }
    ],
    formatdata: function (data: any) {
      data["recordstartindex"] = data.pagenum * data.pagesize;
      data["totalRecords"] = 0;
      // data["extraParam"] = (this.extraParam!=undefined && this.extraParam!=null) ? this.extraParam : ((data.extraParam!=undefined && data.extraParam!=null) ? data.extraParam : extraParamTemp);
      return JSON.stringify(data);
    },
    root: 'Rows',
    cache: false,
    sort:()=>{
      this.myGrid.updatebounddata('sort');
    },
  
    // filterHandler(event: any): void {
    //   this.totalrecords = 0;
    //   this.source.totalrecords = 0;
    //   alert("filtering")
    //   this.myGrid.updatebounddata('filter');
    //   //$(“#jqxgrid”).jqxGrid(‘updatebounddata’, ‘sort’);
  
    //   //TODO: filter focus
    // },
    filter: () => {
      // update the grid and send a request to the server.
         this.totalrecords = 0;
         this.source.totalrecords = 0;
      this.myGrid.updatebounddata('filter');
    },
    beforeSend: function (jqxhr: any, settings: any) {
      //jqxhr.setRequestHeader("Content-Type","application/json");
      //jqxhr.setRequestHeader("Accept","*/*");
  },
    error: function (json: any, textStatus: any, errorThrown: any) {
     console.log(errorThrown)
    },
    beforeprocessing: (data: any) => {
      if (data.status == 'SUCCESS') {
     this.source.totalrecords = data.response.totalRecords;
       this.totalrecords = data.response.totalRecords;
        //utility.hideLodder ();
       return data.response.rows;
       //return data.response;
      } else {
        //utility.hideLodder();
        return [];
      }
    },
    downloadComplete: function (data: any, status: any, xhr: any) { 
      //console.log(xhr); 
   }
  };
  
  

  dataAdapter: any = new jqx.dataAdapter(this.source);

 

  rendergridrows = (params: any): any => {
    return params.data;
  }


}

