import { Component,OnInit } from '@angular/core';
import { FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

// properties
uname:any;
acno:any;
pswd:any;
// userDetails={
//   1000:{acno:1000,username:"arjun",password:1000,balance:2000},
//   1001:{acno:1001,username:"neeraj",password:1001,balance:2000},
//   1002:{acno:1002,username:"sanjay",password:1002,balance:2000}
// }

  constructor(private ds:DataService,private router:Router,private fb:FormBuilder){  }


  ngOnInit(): void {
      
  }
  // model for register
  registerForm=this.fb.group({
    uname:['',[Validators.required,Validators.pattern("[a-zA-Z]*")]],
    acno:['',[Validators.required,Validators.pattern("[0-9]*")]],
    pswd:['',[Validators.required,Validators.pattern("[a-zA-Z0-9]*")]]
  })
  // controll passes through html page
  register(){
    var uname=this.registerForm.value.uname
    var acno=this.registerForm.value.acno
    var pswd=this.registerForm.value.pswd
    if(this.registerForm.valid){

    this.ds.register(acno,uname,pswd).subscribe(
      (result:any)=>{
        alert(result.message)
        this.router.navigateByUrl('')
       },
       result=>{
        alert(result.error.message)
       }
    )
      }
      else{
        alert("register failure");
        console.log(this.registerForm.get('uname')?.errors);
        
      }

    }
     
  }

