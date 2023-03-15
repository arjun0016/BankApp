import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private ds:DataService,private fb:FormBuilder,private router:Router,private http:HttpClient){
    if(localStorage.getItem('currentUser')){
    this.user=JSON.parse(localStorage.getItem('currentUser')||'')
    this.bal=JSON.parse(localStorage.getItem('currentbalance')||'')
    // this.balance=JSON.parse(localStorage.getItem('balance')||'')
    console.log(localStorage);
  }
    
    this.sdate= Date();
  }
  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert('please login first')
      this.router.navigateByUrl('')
    }
  }  
  bal:any;
  acno:any;
  pswd:any;
  amount:any
  acno1:any;
  pswd1:any;
  amount1:any;
  user:any;
  sdate:any;
  depositForm=this.fb.group({
    amount:['',[Validators.required,Validators.pattern("[0-9]*")]],
    acno:['',[Validators.required,Validators.pattern("[0-9]*")]],
    pswd:['',[Validators.required,Validators.pattern("[a-zA-Z0-9]*")]]
  })
  

  deposit(){
    var acno=this.depositForm.value.acno;
    var pswd=this.depositForm.value.pswd;
    var amount=this.depositForm.value.amount;
    if(this.depositForm.valid){
     return this.ds.deposit(acno,pswd,amount).subscribe(
        (result:any)=>{
          alert(result.message);
        window.location.reload()

        },
        (result:any)=>{
          alert(result.error.message);
        },
      )
  }
  }
  withdrawForm=this.fb.group({
    amount1:['',[Validators.required,Validators.pattern("[0-9]*")]],
    acno1:['',[Validators.required,Validators.pattern("[0-9]*")]],
    pswd1:['',[Validators.required,Validators.pattern("[a-zA-Z0-9]*")]]
  })
  withdraw(){
    var acno=this.withdrawForm.value.acno1;
    var pswd=this.withdrawForm.value.pswd1;
    var amount=this.withdrawForm.value.amount1;

    if(this.withdrawForm.valid){
    return this.ds.withdraw(acno,pswd,amount).subscribe(
      (result:any)=>{
        alert(result.message);
        window.location.reload()
      },
      (result:any)=>{
        alert(result.error.message);
      },
    )
    
  }
}

logout(){
  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentAcno')
  alert('logout')
  this.router.navigateByUrl('')
}
delete(){
  this.acno=JSON.parse(localStorage.getItem('currentAcno')||'')
  // alert('deleted')
}
onCancel(){
  this.acno=""
}
onDelete(event:any){
  // alert(event)
  this.ds.deleteAcc(event).subscribe(
    (result:any)=>{
      alert(result.message)
      this.router.navigateByUrl('')
    },
    result=>{
      alert(result.error.message)
    }
  )
}
}
