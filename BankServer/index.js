//1 Import express

const express=require("express");
const jwt =require("jsonwebtoken");

const cors=require("cors")


const dataServices= require('./Services/dataServices')

//2 create an app using express

const app = express()
app.use(express.json())
// give command to share data via cors
app.use(cors({
    origin:['http://localhost:4200','http://192.168.0.162:8080']
}))
 
//create a port number

app.listen(3000,()=>{
    console.log('listening on the port 3000');
})

// application specific middleware

const appMiddleware=(req,res,next)=>{
    console.log("application specific middleware");
    next();
}
app.use(appMiddleware);

const jwtMiddleware=(req,res,next)=>{
    try{
    console.log('router specific middleware');
    const token = req.headers['x-access-token'];
    const data= jwt.verify(token,'superkey2023')
    console.log(data);
    next();
}
catch{
    res.status(422).json({
        statusCode:422,
        status:false,
        message:"please login first"
    })
}
}


// Api calls

// register

app.post('/register',(req,res)=>{
    dataServices.register(req.body.acno,req.body.username,req.body.password).then(
        result=>{
            res.status(result.statusCode).json(result)

        }
    )
})

// login

app.post('/login',(req,res)=>{
    dataServices.login(req.body.acno,req.body.password).then(
        result=>{
            res.status(result.statusCode).json(result) })

        }
    )

//  deposit

app.post('/deposit',jwtMiddleware,(req,res)=>{
    dataServices.deposit(req.body.acno,req.body.password,req.body.amount).then(
         result=>{
    res.status(result.statusCode).json(result) })
        
    }
    )
//  withdraw
app.post('/withdraw',jwtMiddleware,(req,res)=>{
   dataServices.withdraw(req.body.acno,req.body.password,req.body.amount).then(
    result=>{
        res.status(result.statusCode).json(result)})
    }
   )
//  getTransaction
app.post('/transaction',jwtMiddleware,(req,res)=>{
    dataServices.getTransaction(req.body.acno).then(
        result=>{
    res.status(result.statusCode).json(result) })
    
        }
    )
 // Delete Request

 app.delete('/deleteAcc/:acno',(req,res)=>{
    dataServices.deleteAcc(req.params.acno).then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )
 })
