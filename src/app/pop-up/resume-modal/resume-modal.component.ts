import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
declare var require: any;
const htmlToPdfmake = require("html-to-pdfmake");
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import html2canvas from 'html2canvas';
import { EmployeeResumeService } from 'src/app/main/shared/employee-resume.service';
import { HttpStatus } from 'src/app/constant/enum';
import { EmployeeResume } from 'src/app/main/shared/employee-resume';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
declare var html2pdf: any;

@Component({
  selector: 'app-resume-modal',
  templateUrl: './resume-modal.component.html',
  styleUrls: ['./resume-modal.component.css']
})
export class ResumeModalComponent implements OnInit {
  @ViewChild('resumePdf',{static:false})
  resumePdf!: ElementRef;
  employee !:any;
  hideEmployeeDetail:boolean=false;
  constructor(
    private dialogRef: MatDialogRef<ResumeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public  data: any,
    private employeeService :EmployeeResumeService,
    private snackbar:SnackbarService,
    ) { }

  ngOnInit(): void {
    this.getDetail();
  }

  getDate(){
    return new Date()
  }
  getDetail(){
      this.employeeService.getEmployeeById(this.data?.id).subscribe((data)=>{
        if(data!=null && data!=undefined && data.response!=null && data.status==HttpStatus.SUCCESS){
           this.employee=data.response;
         
        }else{
          this.snackbar.openErrorSnackBar(data.message);
        }
      
    })
   }


  confirm(){
    const result={
      'isConfirm':true
    }
    this.dialogRef.close(result)
  }
close() {
    this.dialogRef.close();
}

download(){
  const doc = new jsPDF();
  const resumePdf = this.resumePdf.nativeElement;
  console.log(resumePdf)
   var html= htmlToPdfmake(resumePdf.innerHTML);
   const documentDefinition:any = {
     content: html ,
      //pageSize:'A5',
      //pageOrientation: 'potrait',
    };
    pdfMake.createPdf(documentDefinition).download("abrarreusme"); 
}

print(){
  console.log("printing/..")
  const doc = new jsPDF();
  const resumePdf = this.resumePdf.nativeElement;
  console.log(resumePdf)
   var html= htmlToPdfmake(resumePdf.innerHTML);
   const documentDefinition:any = {
     content: html ,
      //pageSize:'A5',
      //pageOrientation: 'potrait',
    };
    pdfMake.createPdf(documentDefinition).print(); 
}

downloadAsPdf(){
  const doc = new jsPDF("portrait","mm","A5");
  const resumePdf = $("#resumePdf").html;
  var opt = {
    margin:       1,
    filename:     'output.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  // New Promise-based usage:
   html2pdf().from(resumePdf).set(opt).save(); 
}

hideContactDetail(hideDetail:boolean){
  if(hideDetail){
    this.hideEmployeeDetail=hideDetail;
  }else{
    this.hideEmployeeDetail=hideDetail;
  }
}

}




