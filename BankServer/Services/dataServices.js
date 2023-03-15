// import jsonwebtoken

const jwt =require("jsonwebtoken");

// import db.js
const db=require('./db')

// userDetails={
//     1000:{acno:1000,username:"Arjun",password:1000,balance:2000,transaction:[]},
//     1001:{acno:1001,username:"Neeraj",password:1001,balance:2000,transaction:[]},
//     1002:{acno:1002,username:"Sanjay",password:1002,balance:2000,transaction:[]}
//  }


  const register=(acno,username,password)=>{

    return db.User.findOne({acno}).then(//async call 
      user=>{
        if(user){
          return{
            status:false,
            statusCode:401,
            message:"user already exists"
          } 
        }
        else{
          const newuser= new db.User({
            acno:acno,
            username:username,
            password:password,
            balance:0,
            transaction:[]

          })
          newuser.save()//to save new data to mongodb
          return{
            status:true,
            statusCode:200,
                message:"register successful"
          }
        }
      }
    )
      if (acno in userDetails){
        return{
          status:false,
          statusCode:401,
          message:"user already exists"
        } 
      }
      else{
        userDetails[acno]={
          acno:acno,
          username:username,
          password:password,
          balance:0,
          transaction:[]
        }
        return{
              status:true,
          statusCode:200,
              message:"register successful"
            }
        }
      }
    const  login=(acno,password)=>{
      return db.User.findOne({acno,password}).then(//async call
      user=>{
        if(user){
          currentuser=user.username
          currentacno=acno
          currentbalance=user.balance
        //  token generation
        const token =jwt.sign({currentacno:acno},'superkey2023')
        // superkey will be generate a number eg:fnbnbdbbdsd
        return {
          status:true,
      statusCode:200,
          message:"login success",
          token:token,
          currentUser:user.username,
          currentAcno:acno,
          balance:user.balance

        } 
      }
      else{
        // alert("invalid password")
        return {
          status:false,
          statusCode:401,
          message:"invalid password"
        } 
      }
      }
    ) 
  
    }

    const deposit=(acno,password,amt)=>{
      return db.User.findOne({acno,password}).then(
        user=>{
               var amount=parseInt(amt)
               if(user){
                if(password==user.password){
                  user.balance += amount;
                  user.transaction.push({
                    type:'Credit',
                    amount
                  })
              user.save()
                  return {
                    status:true,
                statusCode:200,
                    message:`${amount} is credited and balance is ${user.balance}`
                  } 
                }
                else{
                  // alert("invalid password")
                  return {
                    status:false,
                    statusCode:401,
                    message:"invalid password"
                  } 
                }
              }
               
 
        }
      )
     
  
    }

   const withdraw=(acno,pswd,amt)=>{
    return db.User.findOne({acno,pswd}).then(
      user=>{
      var amount=parseInt(amt)
      if(user){
        if(pswd==user.password){
          if(user.balance>amount){
          user.balance -= amount
          user.transaction.push({
            type:'Debit',
            amount
          })
          user.save()
       
          return {
            status:true,
        statusCode:200,
            message:`${amount} is debited and balance is ${user.balance}`
          } 
                }
      }
        else{
          // alert("invalid password")
          return  {
            status:false,
            statusCode:401,
            message:"invalid password"
          }
        }
      }else{
        if(user.balance>amount){
          return  {
            status:false,
            statusCode:401,
            message:"insufficient balance"
          }

        }

      }

      }
    )
      var amount=parseInt(amt)
      // let userDetails=userDetails;
      if(acno in userDetails){
        if(pswd==userDetails[acno].password){
          if(userDetails[acno].balance>amount){
          userDetails[acno].balance -= amount
          userDetails[acno].transaction.push({
            type:'Debit',
            amount
          })
       
          return {
            status:true,
        statusCode:200,
            message:`${amount} is credited and balance is ${userDetails[acno].balance}`
          } 
                }
      }
        else{
          // alert("invalid password")
          return  {
            status:false,
            statusCode:401,
            message:"invalid password"
          }
        }
      }
      else{
        alert("invalid user detalis")
        return {
          status:false,
          statusCode:401,
          message:"invalid user details"
        }
      }
    }

   const getTransaction=(acno)=>{
    return db.User.findOne({acno}).then(
      user=>{
        if(user){
          return {
            status:true,
            statusCode:200,
            transaction:user.transaction
          } 

        }else{
          return {
            status:false,
            statusCode:401,
            message:"invalid transaction"
          } 
        }
      }
    )
         return {
        status:true,
        statusCode:200,
        transaction:userDetails[acno].transaction
      } 
    }
    const deleteAcc=(acno)=>{
      return db.User.findOneAndDelete({acno}).then(
        user=>{
          if(user){
            return {
              status:true,
              statusCode:200,
              message:"Acc Deleted"
            } 
          }else{
            return {
              status:false,
              statusCode:401,
              message:"user not found"
            } 
          }
        }
      )

    }

  
  
module.exports={
  register,
  login,
  deposit,
  withdraw,
  getTransaction,
  deleteAcc
};