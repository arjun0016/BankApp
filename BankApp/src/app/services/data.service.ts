import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// global http headers
const options={
  headers:new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUser="";
  currentAcno="";

  userDetails:any={
    1000:{acno:1000,username:"Arjun",password:1000,balance:2000,transaction:[]},
    1001:{acno:1001,username:"Neeraj",password:1001,balance:2000,transaction:[]},
    1002:{acno:1002,username:"Sanjay",password:1002,balance:2000,transaction:[]}
 }

  constructor(private http:HttpClient) {
    // this.getDetails()
   }

  saveDetails(){
    if(this.userDetails){
    localStorage.setItem('Database',JSON.stringify(this.userDetails))
  }

  if(this.userDetails){
  localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
}
  if(this.userDetails){
  localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
}
}

// getDetails(){
//   if(localStorage.getItem('Database')){
//     this.userDetails=JSON.parse(localStorage.getItem('Database')||'')
//   }

//   if(localStorage.getItem('currentAcno')){
//     this.currentacno=JSON.parse(localStorage.getItem('currentAcno')||'')
//   }

//   if(localStorage.getItem('currentUser')){
//     this.currentuser=JSON.parse(localStorage.getItem('currentUser')||'')
//   }

// }
// register call
  register(acno:any,username:any,password:any){
    const body={
      acno,
      username,
      password
    }
  return this.http.post('http://localhost:3000/register',body)
  }
  // login call
  login(acno:any,password:any,){
    const body={
      acno,
      password
    }
   return this.http.post('http://localhost:3000/login',body)

  }
  getToken(){
    // fetch the token from local storage
    const token=JSON.parse(localStorage.getItem('Token')||'')
    // generate header
    let headers=new HttpHeaders()
    // append token inside the header
    if(token){
      options.headers=headers.append('x-access-token',token)
    }
    return options
  }
  // deposit call
  deposit(acno:any,password:any,amt:any){
    var amount=parseInt(amt)
    const body={
      acno,password,amount
    }
    return this.http.post('http://localhost:3000/deposit',body,this.getToken())

    var amount=parseInt(amt)
    let userDetails=this.userDetails;
    if(acno in this.userDetails){
      if(password==this.userDetails[acno].password){
        userDetails[acno].balance += amount;
        userDetails[acno].transaction.push({
          type:'Credit',
          amount
        })
        // this.saveDetails()
        return userDetails[acno].balance
      }
      else{
        alert("invalid password")
        return false;
      }
    }
    else{
      alert("invalid user detalis")
      return false;
    }

  }
  // withdraw call
  withdraw(acno:any,password:any,amt:any){
    var amount=parseInt(amt)
    const body={
      acno,password,amount
    }
    return this.http.post('http://localhost:3000/withdraw',body,this.getToken())

    let userDetails=this.userDetails;
    if(acno in this.userDetails){
      if(password==this.userDetails[acno].password){
        if(userDetails[acno].balance>amount){
        userDetails[acno].balance -= amount
        userDetails[acno].transaction.push({
          type:'Debit',
          amount
        })
        this.saveDetails()
        return userDetails[acno].balance
              }
    }
      else{
        alert("invalid password")
        return false;
      }
    }
    else{
      alert("invalid user detalis")
      return false;
    }

  }
  getTransaction(acno:any){
    const body={
      acno
    }
    return this.http.post('http://localhost:3000/transaction',body,this.getToken())
    
    // this.saveDetails()
    // return this.userDetails[acno].transaction
  }
  deleteAcc(acno:any){
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
  }
}
