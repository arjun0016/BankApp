import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //class is a collection of properties and methods
  acno:any;
  pswd:any;

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder){}//!st executed
  //object initialization
  //automatically invokes when an object is created.


  ngOnInit(): void {//2nd executed
    //initial process of a component
    //when a component is created, at same time it initialize or authorize
    //when a component is created,there is a life cycle for it.

  }
  loginForm=this.fb.group({
  acno:['',[Validators.required,Validators.pattern("[0-9]*")]],
  pswd:['',[Validators.required,Validators.pattern("[a-zA-Z0-9]*")]]
  })
  //properties
aim="Your Perfect Banking Partner"

account="please enter your acno"


//   userDetails:any={
//     1000:{acno:1000,username:"arjun",password:1000,balance:2000},
//     1001:{acno:1001,username:"neeraj",password:1001,balance:2000},
//     1002:{acno:1002,username:"sanjay",password:1002,balance:2000}
//  }
  //userdefined function// 4th executed

  // login(a:any,p:any){
  //   var acno=a.value;
  //   var pswd=p.value;
  //   var uesrDetails=this.uesrDetails;

  //   if(acno in uesrDetails){
  //     if(pswd==uesrDetails[acno].password){
  //       alert("login success")
  //     }
  //     else{
  //       alert("incorrect password")
  //     }
  //   }
  //   else{
  //   alert("user not found")
  // }
  // }
  // acnoChange(event:any){
  //   // console.log(event.target.value);
  //   this.acno=event.target.value;
  //   console.log(this.acno);
    
  // }
  // pswdChange(event:any){
  //   // console.log(event.target.value);
  //   this.pswd=event.target.value;
  //   console.log(this.pswd);
  // }

  login(){
    var acno=this.loginForm.value.acno;
    var pswd=this.loginForm.value.pswd;
    // var userDetails=this.ds.userDetails;

    if(this.loginForm.valid){
    this.ds.login(acno,pswd).subscribe(
      (result:any)=>{
    localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
    localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
    localStorage.setItem('currentbalance',JSON.stringify(result.balance))
    localStorage.setItem('Token',JSON.stringify(result.token))
      alert(result.message)
      this.router.navigateByUrl('dashboard')
      },
      result=>{
              alert(result.error.message);
      }
    
    )
    }
    else{
      alert("Login failure");
    }
  }

  
}

